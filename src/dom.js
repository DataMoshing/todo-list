import { projectFactory, PM } from "./project"
import taskFactory from "./task"

const projectList = document.querySelector(".project-list")
const projectForm = document.querySelector(".project-form")
const projectValue = projectForm.querySelector("input[name='add-project']")
const main = document.querySelector(".main-container")
const taskList = document.createElement("div")
taskList.classList = "task-list"

const createTask = () => {
    const taskTitle = document.getElementById("task-title").value;
    const taskDuedate = document.getElementById("due-date").value;
    const taskPriority = document.getElementById("task-priority").value;
    // Create new task object using task factory function.
    const newTask = taskFactory(taskTitle, taskDuedate, taskPriority);
    return newTask;
};

// Create new project object.
const createProject = () => {
    const projectInput = document.getElementById("project").value;
    // If project input is empty return .
    if (projectInput === "") {
        return null;
    }
    // Create new project object using project factory function.
    const newProject = projectFactory(projectInput);
    return newProject;
};

const renderProjects = () => {
    // Clear project container
    projectList.textContent = "";
    // Loop through each project in PM projects array
    PM.projects.forEach((project) => {
        const projectContainer = document.createElement("div");
        const projectDiv = document.createElement("h3");
        const addTaskBtn = document.createElement("button");
        const deleteProjectBtn = document.createElement("button");

        projectDiv.textContent = `Project: ${project.title}`;
        projectDiv.setAttribute("project-index", project.id);

        projectDiv.className = "project-div";
        projectContainer.className = "project-container";

        addTaskBtn.className = "add-project-task";
        addTaskBtn.textContent = "Add Task";
        deleteProjectBtn.textContent = "Delete";
        deleteProjectBtn.className = "delete-project";
        projectDiv.append(deleteProjectBtn);
        projectContainer.append(projectDiv);
        projectList.append(projectContainer);
        projectContainer.append(addTaskBtn, deleteProjectBtn);

        addTaskBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const newTask = createTask();
            project.addTask(newTask);
            const taskDiv = document.createElement("div");
            const projectTask = document.createElement("project");
            const taskTitle = document.createElement("task");
            const taskDate = document.createElement("due-date");
            const taskPriority = document.createElement("priority");
            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.textContent = "✕";

            projectTask.textContent = `Project: ${project.title}`;
            taskTitle.textContent = `Task: ${newTask.title}`;
            taskDate.textContent = `Due-date: ${newTask.dueDate}`;
            taskPriority.textContent = `Priority: ${newTask.priority}`;

            projectTask.className = "project-task";
            taskDiv.className = "task-div";
            taskDiv.setAttribute("task-div", newTask.id);
            taskTitle.className = "task-title";
            taskDate.className = "task-due-date";
            taskPriority.className = "task-priority";
            deleteTaskBtn.className = "delete-task-btn";

            taskDiv.append(deleteTaskBtn, projectTask, taskTitle, taskDate, taskPriority);

            const taskContainer = document.createElement("div");
            taskContainer.classList = "task-container";
            taskContainer.append(taskDiv);

            taskList.append(taskDiv);

            deleteTaskBtn.addEventListener("click", () => {
                project.deleteTask(newTask);
                taskDiv.remove();
            });

            main.append(taskList);
        });

        deleteProjectBtn.addEventListener("click", (event) => {
            event.preventDefault();
            PM.deleteProject(project);
            projectDiv.remove();
            addTaskBtn.remove();
            deleteProjectBtn.remove();
            const projectTasks = document.querySelectorAll(".task-div");
            // Loop through tasks and remove tasks associated with project from DOM.
            projectTasks.forEach((taskDiv) => {
                if (taskDiv.textContent.includes(project.title)) {
                    taskDiv.remove();
                }
            });
        });
    });
};

document.addEventListener("DOMContentLoaded", renderProjects);

// Update UI with new projects.
const updateUI = (e) => {
    e.preventDefault();
    const newProject = createProject();
    // If project title is empty return.
    if (!newProject) {
        return;
    }
    // Check if project with the same title already exists.
    const projectExists = PM.projects.some((project) => project.title === newProject.title);
    // If project doesn't exist add to PM project array and render project.
    if (!projectExists) {
        PM.addProject(newProject);
        renderProjects();
    }
};

projectValue.addEventListener("click", updateUI);



export default updateUI