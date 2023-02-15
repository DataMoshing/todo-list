import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
// const inputValue = document.querySelector("task-title")
const main = document.querySelector(".main-container")
const taskList = document.createElement("div")
taskList.classList = "task-list"

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
    /* Iterate through each project in array and check if current project title is equal to new projects title if not create new project */
    const projectExists = PM.projects.some((project) => project.title === newProject.title)
    if (!projectExists) {
        PM.addProject(newProject)
        projectList.textContent = ""
        PM.projects.forEach((project) => {
            // Create projects
            const projectDiv = document.createElement("h3")
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

            console.log(PM.projects)

            addTaskBtn.addEventListener("click", (event) => {
                event.preventDefault()
                // Set variable to createTask function (taskFactory)
                const newTask = createTask()
                // Add new task to current project
                project.addTask(newTask)
                // Create elements to display logic
                const taskDiv = document.createElement("div")
                taskDiv.setAttribute("task-div", newTask.id)
                const projectTask = document.createElement("project")
                taskDiv.classList = "task-div"
                const taskTitle = document.createElement("task")
                const taskDate = document.createElement("due-date")
                const taskPriority = document.createElement("priority")
                const deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.textContent = "Delete Task"
                deleteTaskBtn.classList = "delete-task-btn"

                projectTask.textContent = `Project: ${project.title}`
                projectTask.classList = "project-task"
                taskTitle.classList = "task-title"
                taskTitle.textContent =
                    `Task: ${newTask.title}`

                taskDate.textContent = (`Due-date: ${newTask.dueDate}`)
                taskDate.classList = "task-due-date"

                taskPriority.textContent = `Priority: ${newTask.priority}`
                taskPriority.classList = "task-priority"


                taskDiv.append(deleteTaskBtn, projectTask, taskTitle, taskDate, taskPriority)

                const taskContainer = document.createElement("div")
                taskContainer.classList = "task-container"
                taskContainer.append(taskDiv)
                taskList.append(taskDiv)
                // Edit current task 
                const newForm = document.createElement("form")
                const newInput = document.createElement("input")
                const newTaskLabel = document.createElement("Label")
                const editTaskBtn = document.createElement("button")
                const editPriorityBtn = document.createElement("button")
                const newPriority = document.createElement("select")

                editTaskBtn.textContent = "Edit task"
                editPriorityBtn.textContent = "Edit Priority"
                newInput.id = "new-task-input"

                taskTitle.addEventListener("click", () => {
                    newInput.type = "text"
                    newInput.name = "new-task-input"
                    newTaskLabel.setAttribute("for", "updated-task")
                    newTaskLabel.textContent = "Update task: "
                    newTaskLabel.append(newInput)
                    newForm.append(newTaskLabel)
                    taskDiv.append(newForm, editTaskBtn)
                })

                editTaskBtn.addEventListener("click", () => {
                    project.updateTask(newTask.id, { title: `${newInput.value}` })
                    taskTitle.textContent = `Task: ${newInput.value}`
                    newTaskLabel.remove()
                    newInput.remove()
                    editTaskBtn.remove()
                })

                taskPriority.addEventListener("click", () => {
                    const newPriorityLow = document.createElement("option");
                    const newPriorityMedium = document.createElement("option");
                    const newPriorityHigh = document.createElement("option");
                    newPriorityLow.text = "Low"
                    newPriorityMedium.text = "Medium"
                    newPriorityHigh.text = "High"
                    newPriority.textContent = "New Priority: "
                    newPriority.append(newPriorityLow, newPriorityMedium, newPriorityHigh)
                    taskDiv.append(newPriority, editPriorityBtn)
                })
                editPriorityBtn.addEventListener("click", () => {
                    project.updateTask(newTask.id, { priority: `${newPriority.value}` })
                    taskPriority.textContent = `Priority: ${newPriority.value}`
                    newPriority.remove()
                    editPriorityBtn.remove()
                })

                // Remove single task
                deleteTaskBtn.addEventListener("click", () => {
                    project.deleteTask(newTask)
                    taskDiv.remove()
                })
                main.append(taskList)
            })
            // Delete project + tasks
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
}

projectValue.addEventListener("click", updateUI);
