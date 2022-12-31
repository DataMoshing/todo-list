import createTask from "./task";
import ProjectFactory from "./project";

const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")
const projectForm = document.querySelector("form")
const projectHeader = document.querySelector(".project-main-header")
const todoList = []

const inboxHeader = () => {
    const addTaskBtn = document.createElement("button")

    projectHeader.textContent = "Inbox"
    addTaskBtn.textContent = "Add Task"
    addTaskBtn.className = "add-task-btn"

    projectMain.append(projectHeader, addTaskBtn)
}

inboxHeader()

const todayHeader = () => {
    projectHeader.textContent = "Today"

    projectMain.append(projectHeader)
}

const weekHeader = () => {
    projectHeader.textContent = "Week"
    projectMain.append(projectHeader)
}

inboxBtn.addEventListener("click", () => {
    projectMain.textContent = ""
    inboxHeader()
    createTask()
})

todayBtn.addEventListener("click", () => {
    projectMain.textContent = ""
    todayHeader()
})

weekBtn.addEventListener("click", () => {
    projectMain.textContent = ""
    weekHeader()
})

const displayProject = () => {
    const projectContainer = document.querySelector(".project-container")
    projectContainer.textContent = ""
    todoList.forEach((newProject, i) => {
        const projectBtn = document.createElement("button");
        projectBtn.textContent = newProject.project;
        const projectDiv = document.createElement("div")
        projectDiv.className = "project-div"
        projectDiv.setAttribute("data-project-index", i)

        projectDiv.append(projectBtn)
        projectContainer.append(projectDiv)

        projectBtn.addEventListener("click", () => {
            projectHeader.textContent = ""
            projectHeader.textContent = projectBtn.textContent
        })
    })
}

const addProject = (event) => {
    event.preventDefault()
    const newProject = document.querySelector("#project-input").value
    const createProject = ProjectFactory(newProject)
    todoList.push(createProject)
    displayProject()
    console.log({ ...todoList })
    return createProject
}


projectForm.addEventListener("submit", addProject)