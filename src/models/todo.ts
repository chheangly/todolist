export default interface TodoType {
    key: string | null | undefined,
    id: string,
    todo: string,
    isCompleted: boolean,
    createdAt: number,
}