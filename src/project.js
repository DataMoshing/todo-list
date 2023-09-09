import { v4 as uuidv4 } from "uuid";

const PM = {
    projects: [],
    // Get projects from local storage, if project found parse project and assign to projects property.
    localStorage() {
        const storedProjects = localStorage.getItem("projects");
        if (storedProjects) {
            this.projects = JSON.parse(storedProjects);
        }
    },
    addProject(project) {
        this.projects.push(project);
        // Update local storage
        localStorage.setItem("projects", JSON.stringify(this.projects));
    },

    deleteProject(project) {
        const projectIndex = this.projects.indexOf(project);
        if (projectIndex !== -1) {
            this.projects.splice(projectIndex, 1);
            localStorage.setItem("projects", JSON.stringify(this.projects));
            return true;
        }
        return false;
    },
    updateProject(projectId, newTitle) {
        // Iterate through projects array
        for (let i = 0; i < this.projects.length; i += 1) {
            // Check current iteration project id to project id
            if (this.projects[i].id === projectId) {
                // If title hasn't changed return false
                if (this.projects[i].title === newTitle) return false;
                // Else update project title with new title
                this.projects[i].title = newTitle;
                this.updateLocalStorage();
                return true;
            }
        }
        return false;
    },
    // Update local storage by stringifying current projects array and store under key "projects".
    updateLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }
};

const projectFactory = (title) => ({
    title,
    tasks: [],
    id: uuidv4(),
    addTask(task) {
        this.tasks.push(task);
        PM.updateLocalStorage();
    },
    deleteTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            PM.updateLocalStorage();
            return true;
        }
        return false;
    },
    updateTask(taskId, data) {
        Object.assign(this.tasks.find((el) => el.id === taskId), data);
        PM.updateLocalStorage();
    }
});

// Call the localStorage function to retrieve projects from local storage.
PM.localStorage();

export { projectFactory, PM }