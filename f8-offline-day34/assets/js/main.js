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

let isEditting = false;
let completedTaskCount = 0;
let areCompletedTasksHidden = true;

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

  // if (done) {
  //   taskWrapEle.classList.add("task-complete");
  // }

  //   container.appendChild(taskContainerEle);
  //   container.insertAdjacentHTML("beforeend", taskContainerEle);
  const buttonsContainer = document.querySelector(".buttons-container");

  // Insert taskContainerEle before buttonsContainer
  buttonsContainer.parentNode.insertBefore(taskContainerEle, buttonsContainer);
  return taskContainerEle; // Return the created element
}

//Render task from URL
async function renderTasksUI() {
  try {
    const tasks = await getTasks();
    let hasCompletedTasks = false;

    tasks.forEach((task) => {
      const taskContainer = renderTasks(task.id, task.name, task.done);
      if (task.done) {
        completedTaskCount++;
        hasCompletedTasks = true;
        taskContainer.classList.add("task-complete");
        taskContainer.classList.add("hidden");
        container.appendChild(taskContainer);
      }
      // if (hasCompletedTasks) {
      //   container.appendChild(taskContainer);
      // }
    });
    // renderBtnCompleteTodos(1);
    renderCompletedTaskCount(completedTaskCount);
  } catch (e) {
    console.error("Error fectch tasks: ", e);
  }
}

renderTasksUI();

//Handle Task
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
    // //code handle edit task and update to api
    const taskContainer = target.closest(".task-container");
    const taskId = taskContainer.querySelector(".name-task").dataset.id;
    try {
      const task = await getTaskDetails(taskId);
      if (task) {
        // Populate modal input with current task name
        const modalInput = formAdd.querySelector("input[type='text']");
        modalInput.value = task.name;
        formAdd.dataset.taskId = taskId;
        isEditting = true;
        // Show the modal
        modal.classList.add("is-show");
      }
    } catch (e) {
      console.error("Error fetching task details", e);
    }
  } else if (target.classList.contains("add-todos")) {
    const modalInput = formAdd.querySelector("input[type='text']");
    modalInput.value = "";
    formAdd.addEventListener("submit", function (e) {
      e.preventDefault();
      // handleAddTasks();
    });
  } else if (
    target.classList.contains("btn-check") ||
    target.classList.contains("fa-check-to-slot")
  ) {
    const taskContainer = target.closest(".task-container");
    const taskId = taskContainer.querySelector(".name-task").dataset.id;

    // Get the current done status of the task
    const isDone = taskContainer.classList.contains("task-complete");

    try {
      // Toggle the done status in the UI
      if (isDone) {
        taskContainer.classList.remove("task-complete");
        completedTaskCount--;
        const buttonsContainer = document.querySelector(".buttons-container");
        buttonsContainer.parentNode.insertBefore(
          taskContainer,
          buttonsContainer
        );
      } else {
        taskContainer.classList.add("task-complete");
        taskContainer.classList.add("hidden");
        container.appendChild(taskContainer);
        completedTaskCount++;
      }

      const nameTaskEle = document.querySelector(
        `.name-task[data-id='${taskId}']`
      );

      const nameTask = nameTaskEle.textContent;

      // Update the done status on the server
      await editTasks(taskId, nameTask, !isDone);
      // Render the updated completed task count
      renderCompletedTaskCount(completedTaskCount);
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  } else if (
    target.classList.contains("btn-complete-todos") ||
    target.classList.contains("text") ||
    target.classList.contains("number") ||
    target.classList.contains("fa-circle-right")
  ) {
    const buttonEle = $(".buttons-container .btn-complete-todos");
    const iconEle = $(".btn-complete-todos i");
    if (iconEle.classList.contains("fa-circle-right")) {
      iconEle.classList.remove("fa-circle-right");
      iconEle.classList.add("fa-circle-down");
    } else {
      iconEle.classList.add("fa-circle-right");
      iconEle.classList.remove("fa-circle-down");
    }
    buttonEle.classList.toggle("bg-green");
    areCompletedTasksHidden = !areCompletedTasksHidden;
    const completedTasks = $$(".task-complete");
    completedTasks.forEach((task) => {
      if (areCompletedTasksHidden) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }
}

container.addEventListener("click", (e) => {
  handleTask(e);
});

// Function to render the completed task count
function renderCompletedTaskCount(count) {
  const completeNumberEle = document.querySelector(".number");
  completeNumberEle.textContent = `${count} `;
}

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
  isEditting = false;
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

// Handle editing an existing task
async function handleEditTask(taskId) {
  const modalInput = formAdd.querySelector("input[type='text']");
  const editedTaskName = modalInput.value.trim();
  if (!editedTaskName) {
    alert("Task name cannot be empty");
    return;
  }

  try {
    // Update the task on the API
    await editTasks(taskId, editedTaskName, false);
    // Update the task name in the UI
    const nameTaskEle = document.querySelector(
      `.name-task[data-id='${taskId}']`
    );
    nameTaskEle.textContent = editedTaskName;
    modal.classList.remove("is-show");
  } catch (error) {
    console.error("Error updating task", error);
  }
}

// Add an event listener to the form submit button to handle adding/editing a task
formAdd.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (isEditting) {
    // Handle editing the existing task
    const taskId = formAdd.dataset.taskId;
    handleEditTask(taskId);
    console.log("Đang editting");
    isEditting = false; // Reset the editing flag
  } else {
    console.log("Đang thêm task mớis");
    // Handle adding a new task
    handleAddTasks();
  }
});

// formAdd.addEventListener("submit", function (e) {
//   e.preventDefault();

//   handleAddTasks();
// });

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

// Handle Loading
const loadingElement = $(".loading");
const buttonArray = $$("button");
console.log(buttonArray);
