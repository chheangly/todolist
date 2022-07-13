import { NextApiRequest, NextApiResponse } from "next";
import { deleteTodo, editTodo } from "../../../src/network/dataManager";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const todoID = req.query.todoID;
    const method = req.method;
    const body = req.body;

    switch (method) {
        case 'GET':
            try {
                const respond = {
                    id: '002',
                    todo: 'Hello',
                    isCompleted: true,
                    createdAt: '15/12/2022',
                }
                res.status(200).json({respond});
            } catch (e) {
                res.status(500).json({message: e});
            }
            break;
        case 'PUT':
            try {
                const jsonBody = JSON.parse(body);
                editTodo(jsonBody);
                res.status(200).json({status: 'success'});
            } catch (e) {
                res.status(500).json({message: e});
            }
            break;
        case 'DELETE':
            try {
                deleteTodo(todoID as string)
                res.status(200).json({status: 'success'});
            } catch (e) {
                res.status(500).json({message: e});
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
  }