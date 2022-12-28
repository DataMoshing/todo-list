import { format } from "date-fns";



const createTask = (title, description) => {
    const dueDate = () => {
        const today = format(new Date(), "MM.dd.yyyy")
        console.log(today)
    }
    return { title, description, dueDate }

}

const test = createTask("Title", "Description");
test.dueDate();



export default createTask
/* Create tasks dynamically with factories or classes
    Example would be library project  */

// Each task should include title, description, due date,  priority then push to array to create array of objects -task.js

// On a seperate module there should be an example project which should have tasks  -sample.js

// User should be able to create a new project -project.js

// From the new project user should be able to create new tasks into the new project

/* Keep the app logic seperate from the DOM (SRP) -dom.js
    DOM manipulation in a separate module and avoid tightly coupled objects */

/* User should be able to:
1. View all the projects
2. View tasks within the projects (title, due date, priority)
3. View/edit details of each task
4. Delete task/s
*/

// Implement localStorage to save user data
