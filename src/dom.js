import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.querySelector(".task-list")
const taskForm = document.querySelector(".task-form")
const taskValue = taskForm.querySelector("input[name='add-task']")
// const taskDiv = document.createElement("div")

const createTask = () => {
    const taskTitle = document.getElementById("task-title").value
    const taskDuedate = document.getElementById("due-date").value
    const taskPriority = document.getElementById("task-priority").value
    const taskDiv = document.createElement("div")
    const taskContainer = document.createElement("div")
    taskContainer.append(taskDiv)
    taskList.append(taskContainer)
    taskDiv.append(taskTitle, taskDuedate, taskPriority)
    const newTask = taskFactory(taskTitle,
        taskDuedate, taskPriority)
    return newTask
}

const createProject = () => {
    const projectInput = document.getElementById("project").value
    const newProject = projectFactory(projectInput)
    return newProject
}

const updateDisplay = (event) => {
    event.preventDefault()
    const newTask = createTask()
    const newProject = createProject()
    newProject.addTask(newTask);
    PM.addProject(newProject)
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

        deleteBtn.addEventListener("click", () => {
            projectDiv.remove()
            PM.deleteProject(project)
            projectDiv.append(deleteBtn)
        })
    })
}
projectValue.addEventListener("click", updateDisplay);
taskValue.addEventListener("click", createTask);
