import {
  query,
  collection,
  orderBy,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TaskRow from '../src/components/taskrow';
import TodoType from '../src/models/todo';
import { firebaseApp } from '../src/network/firebase';
import styles from '../styles/Home.module.css';

const db = getFirestore(firebaseApp);

let originalList: TodoType[] = [];

const Home: NextPage = () => {

  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [emptyText, setEmptyText] = useState('No result. Create a new one instead!');

  useEffect(() => {
    fetchTodoList();
    onSnapData();
  }, []);

  const onSnapData = () => {
    const docsQuery = query(
      collection(db, "todos"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(docsQuery, (querySnapshot) => {
      const todos: TodoType[] = [];
      querySnapshot.forEach((doc) => {
        const newTodo = doc.data() as TodoType;
        newTodo.key = doc.id;
        todos.push(newTodo);
      });
      originalList = todos;
      setTodoList(originalList);
    });
  }

  const generateUID = () => {
    return Date.now();
  }

  const addNewTaskList = () => {
    const ind = todoList.findIndex(e => e.todo === todoText);
    if (ind >= 0) {
      alert("task already exist");
      setTodoText('');
    } else {
      fetch('api/todo', {
        method: 'POST',
        body: JSON.stringify({
          id: generateUID().toString(),
          todo: todoText,
          isCompleted: false,
          createdAt: Date.now(),
        })
      }).then(res => {
        res.json().then(data => {
          console.log(data);
          setTodoText('');
        });
      });
    }
  }

  const fetchTodoList = async () => {
    const res = await fetch('api/todo');
    const data = await res.json();
    originalList = data;
    setTodoList(originalList);
  }

  const filterTodoList = (todoText: string) => {
    if (todoText === '') {
      setTodoList(originalList);
    } else {
      const list = originalList.filter(t => t.todo.includes(todoText));
      if (list.length === 0) {
        setEmptyText('No result. Create a new one instead!');
      } else {
        setEmptyText('List is empty');
      }
      setTodoList(list);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Todo List</a>
        </h1>
        <input
          value={todoText}
          placeholder={'Add New Task'}
          type={'text'}
          onChange={(e) => {
            setTodoText(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addNewTaskList();
            }
          }}
        />
        <input
          placeholder={'Filter Todo'}
          onChange={(e) => {
            filterTodoList(e.currentTarget.value);
          }}
        />
        <div style={{marginTop: 50}}>
          {
            todoList.length > 0 ?
              todoList.map((task: TodoType) => {
                return (
                  <TaskRow key={task.id} task={task} />
                )
              })
              : <a>{emptyText}</a>
          }
        </div>
      </main>
    </div>
  )
}

export default Home
