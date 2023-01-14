import PM from "./project"

const taskFactory = (title, description, dueDate, priority) => ({ title, description, dueDate, priority })

const createTask = (title, description, dueDate, priority) => {
    const task = taskFactory(title, description, dueDate, priority)
    // PM.addTask(task)
    return task
}

export { taskFactory, createTask }
