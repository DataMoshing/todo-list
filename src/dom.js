import createTask from "./task";

const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")
const projectHeader = document.querySelector(".project-main-header")

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
    // const weekHeading = document.createElement("h1")
    projectHeader.textContent = "Week"
    // weekHeading.className = "week-header"

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

export default projectMain 
