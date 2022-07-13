import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    getDocs,
    getFirestore,
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