import TaskFactory from "./task";
import ProjectFactory from "./project";

const todoProjects = []
const todoTasks = []
const inboxBtn = document.querySelector(".inbox-btn")
const todayBtn = document.querySelector(".today-btn")
const weekBtn = document.querySelector(".week-btn")
const projectMain = document.querySelector(".project-main")
const projectHeader = document.querySelector(".project-main-header")
const addTaskBtn = document.createElement("button")
const taskForm = document.querySelector("#task-form")
const closeModal = document.getElementsByClassName("close")[0]
const formWrapper = document.querySelector(".form-wrapper")
const dialogWrapper = document.querySelector(".dialog-wrapper")
const taskList = document.querySelector(".task-list")
const projectContainer = document.querySelector(".project-container")

const displayTask = () => {
    taskList.textContent = ""
    todoTasks.forEach((i) => {
        const taskBtn = document.createElement("button")
        taskBtn.textContent = taskForm.textContent
        taskBtn.className = "task"
        const taskDiv = document.createElement("div")
        taskDiv.className = "task-div"
        taskDiv.setAttribute("data-task-index", i)


        taskDiv.append(taskBtn)
        taskList.append(taskDiv)
        projectMain.append(taskList)
    })
}

// const clearTask = () => {
//     while (taskList.firstChild) {
//         taskList.removeChild(taskList.firstChild)
//     }
// }

const addTask = (event) => {
    event.preventDefault()
    const newForm = document.querySelector("#task-form").value
    const createTask = TaskFactory(newForm)
    todoTasks.push(createTask)
    displayTask()
    console.log({ ...todoTasks })
    return createTask
}

const displayProject = () => {
    taskList.textContent = ""
    projectContainer.textContent = ""
    todoProjects.forEach((newProject, i) => {
        const projectBtn = document.createElement("button");
        projectBtn.textContent = newProject.project
        const projectDiv = document.createElement("div")
        projectDiv.className = "project-div"
        projectDiv.setAttribute("data-project-index", i)

        projectDiv.append(projectBtn)
        projectContainer.append(projectDiv)
        dialogWrapper.append(projectContainer)

        projectBtn.addEventListener("click", () => {
            // taskList.textContent = ""
            addTaskBtn.textContent = "Add Task"
            projectHeader.textContent = projectBtn.textContent
            addTaskBtn.className = "add-task-btn"
            projectMain.append(projectHeader, taskForm, addTaskBtn)
            displayTask()
        })
    })
}

const addProject = (event) => {
    event.preventDefault()
    const newProject = document.querySelector("#project-input").value

    if (newProject === "") {
        alert("Project name can't be empty")
        return
    }

    const createProject = ProjectFactory(newProject)
    todoProjects.push(createProject)
    displayProject()
    console.log({ ...todoProjects })
    // return createProject
}

const inboxHeader = () => {
    projectHeader.textContent = "Inbox"
    addTaskBtn.textContent = "Add Task"
    addTaskBtn.className = "add-task-btn"

    projectMain.append(projectHeader, taskForm, addTaskBtn)
    formWrapper.append(projectMain)
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

closeModal.addEventListener("click", () => {
    taskForm.style.display = "none"
})

inboxBtn.addEventListener("click", () => {
    taskList.textContent = ""
    inboxHeader()
    // displayTask()
})

document.querySelector("#project").addEventListener("click", addProject)
document.querySelector("#task").addEventListener("click", addTask)
// projectForm.addEventListener("submit", addProject)
// taskForm.addEventListener("submit", addTask)
