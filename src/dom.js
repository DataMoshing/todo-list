import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.createElement("div")
taskList.classList = "task-list"
const main = document.querySelector(".main-container")

const createTask = () => {
    const taskTitle = document.getElementById("task-title").value
    const taskDuedate = document.getElementById("due-date").value
    const taskPriority = document.getElementById("task-priority").value
    const newTask = taskFactory(taskTitle,
        taskDuedate, taskPriority)
    return newTask
}

const createProject = () => {
    const projectInput = document.getElementById("project").value
    const newProject = projectFactory(projectInput)
    return newProject
}

const updateUI = (e) => {
    e.preventDefault()
    const newProject = createProject()
    PM.addProject(newProject)
    projectList.textContent = ""
    PM.projects.forEach((project) => {
        const projectDiv = document.createElement("div")
        const addTaskBtn = document.createElement("button")
        addTaskBtn.className = "add-project-task"
        const deleteProjectBtn = document.createElement("button")
        deleteProjectBtn.textContent = "Delete"
        deleteProjectBtn.className = "delete-project"

        projectDiv.textContent = `Project: ${project.title}`
        projectDiv.setAttribute("project-index", project.id)

        const projectContainer = document.createElement("div")
        projectDiv.className = "project-div"

        projectDiv.append(deleteProjectBtn)
        projectContainer.append(projectDiv)
        projectContainer.classList = "project-container"
        projectList.append(projectContainer)

        addTaskBtn.textContent = "Add Task"
        projectContainer.append(addTaskBtn, deleteProjectBtn)


        addTaskBtn.addEventListener("click", (event) => {
            event.preventDefault()
            // Set variable to createTask function (taskFactory)
            const newTask = createTask()
            // Add new task to current project
            project.addTask(newTask)
            // Create div to display logic
            const taskDiv = document.createElement("div")
            taskDiv.classList = "task-div"
            taskDiv.textContent = `Project: ${project.title} 
            Task: ${newTask.title} Date: ${newTask.dueDate} Priority: ${newTask.priority}`
            taskDiv.setAttribute("task-div", newTask.id)

            const deleteTaskBtn = document.createElement("button")
            deleteTaskBtn.textContent = "Delete Task"
            taskDiv.append(deleteTaskBtn)

            const taskContainer = document.createElement("div")
            taskContainer.classList = "task-container"
            // taskDiv.append(deleteTaskBtn)
            taskContainer.append(taskDiv)
            taskList.append(taskDiv)

            main.append(taskList)

            deleteTaskBtn.addEventListener("click", () => {
                project.deleteTask(newTask)
                taskDiv.remove()
            })
        })
        deleteProjectBtn.addEventListener("click", (event) => {
            event.preventDefault()
            PM.deleteProject(project)
            projectDiv.remove()
            addTaskBtn.remove()
            deleteProjectBtn.remove()
            // Select all task divs
            const projectTasks = document.querySelectorAll(".task-div");
            // Loop through all task divs in current project and remove
            for (let i = 0; i < projectTasks.length; i += 1) {
                // If current project task includes project title remove project tasks
                if (projectTasks[i].textContent.includes(project.title)) {
                    projectTasks[i].remove();
                }
            }

        })
    })
}

projectValue.addEventListener("click", updateUI);
// taskValue.addEventListener("click", createTask);
