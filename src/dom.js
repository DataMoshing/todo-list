// import createTask from "./task";
import ProjectFactory from "./project";
import createTask from "./task";

const todoList = []
const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")
const projectForm = document.querySelector("form")
const projectHeader = document.querySelector(".project-main-header")
const addTaskBtn = document.createElement("button")
const taskForm = document.querySelector("#task-form")
const span = document.getElementsByClassName("close")[0]


const inboxHeader = () => {
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
})

todayBtn.addEventListener("click", () => {
    projectMain.textContent = ""
    todayHeader()
})

weekBtn.addEventListener("click", () => {
    projectMain.textContent = ""
    weekHeader()
})

addTaskBtn.addEventListener("click", () => {
    taskForm.style.display = "block"
})

window.onclick = function clickOutside(event) {
    if (event.target === taskForm) {
        taskForm.style.display = "none";
    }
}

span.onclick = function () {
    taskForm.style.display = "none";
}

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
            projectMain.textContent = ""
            addTaskBtn.textContent = "Add Task"
            projectHeader.textContent = projectBtn.textContent
            addTaskBtn.className = "add-task-btn"
            projectMain.append(projectHeader, addTaskBtn)
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

createTask()

projectForm.addEventListener("submit", addProject)