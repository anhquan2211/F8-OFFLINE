const counterElement = document.querySelector(".counter");
const btnElement = document.querySelector(".btn");

let timer = 0;
const INTERVAL = 1000;
let count = 30;
let isDisabled = true;

const handleDecrement = (timestamp) => {
  if (!timer) {
    timer = timestamp;
  }

  if (timestamp - timer >= INTERVAL) {
    timer = timestamp;
    count--;
    counterElement.textContent = count;

    if (count === 0) {
      isDisabled = false;
      btnElement.removeAttribute("disabled");
    }
  }

  if (count > 0) {
    window.requestAnimationFrame(handleDecrement);
  }
};

const handleGetLink = () => {
  if (!isDisabled) {
    window.open("https://fullstack.edu.vn", "_blank");
  }
};

btnElement.addEventListener("click", handleGetLink);

document.addEventListener("DOMContentLoaded", () => {
  window.requestAnimationFrame(handleDecrement);
});
