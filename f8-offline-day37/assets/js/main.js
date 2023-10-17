/** @format */

import { config } from "./config.js";
import { client } from "./client.js";

import {
  renderBtnLogin,
  renderPost,
  renderFormLogin,
  renderFormRegister,
  renderDatePicker,
} from "./render.js ";

const { SERVER_AUTH_API } = config;

client.setUrl(SERVER_AUTH_API);

const root = document.querySelector("#root");
const loadingEl = document.querySelector(".loading");

root.innerHTML = "";
renderBtnLogin();
// renderPost();

function handleLoginAndRegister() {
  const btnLogin = document.querySelector(".btn-login");
  //Handle render login form and register form
  btnLogin.addEventListener("click", () => {
    root.innerHTML = "";
    renderFormLogin();

    //Handle Login
    const formLogin = document.querySelector(".login");
    const emailLogin = document.querySelector("#email");
    const passwordLogin = document.querySelector("#password");
    formLogin.addEventListener("submit", (e) => {
      loadingEl.classList.remove("d-none");

      e.preventDefault();
      const email = emailLogin.value;
      const password = passwordLogin.value;
      if (email && password) {
        handleLogin({ email, password });
        // renderPost();
      }
    });

    //Render Form Register
    const btnRegister = document.querySelector(".btn-register-form");
    btnRegister.addEventListener("click", () => {
      root.innerHTML = "";
      renderFormRegister();

      //Handle Register
      const formRegister = document.querySelector(".register");
      const nameEl = document.querySelector("#name");
      const emailEl = document.querySelector("#email");
      const passwordEl = document.querySelector("#password");
      formRegister.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;
        if (name && email && password) {
          console.log(123);
          console.log(name, email, password);
          handleRegister({ email, password, name });
          root.innerHTML = "";
          loadingEl.classList.remove("d-none");
          renderFormLogin();
          const formLogin = document.querySelector(".login");
          const emailLogin = document.querySelector("#email");
          const passwordLogin = document.querySelector("#password");
          emailLogin.value = email;
          formLogin.addEventListener("submit", (e) => {
            loadingEl.classList.remove("d-none");
            e.preventDefault();
            const email = emailLogin.value;
            const password = passwordLogin.value;
            if (email && password) {
              handleLogin({ email, password });
              // renderPost();
              // renderDatePicker();
            }
          });
        }
        loadingEl.classList.add("d-none");
      });
    });
  });
}
handleLoginAndRegister();

//Handle register user
async function handleRegister({ email, password, name }) {
  console.log(email, password, name);
  loadingEl.classList.remove("d-none");

  const { response, data } = await client.post("/auth/register", {
    email,
    password,
    name,
  });

  console.log(response);

  if (response.ok) {
    //Logic toast register success
    loadingEl.classList.add("d-none");
    Toastify({
      text: "Bạn đã đăng ký thành công ",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #6a3093, #a044ff)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();
  }
}

//Handle login user
async function handleLogin({ email, password }) {
  loadingEl.classList.remove("d-none");

  const { response, data: datas } = await client.post("/auth/login", {
    email,
    password,
  });

  console.log(response);
  console.log(datas);

  if (response.ok) {
    loadingEl.classList.remove("d-none");
    localStorage.setItem("access_token", datas.data.accessToken);
    localStorage.setItem("refresh_token", datas.data.refreshToken);
    root.innerHTML = "";
    getUser();

    loadingEl.classList.remove("d-none");

    renderPost();
    Toastify({
      text: "Bạn đã đăng nhập thành công ",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #6a3093, #a044ff)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();
  }
}

//Get Profile
async function getUser() {
  loadingEl.classList.remove("d-none");

  const { data: user } = await client.get(
    "/users/profile",
    localStorage.getItem("access_token")
  );

  const userProfile = user.data;

  const container = document.createElement("div");
  container.classList.add("container-info");

  const nameUser = document.createElement("div");
  nameUser.classList.add("name-user");
  nameUser.innerText = `Chào ${userProfile.name}`;
  container.append(nameUser);

  const btnLogout = document.createElement("button");
  btnLogout.classList.add("btn-logout");
  btnLogout.innerText = "Đăng xuất";
  container.append(btnLogout);

  const statusUser = document.createElement("div");
  statusUser.classList.add("status");
  statusUser.innerText = "Hãy cho chúng tôi biết bạn đang nghĩ gì?";
  container.append(statusUser);

  const formPost = document.createElement("form");
  formPost.classList.add("form-post");

  const titlePost = document.createElement("label");
  titlePost.classList.add("title-post");
  titlePost.innerText = "Title bài viết";
  formPost.append(titlePost);

  const inputTitle = document.createElement("input");
  inputTitle.classList.add("input-title");
  inputTitle.placeholder = "Vui lòng nhập title bài viết của bạn...";
  formPost.append(inputTitle);

  const contentPost = document.createElement("label");
  contentPost.classList.add("content-post");
  contentPost.innerText = "Content bài viết";
  formPost.append(contentPost);

  const inputContent = document.createElement("textarea");
  inputContent.classList.add("input-content");
  inputContent.cols = 30;
  inputContent.rows = 10;
  inputContent.placeholder = "Vui lòng nhập content bài viết của bạn...";
  formPost.append(inputContent);

  // Create the container element
  const containerDate = document.createElement("div");
  containerDate.classList.add("container");

  const titleSetTime = document.createElement("div");
  titleSetTime.classList.add("title-set-time");
  titleSetTime.innerText = "Hãy chọn thời gian đăng bài của bạn!";
  containerDate.append(titleSetTime);

  // Create the calendar element
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");

  // Create the calendar header
  const calendarHeader = document.createElement("div");
  calendarHeader.classList.add("calendar-header");

  const calendarSet = document.createElement("div");
  calendarSet.classList.add("calendar-set");

  const monthPicker = document.createElement("span");
  monthPicker.classList.add("month-picker");
  monthPicker.id = "month-picker";
  monthPicker.textContent = "May";

  const yearPicker = document.createElement("div");
  yearPicker.classList.add("year-picker");
  yearPicker.id = "year-picker";

  const preYear = document.createElement("span");
  preYear.classList.add("year-change");
  preYear.id = "pre-year";
  preYear.innerHTML = "<pre><</pre>";

  const year = document.createElement("span");
  year.id = "year";
  year.textContent = "2020";

  const nextYear = document.createElement("span");
  nextYear.classList.add("year-change");
  nextYear.id = "next-year";
  nextYear.innerHTML = "<pre>></pre>";

  yearPicker.appendChild(preYear);
  yearPicker.appendChild(year);
  yearPicker.appendChild(nextYear);

  calendarHeader.appendChild(monthPicker);
  calendarHeader.appendChild(yearPicker);

  // Create the calendar body
  const calendarBody = document.createElement("div");
  calendarBody.classList.add("calendar-body");

  const calendarWeekDays = document.createElement("div");
  calendarWeekDays.classList.add("calendar-week-days");
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  weekDayNames.forEach((dayName) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = dayName;
    calendarWeekDays.appendChild(dayElement);
  });

  const calendarDays = document.createElement("div");
  calendarDays.classList.add("calendar-days");

  calendarBody.appendChild(calendarWeekDays);
  calendarBody.appendChild(calendarDays);

  // Create the calendar footer
  const calendarFooter = document.createElement("div");
  calendarFooter.classList.add("calendar-footer");

  // Create the date-time format
  const dateTimeFormat = document.createElement("div");
  dateTimeFormat.classList.add("date-time-formate");

  const dayTextFormat = document.createElement("div");
  dayTextFormat.classList.add("day-text-formate");
  dayTextFormat.textContent = "TODAY";

  const dateTimeValue = document.createElement("div");
  dateTimeValue.classList.add("date-time-value");

  const timeFormat = document.createElement("div");
  timeFormat.classList.add("time-formate");
  timeFormat.textContent = "02:51:20";

  const dateFormat = document.createElement("div");
  dateFormat.classList.add("date-formate");
  dateFormat.textContent = "23 - july - 2022";

  dateTimeValue.appendChild(timeFormat);
  dateTimeValue.appendChild(dateFormat);

  dateTimeFormat.appendChild(dayTextFormat);
  dateTimeFormat.appendChild(dateTimeValue);

  // Create the month list
  const monthList = document.createElement("div");
  monthList.classList.add("month-list");

  // Append the created elements to build the structure
  calendar.appendChild(calendarSet);
  calendar.appendChild(calendarHeader);
  calendar.appendChild(calendarBody);
  calendar.appendChild(calendarFooter);
  calendar.appendChild(dateTimeFormat);
  calendar.appendChild(monthList);

  containerDate.appendChild(calendar);

  formPost.append(containerDate);

  const btnPost = document.createElement("button");
  btnPost.classList.add("btn-post");
  btnPost.innerText = "Đăng bài";
  formPost.append(btnPost);

  container.append(formPost);

  root.append(container);

  renderDatePicker();

  const formPostEl = document.querySelector(".form-post");

  formPostEl.addEventListener("submit", (e) => {
    loadingEl.classList.remove("d-none");

    e.preventDefault();
    const titleEl = document.querySelector(".input-title");
    const contentEl = document.querySelector(".input-content");

    const title = titleEl.value;
    const content = contentEl.value;
    console.log(title, content);
    if (title && content) {
      handleNewBlog(
        title,
        content,
        localStorage.getItem("access_token"),
        titleEl,
        contentEl
      );
    }
  });

  const btnLogoutEl = document.querySelector(".btn-logout");
  btnLogoutEl.addEventListener("click", () => {
    console.log(localStorage.getItem("access_token"));
    handleSignout(localStorage.getItem("access_token"));
  });

  loadingEl.classList.add("d-none");

  // root.innerHTML = "";
  // getUser();
  // renderPost();

  // renderPost();
}
async function refreshToken() {
  const { response, data } = await client.post(
    "/auth/refresh-token",
    localStorage.getItem("access_token")
  );
  if (response.ok) {
    if (!data.status_code === "FAILED") {
      location.setItem("access_token", data.accessToken);
      location.setItem("refresh_token", data.accessToken);
    }
  }
}

async function handleSignout(token) {
  loadingEl.classList.remove("d-none");
  console.log(token);
  const { data, response } = await client.post("/auth/logout", {}, token);
  console.log(response);
  if (response.ok) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    root.innerHTML = "";
    renderBtnLogin();
    renderPost();
    handleLoginAndRegister();
    loadingEl.classList.add("d-none");
    Toastify({
      text: "Bạn đã đăng xuất thành công ",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #6a3093, #a044ff)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();
  }
}

async function handleNewBlog(title, content, token, titleEL, contentEL) {
  const { response } = await client.post("/blogs", { title, content }, token);
  if (response.ok) {
    loadingEl.classList.remove("d-none");

    root.innerHTML = "";
    getUser();
    renderPost();
    titleEL.value = "";
    contentEL.value = "";
    Toastify({
      text: "Bạn đã đăng 1 bài viết mới ",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #6a3093, #a044ff)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();
  } else {
    refreshToken();
  }

  loadingEl.classList.add("d-none");
}

async function checkToken() {
  if (localStorage.getItem("access_token")) {
    console.log(123);
    const { data: userProfile } = await client.get(
      "/users/profile",
      localStorage.getItem("access_token")
    );
    const user = userProfile.data;
    console.log(user);
    if (user) {
      root.innerHTML = "";
      getUser();
      renderPost();
    } else {
      const { data: refreshToken } = await client.post("/auth/refresh-token", {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      console.log(refreshToken);
      if (refreshToken.code === 200) {
        localStorage.setItem(
          "access_token",
          refreshToken.data.token.accessToken
        );
        localStorage.setItem(
          "refresh_token",
          refreshToken.data.token.refreshToken
        );
        // getUser();
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        renderBtnLogin();
      }
    }
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // renderBtnLogin();
    // renderPost();
  }
}
window.addEventListener("load", () => {
  loadingEl.classList.remove("d-none");
  checkToken();
  renderPost();
});
