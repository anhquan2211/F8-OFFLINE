var inputFullNameRegister = document.querySelector("#form-2 #fullName");
var errFullNameRegister = document.querySelector("#form-2 .err-fullName");
var inputEmailRegister = document.querySelector("#form-2 #email");
var errEmailRegister = document.querySelector("#form-2 .err-email");
var inputPasswordRegister = document.querySelector("#form-2 #password");
var errPasswordRegister = document.querySelector("#form-2 .err-pass");
var showHideEleRegister = document.querySelector("#form-2 .show-hide");
var eyeNormalEleRegister = document.querySelector("#form-2 .show-hide i");

console.log(eyeNormalEleRegister);
// EMAIL ONINPUT
inputEmailRegister.oninput = function () {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  errEmailRegister.innerText = "Vui lòng nhập đúng định dạng email";

  if (regex.test(inputEmailRegister.value)) {
    errEmailRegister.innerText = "";
    inputEmailRegister.parentElement.classList.remove("invalid");
    if (inputPasswordRegister.value === "") {
      errPasswordRegister.innerText = "Vui lòng nhập thông tin";
      inputPasswordRegister.parentElement.classList.add("invalid");
    }
  } else {
    errEmailRegister.innerText = "Vui lòng nhập đúng định dạng email";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("invalid");
    inputPasswordRegister.parentElement.classList.add("invalid");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  }

  if (inputEmailRegister.value === "") {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
  }

  if (inputEmailRegister.value === "" && inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }

  if (inputEmailRegister.value === "" && inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }

  if (
    inputEmailRegister.value &&
    inputPasswordRegister.value &&
    inputFullNameRegister.value
  ) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }

  if (inputEmailRegister.value && inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }
};

//EMAIL BLUR
inputEmailRegister.onblur = function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("invalid");
    inputPasswordRegister.parentElement.classList.add("invalid");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  }
};

// PASSWORD ONINPUT
inputPasswordRegister.oninput = function () {
  if (!inputEmailRegister.value) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("invalid");
  } else {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }
  if (inputPasswordRegister.value === "") {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("invalid");
  }

  if (inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
    if (inputEmailRegister.value === "") {
      errEmailRegister.innerText = "Vui lòng nhập thông tin";
      inputEmailRegister.parentElement.classList.add("invalid");
    }
    if (inputFullNameRegister.value === "") {
      errFullNameRegister.innerText = "Vui lòng nhập thông tin";
      inputFullNameRegister.parentElement.classList.add("invalid");
    }
  }

  if (inputPasswordRegister.value.length <= 6) {
    errPasswordRegister.innerText = "Mật khẩu tối thiểu 6-20 ký tự";
    inputPasswordRegister.parentElement.classList.add("invalid");
  }
  if (inputPasswordRegister.value.length === 0) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("invalid");
  }
};

//PASSWORD BLUR
inputPasswordRegister.onblur = function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("invalid");
    inputPasswordRegister.parentElement.classList.add("invalid");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  }

  if (inputPasswordRegister.value) {
    errPasswordRegister.innerText = "";
    inputPasswordRegister.parentElement.classList.remove("invalid");
  }

  if (inputPasswordRegister.value.length <= 6) {
    errPasswordRegister.innerText = "Mật khẩu tối thiểu 6-20 ký tự";
    inputPasswordRegister.parentElement.classList.add("invalid");
  }
  if (inputPasswordRegister.value.length === 0) {
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputPasswordRegister.parentElement.classList.add("invalid");
  }
};

// FULLNAME ONINPUT
inputFullNameRegister.oninput = function () {
  if (!inputEmailRegister.value) {
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  } else {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }
  if (inputFullNameRegister.value === "") {
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  }

  if (inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
    if (inputEmailRegister.value === "") {
      errEmailRegister.innerText = "Vui lòng nhập thông tin";
      inputEmailRegister.parentElement.classList.add("invalid");
    }

    if (inputPasswordRegister.value === "") {
      errPasswordRegister.innerText = "Vui lòng nhập thông tin";
      inputPasswordRegister.parentElement.classList.add("invalid");
    }
  }
};

//FULLNAME BLUR
inputFullNameRegister.onblur = function () {
  if (
    !inputEmailRegister.value &&
    !inputPasswordRegister.value &&
    !inputFullNameRegister.value
  ) {
    errEmailRegister.innerText = "Vui lòng nhập thông tin";
    errPasswordRegister.innerText = "Vui lòng nhập thông tin";
    inputEmailRegister.parentElement.classList.add("invalid");
    inputPasswordRegister.parentElement.classList.add("invalid");
    errFullNameRegister.innerText = "Vui lòng nhập thông tin";
    inputFullNameRegister.parentElement.classList.add("invalid");
  }

  if (inputFullNameRegister.value) {
    errFullNameRegister.innerText = "";
    inputFullNameRegister.parentElement.classList.remove("invalid");
  }
};

// SHOW AND HIDE PASSWORD

eyeNormalEleRegister.classList.add("fa-eye");

showHideEleRegister.addEventListener("click", function () {
  if (inputPasswordRegister.type === "password") {
    inputPasswordRegister.type = "text";
    eyeNormalEleRegister.classList.remove("fa-eye");
    eyeNormalEleRegister.classList.add("fa-eye-slash");
  } else {
    inputPasswordRegister.type = "password";
    eyeNormalEleRegister.classList.remove("fa-eye-slash");
    eyeNormalEleRegister.classList.add("fa-eye");
  }
});
