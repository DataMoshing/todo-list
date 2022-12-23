// import _ from "lodash";
import "./style.css";
import createTask from "./task";
import { inboxBtn, todayBtn, weekBtn, projectMain, inboxMain, todayMain, weekMain } from "./dom";

// function component() {
//   const element = document.createElement("div");

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(["Hello", "webpack"], " ");
//   element.classList.add("hello");

//   return element;
// }

inboxMain()

inboxBtn.addEventListener("click", () => {
  projectMain.textContent = ""
  inboxMain()
  createTask()
})

todayBtn.addEventListener("click", () => {
  projectMain.textContent = ""
  todayMain()
})

weekBtn.addEventListener("click", () => {
  projectMain.textContent = ""
  weekMain()
})
// document.body.appendChild(component());

