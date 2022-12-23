const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")

const inboxMain = () => {
    const addTask = document.createElement("button")
    const inboxHeader = document.createElement("h1")

    inboxHeader.textContent = "Inbox"
    inboxHeader.className = "inbox-header"
    addTask.textContent = "Add Task"
    addTask.className = "add-task-btn"

    projectMain.append(inboxHeader, addTask)
}

const todayMain = () => {
    const todayHeader = document.createElement("h1")
    todayHeader.textContent = "Today"
    todayHeader.className = "today-header"

    projectMain.append(todayHeader)
}

const weekMain = () => {
    const weekHeader = document.createElement("h1")
    weekHeader.textContent = "Week"
    weekHeader.className = "week-header"

    projectMain.append(weekHeader)
}

export { inboxBtn, todayBtn, weekBtn, projectMain, inboxMain, todayMain, weekMain }