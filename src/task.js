import { v4 as uuidv4 } from "uuid";

const taskFactory = (title, dueDate, priority) => ({ title, dueDate, priority, id: uuidv4(), })

const createTask = (title, dueDate, priority) => {
    const task = taskFactory(title, dueDate, priority)
    return task
}


export { taskFactory, createTask }