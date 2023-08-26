import { attach } from "../store.js";
import App from "../component/App.js";

attach(App, document.getElementById("root"));

var inputHeader = document.querySelector(".new-todo");
var btn = document.querySelector(".btn");
// var labelElement = document.querySelector("label");
// console.log(labelElement);

window.inputHeader = inputHeader;

var inputCheckAll = document.querySelector("#toggle-all");
// console.log(inputCheckAll);

btn.addEventListener("click", function (e) {
  // console.log(e);
  const enterKeyEvent = new KeyboardEvent("keyup", { keyCode: 13 });

  inputHeader.dispatchEvent(enterKeyEvent);
});

inputHeader.addEventListener("click", function (e) {
  console.log(e);
});
