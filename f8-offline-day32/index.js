/** @format */

F8.component("header-component", {
  template: `<h1>HEADER</h1>`,
});

F8.component("counter-app", {
  data: () => {
    return {
      count: 0,
      title: "Counter App",
    };
  },

  template: `
          <h1>{{ title }}</h1>
          <h2>Counted: <span class="count-span">{{ count }}</span> times</h2>
          <button v-on:click="count--">-</button>
          <button v-on:click="count++">+</button>
        `,
});
