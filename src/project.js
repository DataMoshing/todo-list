
const projectForm = document.querySelector("form")

const todoList = [];

const ProjectFactory = (newProject) => ({ newProject })

const displayProject = () => {
    const projectContainer = document.querySelector(".project-container")
    projectContainer.textContent = ""
    todoList.forEach((project, i) => {
        const projectText = document.createElement("Project");
        projectText.textContent = project.newProject;
        const projectDiv = document.createElement("div")
        projectDiv.setAttribute("data-project-index", i)

        projectDiv.append(projectText)
        projectContainer.append(projectDiv)
    })
}

const addProject = (event) => {
    event.preventDefault()
    const newProject = document.querySelector("#project-input").value
    const createProject = ProjectFactory(newProject)
    todoList.push(createProject)
    displayProject()
    return createProject
}


projectForm.addEventListener("submit", addProject)