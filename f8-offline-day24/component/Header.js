import html from "../core.js";

function Header() {
  return html`
    <header class="header">
      <h1>Get Things Done !</h1>
      <form
        class="form"
        onsubmit="event.preventDefault(); dispatch('add', this.querySelector('.new-todo').value.trim());this.querySelector('.new-todo').focus() "
        autofocus
        tabindex="-1"
      >
        <input
          class="new-todo"
          placeholder="What is the tasks today?"
          autofocus
          onfocus="this.focus();"
          onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())"
          tabindex="-1"
        />
        <button class="btn" type="submit">Add Task</button>
      </form>
    </header>
  `;
}

// function handleInputKeyUp(event) {
//   if (event.keyCode === 13) {
//     dispatch("add", event.target.value.trim());
//   }
// }

// function handleAddButtonClick() {
//   const inputElement = document.querySelector(".new-todo");
//   dispatch("add", inputElement.value.trim());
// }

// function Header() {
//   return html`
//     <header class="header">
//       <h1>Get Things Done !</h1>
//       <input
//         class="new-todo"
//         placeholder="What is the tasks today?"
//         autofocus
//         onkeyup="handleInputKeyUp(event)"
//       />
//       <button class="btn" onclick="handleAddButtonClick()">Add Task</button>
//     </header>
//   `;
// }

export default Header;
