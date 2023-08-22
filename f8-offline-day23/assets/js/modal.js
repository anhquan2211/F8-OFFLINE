var btnModal = document.querySelector(".btn-login");
var overlay = document.querySelector(".overlay");
var modal = document.querySelector(".modal");
var btnLogin = document.querySelector(".modal-login");
var btnRegister = document.querySelector(".modal-register");
var loginContent = document.querySelector(".login-content");
var registerContent = document.querySelector(".register-content");

var inputEmailLogin = document.querySelector("#form-1 #email");
var inputPasswordLogin = document.querySelector("#form-1 #password");
var errEmail = document.querySelector(".err-email");
var errPassword = document.querySelector(".err-pass");

var inputFullNameRegister = document.querySelector("#form-2 #fullName");
var errFullNameRegister = document.querySelector("#form-2 .err-fullName");
var inputEmailRegister = document.querySelector("#form-2 #email");
var errEmailRegister = document.querySelector("#form-2 .err-email");
var inputPasswordRegister = document.querySelector("#form-2 #password");
var errPasswordRegister = document.querySelector("#form-2 .err-pass");

//An hien modal.
btnModal.addEventListener("click", function () {
  modal.classList.add("show");
  registerContent.classList.add("d-none");
  btnLogin.classList.remove("no-active");
  btnRegister.classList.add("no-active");
  loginContent.classList.remove("d-none");
  registerContent.classList.add("d-none");

  inputEmailLogin.form.reset();
  if (inputEmailLogin.value === "") {
    errEmail.innerText = "";
    inputEmailLogin.parentElement.classList.remove("invalid");
  }

  inputPasswordLogin.form.reset();
  if (inputPasswordLogin.value === "") {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }

  // RESET REGISTER
  inputFullNameRegister.form.reset();
  if (inputFullNameRegister.value === "") {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }

  inputEmailRegister.form.reset();
  if (inputEmailRegister.value === "") {
    errEmailRegister.innerText = "";
    inputEmailRegister.parentElement.classList.remove("invalid");
  }

  inputPasswordRegister.form.reset();
  if (inputPasswordRegister.value === "") {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }
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

  inputEmailLogin.form.reset();
  if (inputEmailLogin.value === "") {
    errEmail.innerText = "";
    inputEmailLogin.parentElement.classList.remove("invalid");
  }

  inputPasswordLogin.form.reset();
  if (inputPasswordLogin.value === "") {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }

  // RESET REGISTER
  inputFullNameRegister.form.reset();
  if (inputFullNameRegister.value === "") {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }

  inputEmailRegister.form.reset();
  if (inputEmailRegister.value === "") {
    errEmailRegister.innerText = "";
    inputEmailRegister.parentElement.classList.remove("invalid");
  }

  inputPasswordRegister.form.reset();
  if (inputPasswordRegister.value === "") {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }
});

btnLogin.addEventListener("click", function () {
  btnLogin.classList.remove("no-active");
  btnRegister.classList.add("no-active");
  loginContent.classList.remove("d-none");
  registerContent.classList.add("d-none");

  inputEmailLogin.form.reset();
  if (inputEmailLogin.value === "") {
    errEmail.innerText = "";
    inputEmailLogin.parentElement.classList.remove("invalid");
  }

  inputPasswordLogin.form.reset();
  if (inputPasswordLogin.value === "") {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }

  // RESET REGISTER
  inputFullNameRegister.form.reset();
  if (inputFullNameRegister.value === "") {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }

  inputEmailRegister.form.reset();
  if (inputEmailRegister.value === "") {
    errEmailRegister.innerText = "";
    inputEmailRegister.parentElement.classList.remove("invalid");
  }

  inputPasswordRegister.form.reset();
  if (inputPasswordRegister.value === "") {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }
});
