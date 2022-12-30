// import { projectMain } from "./dom";

// import projectMain from "./dom";

const projectHeader = document.querySelector(".project-main-header")
const projectForm = document.querySelector("form")
const todoList = [];

const ProjectFactory = (project) => ({ project })

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
            // const addTaskBtn = document.createElement("button")
            // addTaskBtn.textContent = "Add Task"
            projectHeader.textContent = projectBtn.textContent
            // projectHeader.append()
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


projectForm.addEventListener("submit", addProject)