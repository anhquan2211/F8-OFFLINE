var btnModal = document.querySelector(".btn-login");
var overlay = document.querySelector(".overlay");
var modal = document.querySelector(".modal");
var btnLogin = document.querySelector(".modal-login");
var btnRegister = document.querySelector(".modal-register");
var loginContent = document.querySelector(".login-content");
var registerContent = document.querySelector(".register-content");

//An hien modal.
btnModal.addEventListener("click", function () {
  modal.classList.add("show");
  registerContent.classList.add("d-none");
});

overlay.addEventListener("click", function () {
  modal.classList.remove("show");
});

document.onkeyup = function (e) {
  if (e.key === "Escape") {
    modal.classList.remove("show");
  }
};

//Chuyen tab trong modal
btnRegister.addEventListener("click", function () {
  btnRegister.classList.remove("no-active");
  btnLogin.classList.add("no-active");
  registerContent.classList.remove("d-none");
  loginContent.classList.add("d-none");
});

btnLogin.addEventListener("click", function () {
  btnLogin.classList.remove("no-active");
  btnRegister.classList.add("no-active");
  loginContent.classList.remove("d-none");
  registerContent.classList.add("d-none");
});
