var inputEmailLogin = document.querySelector("#form-1 #email");
var errEmail = document.querySelector(".err-email");
var inputPasswordLogin = document.querySelector("#form-1 #password");
var errPassword = document.querySelector(".err-pass");
var showHideEle = document.querySelector(".show-hide");
var eyeNormalEle = document.querySelector(".show-hide i");

// EMAIL ONINPUT
inputEmailLogin.oninput = function () {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  errEmail.innerText = "Vui lòng nhập đúng định dạng email";

  if (regex.test(inputEmailLogin.value)) {
    errEmail.innerText = "";
    inputEmailLogin.parentElement.classList.remove("invalid");
    if (inputPasswordLogin.value === "") {
      errPassword.innerText = "Vui lòng nhập thông tin";
      inputPasswordLogin.parentElement.classList.add("invalid");
    }
  } else {
    errEmail.innerText = "Vui lòng nhập đúng định dạng email";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("invalid");
    inputPasswordLogin.parentElement.classList.add("invalid");
  }

  if (inputEmailLogin.value === "") {
    errEmail.innerText = "Vui lòng nhập thông tin";
  }

  if (inputEmailLogin.value === "" && inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }

  if (!regex.test(inputEmailLogin.value) && inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }
};

//EMAIL BLUR
inputEmailLogin.onblur = function () {
  if (!inputEmailLogin.value && !inputPasswordLogin.value) {
    errEmail.innerText = "Vui lòng nhập thông tin";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("invalid");
    inputPasswordLogin.parentElement.classList.add("invalid");
  }
};

// PASSWORD ONINPUT
inputPasswordLogin.oninput = function () {
  if (!inputEmailLogin.value) {
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputPasswordLogin.parentElement.classList.add("invalid");
  } else {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }
  if (inputPasswordLogin.value === "") {
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputPasswordLogin.parentElement.classList.add("invalid");
  }

  if (inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
    if (inputEmailLogin.value === "") {
      errEmail.innerText = "Vui lòng nhập thông tin";
      inputEmailLogin.parentElement.classList.add("invalid");
    }
  }
};

//PASSWORD BLUR
inputPasswordLogin.onblur = function () {
  if (!inputEmailLogin.value && !inputPasswordLogin.value) {
    errEmail.innerText = "Vui lòng nhập thông tin";
    errPassword.innerText = "Vui lòng nhập thông tin";
    inputEmailLogin.parentElement.classList.add("invalid");
    inputPasswordLogin.parentElement.classList.add("invalid");
  }

  if (inputPasswordLogin.value) {
    errPassword.innerText = "";
    inputPasswordLogin.parentElement.classList.remove("invalid");
  }
};

// SHOW AND HIDE PASSWORD

eyeNormalEle.classList.add("fa-eye");

showHideEle.addEventListener("click", function () {
  if (inputPasswordLogin.type === "password") {
    inputPasswordLogin.type = "text";
    eyeNormalEle.classList.remove("fa-eye");
    eyeNormalEle.classList.add("fa-eye-slash");
  } else {
    inputPasswordLogin.type = "password";
    eyeNormalEle.classList.remove("fa-eye-slash");
    eyeNormalEle.classList.add("fa-eye");
  }
});
