// Project Manager object
const PM = {
    // Empty projects array
    projects: [],
    // Project method pushing to projects array
    addProject(project) {
        this.projects.push(project)
    },
}
// Test logic
// PM.addProject("Meep")
// PM.addProject("Beep")

const projectFactory = (project) => ({
    project,
    tasks: []
})

const project1 = projectFactory("Inbox");
const project2 = projectFactory("Study");

PM.addProject(project1)
PM.addProject(project2);
const createProject = (title) => {
    const project = projectFactory(title)
    PM.addProject(project)
}

console.log(PM.projects)


export { PM, createProject }