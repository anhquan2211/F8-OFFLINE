/** @format */

import { config } from "./config.js";
import { client } from "./client.js";

const { SERVER_AUTH_API } = config;

client.setUrl(SERVER_AUTH_API);

const root = document.querySelector("#root");
const loadingEl = document.querySelector(".loading");

// Render button login
export function renderBtnLogin() {
  const btnWrap = document.createElement("div");
  btnWrap.classList.add("btn-wrap");

  const btnLogin = document.createElement("a");
  btnLogin.classList.add("btn-login");
  //   btnLogin.href = "./login.html";
  btnLogin.innerText = "Đăng nhập";

  btnWrap.append(btnLogin);

  root.append(btnWrap);
}

export async function renderPost() {
  loadingEl.classList.remove("d-none");
  const { data: blogs, response } = await client.get("/blogs");

  if (response.ok) {
    const blogsArray = blogs.data;
    console.log(blogsArray);

    const containerBlog = document.createElement("div");
    containerBlog.classList.add("container-blog");

    blogsArray.forEach((blog) => {
      const nameUser = blog.userId.name;
      const characterNameArr = nameUser.split(/\s+/);
      const firstCharacterName =
        characterNameArr[characterNameArr.length - 1].charAt(0);
      const title = blog.title;
      const content = blog.content;
      const date = blog.createdAt;

      const blogItem = document.createElement("div");
      blogItem.classList.add("blog-item");

      const image = document.createElement("img");
      image.src = "./assets/images/image.jpg";
      blogItem.append(image);

      const titleEl = document.createElement("div");
      titleEl.classList.add("title");
      titleEl.innerText = title;
      blogItem.append(titleEl);

      const contentEl = document.createElement("div");
      contentEl.classList.add("content");
      contentEl.innerText = content;
      blogItem.append(contentEl);

      const info = document.createElement("div");
      info.classList.add("info");

      const avatar = document.createElement("div");
      avatar.classList.add("avatar");
      avatar.classList.add("info-item");
      avatar.innerText = firstCharacterName;
      info.append(avatar);

      const name = document.createElement("div");
      name.classList.add("name");
      name.classList.add("info-item");
      name.innerText = nameUser;
      info.append(name);

      const time = document.createElement("div");
      time.classList.add("time");
      time.classList.add("info-item");
      time.innerText = formatDate(date);
      info.append(time);

      blogItem.append(info);

      containerBlog.append(blogItem);
    });
    root.append(containerBlog);
  } else {
  }
  loadingEl.classList.add("d-none");
}

export function renderFormLogin() {
  const container = document.createElement("div");
  container.classList.add("container-login");

  const containerLeft = document.createElement("div");
  containerLeft.classList.add("container-left");

  const h2El = document.createElement("h2");
  h2El.innerText = "Đăng nhập";
  containerLeft.append(h2El);

  const pEl = document.createElement("p");
  pEl.innerText = "Vui lòng nhập email và password của bạn";
  containerLeft.append(pEl);

  const gotoHome = document.createElement("a");
  gotoHome.classList.add("go-home");
  gotoHome.innerText = "Go to home";
  //   gotoHome.href = "./index.html";
  containerLeft.append(gotoHome);

  const containerRight = document.createElement("div");
  containerRight.classList.add("container-right");

  const formLogin = document.createElement("form");
  formLogin.classList.add("login");

  const labelEmail = document.createElement("label");
  labelEmail.for = "email";
  labelEmail.innerText = "Enter Your Email";
  formLogin.append(labelEmail);

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "Please enter your email";
  formLogin.append(inputEmail);

  const labelPassword = document.createElement("label");
  labelPassword.for = "password";
  labelPassword.innerText = "Enter Your Password";
  formLogin.append(labelPassword);

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "password";
  inputPassword.placeholder = "Please enter your password";
  formLogin.append(inputPassword);

  const buttonLogin = document.createElement("button");
  buttonLogin.classList.add("btn-login-form");
  buttonLogin.innerText = "Đăng nhập";
  formLogin.append(buttonLogin);

  const buttonRegister = document.createElement("button");
  buttonRegister.classList.add("btn-register-form");
  buttonRegister.innerText = "Đăng ký";
  formLogin.append(buttonRegister);

  containerRight.append(formLogin);

  container.append(containerLeft);
  container.append(containerRight);

  root.append(container);
}

export function renderFormRegister() {
  const container = document.createElement("div");
  container.classList.add("container-register");

  const containerLeft = document.createElement("div");
  containerLeft.classList.add("container-left");

  const h2El = document.createElement("h2");
  h2El.innerText = "Đăng ký";
  containerLeft.append(h2El);

  const pEl = document.createElement("p");
  pEl.innerText = "Vui lòng nhập email và password của bạn";
  containerLeft.append(pEl);

  const gotoHome = document.createElement("a");
  gotoHome.classList.add("go-home");
  gotoHome.innerText = "Go to home";
  //   gotoHome.href = "./index.html";
  containerLeft.append(gotoHome);

  const containerRight = document.createElement("div");
  containerRight.classList.add("container-right");

  const formRegister = document.createElement("form");
  formRegister.classList.add("register");

  const labelName = document.createElement("label");
  labelName.for = "name";
  labelName.innerText = "Enter Your Name";
  formRegister.append(labelName);

  const inputName = document.createElement("input");
  inputName.type = "name";
  inputName.id = "name";
  inputName.placeholder = "Please enter your name";
  formRegister.append(inputName);

  const labelEmail = document.createElement("label");
  labelEmail.for = "email";
  labelEmail.innerText = "Enter Your Email";
  formRegister.append(labelEmail);

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "email";
  inputEmail.placeholder = "Please enter your email";
  formRegister.append(inputEmail);

  const labelPassword = document.createElement("label");
  labelPassword.for = "password";
  labelPassword.innerText = "Enter Your Password";
  formRegister.append(labelPassword);

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.id = "password";
  inputPassword.placeholder = "Please enter your password";
  formRegister.append(inputPassword);

  const buttonRegister = document.createElement("button");
  buttonRegister.classList.add("btn-register-form");
  buttonRegister.innerText = "Đăng ký";
  formRegister.append(buttonRegister);

  containerRight.append(formRegister);

  container.append(containerLeft);
  container.append(containerRight);

  root.append(container);
}

function formatDate(date) {
  date = new Date(date);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
}
