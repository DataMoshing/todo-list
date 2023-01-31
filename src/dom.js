import { projectFactory, PM } from "./project"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector("form")
const main = document.querySelector(".main")

const displayProject = () => {
    projectList.textContent = ""
    PM.projects.forEach((project) => {
        const projectDiv = document.createElement("div")
        projectDiv.textContent = project.title

        const projectContainer = document.createElement("div")
        projectDiv.className = "project-div"

        projectContainer.append(projectDiv)
        projectList.append(projectDiv)
        main.append(projectList)

    })
}

const addProject = (event) => {
    event.preventDefault()
    const projectInput = document.getElementById("project").value
    console.log(projectInput)
    const createProject = projectFactory(projectInput)
    PM.addProject(createProject)
    displayProject()
    return createProject
}

projectForm.addEventListener("submit", addProject)
