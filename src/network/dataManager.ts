import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    setDoc
} from 'firebase/firestore';
import React from "react";
import TodoType from "../models/todo";
import { firebaseApp } from './firebase';

const db = getFirestore(firebaseApp);

export async function getTodos() {
    const todos: TodoType[] = [];
    const data = await getDocs(query(collection(db, "todos"), orderBy("createdAt", "desc")));
    data.forEach((doc) => {
        const docData = doc.data();
        todos.push({
            key: doc.id,
            id: docData.id,
            todo: docData.todo,
            isCompleted: docData.isCompleted,
            createdAt: docData.createdAt,
        });
    });
    return todos;
}

// export function getTodos(
//     setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
// ) {
//     const docsQuery = query(
//         collection(db, "todos"),
//         orderBy("createdAt")
//     );

//     onSnapshot(docsQuery, (querySnapshot) => {
//         const todos: TodoType[] = [];

//         querySnapshot.forEach((doc) => {
//             const newTodo = doc.data() as TodoType;
//             newTodo.id = doc.id;
//             todos.push(newTodo);
//         });

//         setTodos(todos);
//     });
// }

export function createTodo(
    todo: TodoType,
): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(db, "todos"), todo);
}

export function editTodo(
    todo: TodoType
): Promise<void> {
    return setDoc(doc(db, "todos", todo.key + ""), todo);
}

export function deleteTodo(
    todoID: string
): Promise<void> {
    return deleteDoc(doc(db, "todos", todoID));
}