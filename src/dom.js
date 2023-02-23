import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
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
    if (projectInput === "") {
        return alert("Project name can't be empty")
    }
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
            const projectContainer = document.createElement("div")
            const projectDiv = document.createElement("h3")
            const addTaskBtn = document.createElement("button")
            const deleteProjectBtn = document.createElement("button")

            projectDiv.textContent = `Project: ${project.title}`
            projectDiv.setAttribute("project-index", project.id)

            projectDiv.className = "project-div"
            projectContainer.className = "project-container"

            addTaskBtn.className = "add-project-task"
            addTaskBtn.textContent = "Add Task"
            deleteProjectBtn.textContent = "Delete"
            deleteProjectBtn.className = "delete-project"
            projectDiv.append(deleteProjectBtn)
            projectContainer.append(projectDiv)
            projectList.append(projectContainer)
            projectContainer.append(addTaskBtn, deleteProjectBtn)


            addTaskBtn.addEventListener("click", (event) => {
                event.preventDefault()
                // Set variable to createTask function (taskFactory)
                const newTask = createTask()
                console.log(newTask)
                // Add new task to current project
                console.log(project)
                project.addTask(newTask)
                // Create elements to display logic
                const taskDiv = document.createElement("div")
                const projectTask = document.createElement("project")
                const taskTitle = document.createElement("task")
                const taskDate = document.createElement("due-date")
                const taskPriority = document.createElement("priority")
                const deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.textContent = "✕"

                projectTask.textContent = `Project: ${project.title}`
                taskTitle.textContent = `Task: ${newTask.title}`
                taskDate.textContent = `Due-date: ${newTask.dueDate}`
                taskPriority.textContent = `Priority: ${newTask.priority}`

                projectTask.className = "project-task"
                taskDiv.className = "task-div"
                taskDiv.setAttribute("task-div", newTask.id)
                taskTitle.className = "task-title"
                taskDate.className = "task-due-date"
                taskPriority.className = "task-priority"
                deleteTaskBtn.className = "delete-task-btn"

                taskDiv.append(deleteTaskBtn, projectTask, taskTitle, taskDate, taskPriority)

                const taskContainer = document.createElement("div")
                taskContainer.classList = "task-container"
                taskContainer.append(taskDiv)

                taskList.append(taskDiv)

                // Edit task elements
                const newForm = document.createElement("form")
                const newInput = document.createElement("input")
                const newTaskLabel = document.createElement("label")
                const editTaskBtn = document.createElement("button")
                const editPriorityBtn = document.createElement("button")
                const editDueDate = document.createElement("button")
                const newPriority = document.createElement("select")
                const newDueDate = document.createElement("input")

                editTaskBtn.textContent = "Edit task"
                editTaskBtn.className = "edit-task-btn"
                editPriorityBtn.textContent = "Edit Priority"
                editDueDate.textContent = "Edit Due date"
                editDueDate.className = "edit-due-date-btn"
                editPriorityBtn.className = "edit-priority-btn"
                newInput.id = "new-task-input"

                // Edit current task 
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
                    newPriority.className = "new-priority"
                    newPriority.append(newPriorityLow, newPriorityMedium, newPriorityHigh)
                    taskDiv.append(newPriority, editPriorityBtn)
                })

                editPriorityBtn.addEventListener("click", () => {
                    project.updateTask(newTask.id, { priority: `${newPriority.value}` })
                    taskPriority.textContent = `Priority: ${newPriority.value}`
                    newPriority.remove()
                    editPriorityBtn.remove()
                })

                taskDate.addEventListener("click", () => {
                    newDueDate.setAttribute("type", "date")
                    newDueDate.className = "new-due-date"
                    taskDiv.append(newDueDate, editDueDate)
                })

                editDueDate.addEventListener("click", () => {
                    project.updateTask(newTask.id, { dueDate: `${newDueDate.value}` })
                    taskDate.textContent = `Due-date ${newDueDate.value}`
                    newDueDate.remove()
                    editDueDate.remove()
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

export default updateUI