import html from "../core.js";
import { connect } from "../store.js";
import Header from "../component/Header.js";
import TodoList from "../component/TodoList.js";

function App({ todos }) {
  return html`
    <section class="todoapp">
      ${Header()} ${todos.length > 0 && TodoList()}
    </section>
  `;
}

export default connect()(App);
