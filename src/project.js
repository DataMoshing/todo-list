import { taskFactory } from "./task"

// Project Manager object
const PM = {
    // Empty projects array
    projects: [],
    // Project method pushing to projects array
    addProject(project) {
        this.projects.push(project)
    },
    deleteProject(project) {
        const index = this.projects.indexOf(project)
        if (index !== -1) {
            this.projects.splice(index, 1)
            return true
        }
        return false
    }
}

const projectFactory = (title) => ({
    title,
    tasks: [],
    addTask(task) {
        this.tasks.push(task)
    }
})

// Test logic
const project1 = projectFactory("Clean")
// const project2 = projectFactory("Study")
const project3 = projectFactory("Water Plants")
const task1 = taskFactory("Clean kitchen", "Wash dishes", "1/14/2023", "Medium")
const task2 = taskFactory("Study objects", "Read through MDN docs", "1/16/2023", "High")

PM.addProject(project1)
project1.addTask(task1)
project1.addTask(task2)
PM.addProject(project3)

const createProject = (title) => {
    const project = projectFactory(title)
    return project
}

console.log(PM.projects)


export { createProject, PM }