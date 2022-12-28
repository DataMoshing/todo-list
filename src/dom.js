import createTask from "./task";

const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")
const openModal = document.querySelector(".open-button")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")

openModal.addEventListener("click", () => {
    modal.showModal()
})

closeBtn.addEventListener("click", () => {
    modal.close()
})

const inboxHeader = () => {
    const addTask = document.createElement("button")
    const inboxHeading = document.createElement("h1")

    inboxHeading.textContent = "Inbox"
    inboxHeading.className = "inbox-header"
    addTask.textContent = "Add Task"
    addTask.className = "add-task-btn"

    projectMain.append(inboxHeading, addTask)
}
inboxHeader()

const todayHeader = () => {
    const todayHeading = document.createElement("h1")
    todayHeading.textContent = "Today"
    todayHeading.className = "today-header"

    projectMain.append(todayHeading)
}

const weekHeader = () => {
    const weekHeading = document.createElement("h1")
    weekHeading.textContent = "Week"
    weekHeading.className = "week-header"

    projectMain.append(weekHeading)
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

export { }
