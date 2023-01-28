import { v4 as uuidv4 } from "uuid";
import { taskFactory } from "./task"

// Project Manager object
const PM = {
    projects: [],
    addProject(project) {
        this.projects.push(project)
    },
    deleteProject(project) {
        const projectIndex = this.projects.findIndex(project)
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1)
            return true
        }
        return false
    },
    updateProject(projectId, newTitle) {
        // Iterate through projects array
        for (let i = 0; i < this.projects.length; i += 1) {
            // Check current iteration project id to project id
            if (this.projects[i].id === projectId) {
                // If title hasnt changed return false
                if (this.projects[i].title === newTitle) return false
                // Else return project title with new title
                this.projects[i].title = newTitle
                return true
            }
        }
        return false
    },
}

const projectFactory = (title) => ({
    title,
    tasks: [],
    id: uuidv4(),
    addTask(task) {
        this.tasks.push(task)
    },
    deleteTask(task) {
        const taskIndex = this.tasks.findIndex(task)
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1)
            return true
        }
        return false
    },
    updateTask(taskId, data) {
        Object.assign(this.tasks.find(el => el.id === taskId), data)
    }
})

// Test logic
const project1 = projectFactory("Clean")
const project2 = projectFactory("Workout")
const project3 = projectFactory("Workout")


const task1 = taskFactory("Clean kitchen", "Wash dishes", "1/19/2023", "Medium")
const task2 = taskFactory("Clean kitchen", "Wash dishes", "1/19/2023", "Medium")

PM.addProject(project1)
// console.log(PM.projects[0])
PM.addProject(project2)
PM.addProject(project3)


project1.addTask(task1)
project1.addTask(task2)
PM.updateProject(project1.id, "Updated title")
project1.updateTask(task1.id, { title: "Updated title", priority: "0000" })


console.log(PM.projects)
// console.log(PM.projects[0])
// console.log(PM.projects[0].tasks)

// const createProject = (title) => {
//     const project = projectFactory(title)
//     return project
// }

// console.log(PM.projects)


