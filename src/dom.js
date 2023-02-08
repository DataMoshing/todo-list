import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const taskList = document.querySelector(".task-list")
const taskForm = document.querySelector(".task-form")
const taskValue = taskForm.querySelector("input[name='add-task']")
// const taskDiv = document.createElement("div")

const createTask = (event) => {
    event.preventDefault()
    // Create div element
    const taskDiv = document.createElement("div")
    // Create task container for div
    const taskContainer = document.createElement("div")
    // Append task div to task container
    taskContainer.append(taskDiv)
    // Append container to task list
    taskList.append(taskContainer)
    // Get task title from input
    const taskTitle = document.getElementById("task-title").value
    // Get task due date from input
    const taskDuedate = document.getElementById("due-date").value
    // Get task priority from input
    const taskPriority = document.getElementById("task-priority").value
    // Create task object with input values
    const newTask = taskFactory(taskTitle,
        taskDuedate, taskPriority)
    // Append values to task div
    taskDiv.append(taskTitle, taskDuedate, taskPriority)
    console.log(newTask)
}

// const project1 = projectFactory("Clean")
// PM.addProject(project1)
// const newTask = taskFactory("Title 1", "1/2/3", "Low")
// const newTask2 = taskFactory("Title 2", "4/5/6", "Medium")
// project1.addTask(newTask)
// project1.addTask(newTask2)



const createProject = (event) => {
    event.preventDefault()
    // Get project input 
    const projectInput = document.getElementById("project").value
    // Create project object with project input
    const newProject = projectFactory(projectInput)
    // Add project object to PM
    PM.addProject(newProject)
    // Reset project list
    projectList.textContent = ""
    // Loop PM projects
    PM.projects.forEach((project) => {
        // Create project div
        const projectDiv = document.createElement("div")
        // Create delete button
        const deleteBtn = document.createElement("button")
        // Set delete button text
        deleteBtn.textContent = "Delete"

        // Set project div text to project title
        projectDiv.textContent = project.title
        // Give id to project element
        projectDiv.setAttribute("project-index", project.id)

        // Create project container for project div
        const projectContainer = document.createElement("div")
        // Set class to project div for styling
        projectDiv.className = "project-div"

        // Append delete button to div
        projectDiv.append(deleteBtn)
        // Append project div to container
        projectContainer.append(projectDiv)
        // Append project container to project list
        projectList.append(projectContainer)

        // Create event listener on delete button
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault()
            // Remove project div from display
            projectDiv.remove()
            // Remove project from array of objects
            PM.deleteProject(project)
            // Append delete button to project div
            projectDiv.append(deleteBtn)
        })
        // Loop through each project task
        project.tasks.forEach(task => {
            // Add task to project object
            newProject.addTask(task);
            // console.log(task)
        });
        return newProject
    })
}





taskValue.addEventListener("click", createTask)
projectValue.addEventListener("click", createProject)

