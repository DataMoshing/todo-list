// import { id } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";

const taskFactory = (title, description, dueDate, priority) => ({ title, description, dueDate, priority, id: uuidv4(), })

const createTask = (title, description, dueDate, priority) => {
    const task = taskFactory(title, description, dueDate, priority)
    return task
}

export { createTask, taskFactory }