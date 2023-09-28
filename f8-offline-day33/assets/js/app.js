/** @format */

import { handleSearchAction, setAction, setActionSuccess } from "./ultis.js";

export function createApp() {
  const app = document.createElement("div");
  app.className = "search-container";

  const h1 = document.createElement("h1");
  h1.textContent = "Dương muốn làm gì? Hãy nói cho anh biết!";
  app.appendChild(h1);

  const button = document.createElement("button");
  button.className = "btn";
  button.textContent = "Bấm vào đây để nói!";
  button.addEventListener("click", () => handleSearchAction(action, app));
  app.appendChild(button);

  const action = document.createElement("div");
  action.className = "action";
  app.appendChild(action);

  let output;

  return app;
}
