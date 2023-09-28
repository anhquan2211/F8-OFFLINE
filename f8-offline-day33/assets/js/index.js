/** @format */

import { createApp } from "./app.js";

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  const app = createApp();
  root.appendChild(app);
});
