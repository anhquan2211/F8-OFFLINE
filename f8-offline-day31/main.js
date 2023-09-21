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
    document.querySelector(".counter").textContent = count;

    if (count === 0) {
      isDisabled = false;
      document.querySelector(".btn").removeAttribute("disabled");
    }
  }

  if (count > 0) {
    window.requestAnimationFrame(handleDecrement);
  }
};

const handleGetLink = () => {
  if (!isDisabled) {
    window.location.href = "https://fullstack.edu.vn";
  }
};

document.querySelector(".btn").addEventListener("click", handleGetLink);

document.addEventListener("DOMContentLoaded", () => {
  window.requestAnimationFrame(handleDecrement);
});
