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
  handleInputKeyUp(e);
});

function handleInputKeyUp(e) {
  console.log(e.type);
  if (e.type === "click") {
    console.log(true);
    handleAddAction();
  }
}

function handleAddAction() {
  if (inputHeader.value.trim() !== "") {
    dispatch("add", inputHeader.value.trim());
    btn.addEventListener("click", function (e) {
      // console.log(e);
      handleInputKeyUp(e);
    });
  }
}
