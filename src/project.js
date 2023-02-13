import { v4 as uuidv4 } from "uuid";

// Project Manager object
const PM = {
    projects: [],
    addProject(project) {
        this.projects.push(project)
        // console.log(this.projects)
    },
    deleteProject(project) {
        const projectIndex = this.projects.indexOf(project)
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
        const taskIndex = this.tasks.indexOf(task)
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

export { projectFactory, PM }