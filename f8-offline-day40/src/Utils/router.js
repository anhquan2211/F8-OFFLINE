import Navigo from "navigo";

const routerInit = new Navigo("/", { linksSelector: "a", hash: true });
const app = document.querySelector("#app");

const render = (html) => (app.innerHTML = html);
window.navigate = (path) => routerInit.navigate(path);

const renderUI = (defaultLayout, component, params) => {
  const html = defaultLayout().replace(/\{.*\}/g, component(params));
  return html || component(params);
};

const router = (pathArr, defaultLayout) => {
  pathArr.forEach((pathItem) => {
    routerInit.on(pathItem.path, (item) =>
      render(renderUI(defaultLayout, pathItem.component, item))
    );
  });
  routerInit.resolve();
};

export { routerInit, router };
