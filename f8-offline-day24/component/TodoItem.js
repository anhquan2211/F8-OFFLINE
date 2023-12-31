import html from "../core.js";
import { connect } from "../store.js";

function TodoItem({ todo, index, editIndex }) {
  // console.log(todo);
  // console.log(todo.completed);
  return html`
    <li
      class="${todo.completed && "completed"} ${editIndex[index] && "editing"}"
    >
      <div class="view">
        <div class="check-container">
          <input
            type="checkbox"
            id="${todo.title}"
            ${todo.completed && "checked"}
            onchange="dispatch('toggle', ${index})"
          />
          <label for="${todo.title}" onclick="dispatch('toggle', ${index})"
            >${todo.title}</label
          >
        </div>
        <div class="action">
          <button
            class="btn-common edit-btn"
            onclick="event.preventDefault(); dispatch('startEdit', ${index})"
          >
            <i class="fa-solid fa-pen-to-square edit-icon"></i>
          </button>
          <button
            class="btn-common destroy-btn"
            onclick="dispatch('destroy', ${index})"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="edit">
        <form
          class="form"
          onsubmit="event.preventDefault(); dispatch('endEdit', { title: this.querySelector('.new-todo').value.trim(), index: ${index} });"
        >
          <input
            class="new-todo"
            placeholder="Update Task"
            autofocus
            value="${todo.title}"
            onkeyup="event.keyCode === 13 && dispatch('endEdit', { title: this.value.trim(), index: ${index} })"
          />
          <button class="btn" type="submit">Add Task</button>
        </form>
      </div>
    </li>
  `;
}

export default connect()(TodoItem);
