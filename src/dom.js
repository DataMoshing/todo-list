import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.createElement("div")
const main = document.querySelector(".main-container")

// const taskList = document.querySelector(".task-list")
// const taskForm = document.querySelector(".task-form")
// const taskValue = taskForm.querySelector("input[name='add-task']")
// const addTaskBtn = document.querySelector(".add-task-btn")

const createTask = () => {
    const taskTitle = document.getElementById("task-title").value
    const taskDuedate = document.getElementById("due-date").value
    const taskPriority = document.getElementById("task-priority").value
    // const taskDiv = document.createElement("div")
    // const taskContainer = document.createElement("div")
    // taskContainer.append(taskDiv)
    // taskList.append(taskContainer)
    // taskDiv.append(taskTitle, taskDuedate, taskPriority)
    const newTask = taskFactory(taskTitle,
        taskDuedate, taskPriority)
    return newTask
}

const createProject = () => {
    const projectInput = document.getElementById("project").value
    const newProject = projectFactory(projectInput)
    return newProject
}

const updateUI = (event) => {
    event.preventDefault()
    const newProject = createProject()
    PM.addProject(newProject)
    projectList.textContent = ""
    PM.projects.forEach((project) => {
        const projectDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"

        projectDiv.textContent = `Project: ${project.title}`
        projectDiv.setAttribute("project-index", project.id)

        const projectContainer = document.createElement("div")
        projectDiv.className = "project-div"

        projectDiv.append(deleteBtn)
        projectContainer.append(projectDiv)
        projectContainer.classList = "project-container"
        projectList.append(projectContainer)

        const addTaskBtn = document.createElement("button")
        addTaskBtn.textContent = "Add Task"
        projectContainer.append(addTaskBtn)

        addTaskBtn.addEventListener("click", (e) => {
            e.preventDefault()
            const newTask = createTask()
            project.addTask(newTask)
            const taskDiv = document.createElement("div")
            taskDiv.classList = "task-div"
            taskDiv.textContent = `Project: ${project.title} 
            Task: ${newTask.title} Date: ${newTask.dueDate} Priority: ${newTask.priority}`
            taskDiv.setAttribute("task-div", newTask.id)

            const taskContainer = document.createElement("div")
            taskContainer.classList = "task-container"
            taskContainer.append(taskDiv)
            taskList.append(taskDiv)

            main.append(taskList)
        })
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault()
            // projectDiv.remove()
            addTaskBtn.remove()
            PM.deleteProject(project)
            const projectTasks = document.querySelectorAll(".task-div");
            const projectContainers = document.querySelectorAll(".task-container")
            for (let i = 0; i < projectTasks.length; i += 1) {
                if (projectTasks[i].textContent.includes(project.title)) {
                    projectContainers[i].remove()
                    projectTasks[i].remove();
                }
            }
        })
    })
}

projectValue.addEventListener("click", updateUI);
// taskValue.addEventListener("click", createTask);
