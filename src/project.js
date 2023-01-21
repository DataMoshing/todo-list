/* eslint-disable no-plusplus */
import { taskFactory } from "./task"
// Project Manager object
const PM = {
    projects: [],
    id: 0,
    addProject(project) {
        project.id = this.id
        // this.projects = this.projects.map((item, index) => ({ ...item, id: index + 1 }))
        this.projects.push(project)
        this.id++
    },
    deleteProject(project) {
        const projectIndex = this.projects.indexOf(project)
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1)
            return true
        }
        return false
    },
    updateProject() {

    },
}

const projectFactory = (title) => ({
    title,
    tasks: [],
    addTask(task) {
        this.tasks.push(task)
    },
    deleteTask(task) {
        const taskIndex = this.tasks.indexOf(task)
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1)
            return true
        }
        return false
    },
})

// Test logic
const project1 = projectFactory("Clean")
const project2 = projectFactory("Workout")
const project3 = projectFactory("Workout")

const task1 = taskFactory("Clean kitchen", "Wash dishes", "1/19/2023", "Medium")
const task2 = taskFactory("Clean kitchen", "Wash dishes", "1/19/2023", "Medium")

PM.addProject(project1)
PM.addProject(project2)
PM.addProject(project3)
project1.addTask(task1)
project1.addTask(task2)
const createProject = (title) => {
    const project = projectFactory(title)
    return project
}

// console.log(project1.tasks[0].dueDate)
console.log(PM.projects)


export { createProject, PM }
