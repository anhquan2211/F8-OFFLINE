import storage from "./util/storage.js";

const init = {
  todos: storage.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: {},
};

const actions = {
  add({ todos }, title) {
    if (title) {
      todos.push({ title, completed: false });
      storage.set(todos);
    }
  },

  toggle({ todos }, index) {
    console.log(index);
    const todo = todos[index];
    todo.completed = !todo.completed;
    storage.set(todos);
  },

  toggleAll({ todos }, completed) {
    todos.forEach((todo) => (todo.completed = completed));
    storage.set(todos);
  },

  destroy({ todos }, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },

  startEdit(state, index) {
    state.editIndex[index] = true;
  },

  endEdit(state, { title, index }) {
    console.log(title, index);
    if (state.editIndex[index]) {
      if (title) {
        state.todos[index].title = title;
        storage.set(state.todos);
      }
      state.editIndex[index] = false;
    }
    // var indexArr = Object.keys(state.editIndex);
    // console.log(title);
    // for (var i = 0; i < indexArr.length; i++) {
    //   state.todos[i].title = title;
    //   storage.set(state.todos);
    //   state.editIndex[i] = false;
    //   break;
    // }

    // if (state.editIndex) {
    //   if (title) {
    //     state.todos[0].title = title;
    //     storage.set(state.todos);
    //   }
    //   state.editIndex[0] = false;
    // }
    // if (state.editIndex[1]) {
    //   if (title) {
    //     state.todos[1].title = title;
    //     storage.set(state.todos);
    //   }
    //   state.editIndex[1] = false;
    // }
  },

  switchFilter(state, filter) {
    state.filter = filter;
  },

  clearCompleted(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
