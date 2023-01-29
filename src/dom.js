import { projectFactory, PM } from "./project"

// const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector("form")


// const displayProject = () => {


//     document.body.append(projectList)
// }


const addProject = (event) => {
    event.preventDefault()
    const projectInput = document.getElementsByName("project")[0].value
    const createProject = projectFactory(projectInput)
    console.log(createProject)
    PM.addProject(createProject)
    return createProject
}
projectForm.addEventListener("submit", addProject)
