import { projectFactory, PM } from "./project"
import { taskFactory } from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.querySelector(".task-list")
const taskForm = document.querySelector(".task-form")
const taskValue = taskForm.querySelector("input[name='add-task']")

const displayTask = () => {
    // event.preventDefault()
    const taskDiv = document.createElement("div")
    const taskTitle = document.querySelector("#title").value
    const taskDuedate = document.querySelector("#due-date").value
    const taskPriority = document.querySelector("#task-priority").value
    taskDiv.classList = "task-div"
    taskDiv.append(taskTitle, taskDuedate, taskPriority)
    taskList.append(taskDiv)
}

const displayProject = () => {
    // taskList.textContent = ""
    projectList.textContent = ""
    PM.projects.forEach((project) => {
        console.log(project)
        const projectDiv = document.createElement("div")
        projectDiv.textContent = project.title
        projectDiv.setAttribute("project-index", project.id)

        const projectContainer = document.createElement("div")
        projectDiv.className = "project-div"

        projectContainer.append(projectDiv)
        projectList.append(projectContainer)
        project.tasks.forEach(() => {
            // const createTask = taskFactory(task.title, task.Duedate, task.priority)
            // project.addTask(createTask)
            // displayTask()
            // console.log(task)
        })
    })
}

const addProject = (event) => {
    event.preventDefault()
    taskList.textContent = ""
    const taskTitle = document.getElementById("title").value
    const taskDuedate = document.getElementById("due-date").value
    const taskPriority = document.getElementById("task-priority").value
    const projectInput = document.getElementById("project").value
    const createTask = taskFactory(taskTitle, taskDuedate, taskPriority)
    const newProject = projectFactory(projectInput)
    PM.addProject(newProject)
    newProject.addTask(createTask)
    displayProject()
}

taskValue.addEventListener("click", displayTask)
projectValue.addEventListener("click", addProject)
