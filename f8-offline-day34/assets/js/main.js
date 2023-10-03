/** @format */

import {
  getTasks,
  postTasks,
  editTasks,
  deleteTasks,
  getTaskDetails,
} from "./handleTasks.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const root = $("#root");
const container = $(".container");
const addTodosBtn = $(".add-todos");

function renderTasks(id, name, done) {
  const taskContainerEle = document.createElement("div");
  taskContainerEle.className = "task-container";

  const taskWrapEle = document.createElement("div");
  taskWrapEle.className = "task-wrap";

  const nameTaskEle = document.createElement("span");
  nameTaskEle.className = "name-task";
  nameTaskEle.textContent = name; // Set the task name dynamically
  nameTaskEle.dataset.id = id;

  const buttonContainerEle = document.createElement("div");
  buttonContainerEle.className = "button-container";

  const trashBtnEle = document.createElement("button");
  trashBtnEle.type = "button";
  trashBtnEle.className = "btn btn-trash";
  trashBtnEle.innerHTML = '<i class="fa-solid fa-trash"></i>';

  const editBtnEle = document.createElement("button");
  editBtnEle.type = "button";
  editBtnEle.className = "btn btn-edit";
  editBtnEle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const checkBtnEle = document.createElement("button");
  checkBtnEle.type = "button";
  checkBtnEle.className = "btn btn-check";
  checkBtnEle.innerHTML = '<i class="fa-solid fa-check-to-slot"></i>';

  buttonContainerEle.appendChild(trashBtnEle);
  buttonContainerEle.appendChild(editBtnEle);
  buttonContainerEle.appendChild(checkBtnEle);

  taskWrapEle.appendChild(nameTaskEle);
  taskWrapEle.appendChild(buttonContainerEle);

  taskContainerEle.appendChild(taskWrapEle);

  if (done) {
    taskWrapEle.classList.add("task-complete");
  }

  //   container.appendChild(taskContainerEle);
  //   container.insertAdjacentHTML("beforeend", taskContainerEle);
  const buttonsContainer = document.querySelector(".buttons-container");

  // Insert taskContainerEle before buttonsContainer
  buttonsContainer.parentNode.insertBefore(taskContainerEle, buttonsContainer);
}

//Render task from URL
async function renderTasksUI() {
  try {
    const tasks = await getTasks();

    tasks.forEach((task) => {
      renderTasks(task.id, task.name, task.done);
    });
    // renderBtnCompleteTodos(1);
  } catch (e) {
    console.error("Error fectch tasks: ", error);
  }
}

renderTasksUI();

//Handle Delete Task
async function handleTask(e) {
  const target = e.target;
  console.log(target);

  if (
    target.classList.contains("btn-trash") ||
    target.classList.contains("fa-trash")
  ) {
    const taskContainer = target.closest(".task-container");
    const taskId = taskContainer.querySelector(".name-task").dataset.id;

    try {
      await deleteTasks(taskId);
      taskContainer.remove();
    } catch (e) {
      console.error("Error deleting task", e);
    }
  } else if (
    target.classList.contains("btn-edit") ||
    target.classList.contains("fa-pen-to-square")
  ) {
    //code handle edit task and update to api
    const taskContainer = target.closest(".task-container");
    const taskId = taskContainer.querySelector(".name-task").dataset.id;

    try {
      const task = await getTaskDetails(taskId);
      if (task) {
        // Populate modal input with current task name
        const modalInput = formAdd.querySelector("input[type='text']");
        modalInput.value = task.name;
        // Show the modal
        modal.classList.add("is-show");
        // Handle edit and update on form submission
        formAdd.addEventListener("submit", async (e) => {
          e.preventDefault();
          // console.log("submit edit tasks");
          const editedTaskName = modalInput.value.trim();
          if (!editedTaskName) {
            alert("Task name cannot be empty");
            return;
          }
          try {
            // Update the task on the API
            await editTasks(taskId, editedTaskName, false);
            // Update the task name in the UI
            const nameTaskEle = taskContainer.querySelector(".name-task");
            nameTaskEle.textContent = editedTaskName;
            // Hide the modal
            modal.classList.remove("is-show");
          } catch (error) {
            console.error("Error updating task", error);
          }
        });
      }
    } catch (e) {
      console.error("Error fetching task details", error);
    }
  }
}

container.addEventListener("click", (e) => {
  handleTask(e);
});

// Handle Modal
const modal = document.createElement("div");
modal.className = "modal";

const overlay = document.createElement("div");
overlay.className = "overlay";

const form = document.createElement("form");
form.className = "form-add";

const inputDiv = document.createElement("div");
inputDiv.className = "input";

const input = document.createElement("input");
input.required = true;
input.type = "text";
input.id = "taskName";
input.placeholder = "Add Todos";

const buttonWrap = document.createElement("div");
buttonWrap.className = "btn-wrap";

const saveButton = document.createElement("button");
saveButton.type = "submit";
saveButton.className = "btn btn-save";
saveButton.textContent = "Save";

const cancelButton = document.createElement("button");
cancelButton.type = "button";
cancelButton.className = "btn btn-cancel";
cancelButton.textContent = "Cancel";

buttonWrap.appendChild(saveButton);
buttonWrap.appendChild(cancelButton);

inputDiv.appendChild(input);

form.appendChild(inputDiv);
form.appendChild(buttonWrap);

modal.appendChild(overlay);
modal.appendChild(form);

container.appendChild(modal);

const btnCancel = $(".btn-cancel");
const formAdd = $(".form-add");

addTodosBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.toggle("is-show");
});

btnCancel.addEventListener("click", function (e) {
  modal.classList.remove("is-show");
});

//Handle Add Task
async function handleAddTasks() {
  const taskName = formAdd.querySelector("input[type='text']").value;

  if (taskName.trim() === "") {
    alert("Task name cannot be empty");
    return;
  }
  const newTask = {
    name: taskName,
    done: false,
  };

  try {
    await postTasks(newTask);
    renderTasks(newTask.id, newTask.name, newTask.done);
    document.getElementById("taskName").value = "";
  } catch (e) {
    console.error("Error adding task: ", e);
  }
  modal.classList.remove("is-show");
}

formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("submit add tasks");

  handleAddTasks();
});

//Button Complete Task Number
function renderBtnCompleteTodos(number) {
  const completeTextEle = document.createElement("span");
  completeTextEle.className = "text";
  completeTextEle.textContent = "Completed Todos "; // Set dynamically
  const completeNumberEle = document.createElement("span");
  completeNumberEle.className = "number";
  completeNumberEle.textContent = `${number} `; // Set dynamically

  const circleIconEle = document.createElement("i");
  circleIconEle.className = "fa-solid fa-circle-right";

  const completeBtnEle = document.createElement("button");
  completeBtnEle.type = "button";
  completeBtnEle.className = "btn-complete-todos";

  completeBtnEle.appendChild(completeTextEle);
  completeTextEle.appendChild(completeNumberEle);
  completeBtnEle.appendChild(circleIconEle);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  buttonsContainer.appendChild(completeBtnEle);

  container.appendChild(buttonsContainer);
}

renderBtnCompleteTodos(0);
