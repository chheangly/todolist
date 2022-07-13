import { NextApiRequest, NextApiResponse } from "next";
import { createTodo, getTodos } from "../../src/network/firebaseData";

export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const method = req.method;
    const data = req.body;

    switch (method) {
        case 'GET':
            try {
                const respond = await getTodos();
                res.status(200).json(respond);
            } catch (e) {
                res.status(500).json({message: e});
            }
            break;
        case 'POST':
            try {
                const jsonBody = JSON.parse(data);
                createTodo(jsonBody);
                const respond = {status: "success", message: data}
                res.status(200).json(respond);
            } catch (e) {
                res.status(500).json({message: e});
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}