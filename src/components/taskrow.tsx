import React, { useState } from 'react';
import TodoType from "../models/todo";
import { deleteTodo } from '../network/dataManager';

interface TaskRowType {
    task: TodoType,
}

const TaskRow = (data: { task: TodoType }) => {

    const [actionVisible, setActionVisible] = useState(false);

    const onDeletePress = () => {
        fetch(`api/todo/${data.task.key}`, {
            method: 'DELETE'
        }).then(res => {
            res.json().then(data => {
                console.log(data);
            });
        });
    }

    const onEditPress = () => {
        let newText = prompt("Update todo text", data.task.todo);
        if (newText != null && newText != "") {
            fetch(`api/todo/${data.task.key}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...data.task,
                    todo: newText,
                })
            }).then(res => {
                res.json().then(data => {
                    console.log(data);
                })
            });
        }
    }

    const onCompletePress = () => {
        fetch(`api/todo/${data.task.key}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...data.task,
                isCompleted: !data.task.isCompleted,
            })
        }).then(res => {
            res.json().then(data => {
                console.log(data);
            })
        });
    }

    const displayDataTime = (time: number) => {
        const date = new Date(time);
        var hours = date.getHours();
        var minutes: string|number = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    return (
        <div
            onMouseOver={() => {
                setActionVisible(true);
            }}
            onMouseLeave={() => {
                setActionVisible(false);
            }}
            style={{
                // height: 60,
                // width: '70%',
                backgroundColor: '#e8edea',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 10,
                padding: 20,
                marginTop: 2,
            }}>
            <div style={{marginRight: 50}}>
                <span style={{ textDecoration: data.task.isCompleted ? 'line-through' : 'none' }}>{data.task.todo}</span>
                <br />
                <a style={{color: 'grey'}}>{displayDataTime(data.task.createdAt)}</a>
            </div>
            <div
                style={{
                    visibility: actionVisible ? 'visible' : 'hidden'
                }}>
                <label htmlFor='complted'>Completed : </label>
                <input
                    onClick={onCompletePress}
                    onChange={(e) => { }}
                    name='completed'
                    type={'checkbox'}
                    checked={data.task.isCompleted}
                />
                <button onClick={onEditPress}>Edit</button>
                <button onClick={onDeletePress}>Delete</button>
            </div>
        </div>
    );
}

export default TaskRow;
