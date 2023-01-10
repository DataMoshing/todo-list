// import { format } from "date-fns";

const todoTasks = []

const createTask = (title, description, dueDate, priority) => {
    const task = {
        title,
        description,
        dueDate,
        priority
    }
    todoTasks.push(task);
}


createTask("Clean", "Wash dishes", "1/12/2023", "High")
createTask("Groceries", "Buy grapes", "1/15/2023", "Low")

console.log(todoTasks)


export default createTask

// const personFactory = (name) => ({
//     talk() {
//         console.log(`Hello I am ${name}`)
//     }
// })

// const me = personFactory("Bill")
// me.talk()


// const createTask = (title, description, dueDate, priority) => ({
//     setTitle() {
//         this.title = title
//         console.log(`${title}`)
//         return title
//     },
//     setDescription() {
//         this.description = description
//         return description
//     },
//     setDate() {
//         this.dueDate = dueDate
//         return dueDate
//     },
//     setPriority() {
//         this.priority = priority
//         return priority
//     },
//     setTask(task) {
//         todoTasks.push(task)
//     }
// })

