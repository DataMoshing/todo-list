import { projectFactory, PM } from "./project"
import { taskFactory } from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.querySelector(".task-list")
const taskForm = document.querySelector(".task-form")
const taskValue = taskForm.querySelector("input[name='add-task']")
const taskDiv = document.createElement("div")

// const addTask = () => {
//     const taskTitle = document.querySelector("#title").value
//     const taskDuedate = document.querySelector("#due-date").value
//     const taskPriority = document.querySelector("#task-priority").value
//     const createTask = taskFactory(taskTitle, taskDuedate, taskPriority)
//     console.log(createTask)
// }

// const displayTask = (event) => {
//     event.preventDefault()
//     const taskTitle = document.querySelector("#title").value
//     const taskDuedate = document.querySelector("#due-date").value
//     const taskPriority = document.querySelector("#task-priority").value
//     taskDiv.classList = "task-div"
//     taskDiv.append(taskTitle, taskDuedate, taskPriority)
//     taskList.append(taskDiv)
//     addTask()
// }

const displayProject = () => {
    // taskList.textContent = ""
    projectList.textContent = ""
    PM.projects.forEach((project) => {
        const projectDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"

        projectDiv.textContent = project.title
        projectDiv.setAttribute("project-index", project.id)

        const projectContainer = document.createElement("div")
        projectDiv.className = "project-div"

        projectDiv.append(deleteBtn)
        projectContainer.append(projectDiv)
        projectList.append(projectContainer)

        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault()
            projectDiv.remove()
            PM.deleteProject(project)
            projectDiv.append(deleteBtn)
        })
    })
}

const addProject = (e) => {
    e.preventDefault()
    taskList.textContent = ""
    const projectInput = document.getElementById("project").value
    const newProject = projectFactory(projectInput)
    PM.addProject(newProject)
    displayProject()
}

// taskValue.addEventListener("click", displayTask)
projectValue.addEventListener("click", addProject)
