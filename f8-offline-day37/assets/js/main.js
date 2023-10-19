/** @format */

import { config } from "./config.js";
import { client } from "./client.js";

import {
  renderBtnLogin,
  renderPost,
  renderFormLogin,
  renderFormRegister,
  renderDatePicker,
  renderDetailPost,
} from "./render.js ";

const { SERVER_AUTH_API } = config;

client.setUrl(SERVER_AUTH_API);

const root = document.querySelector("#root");
const loadingEl = document.querySelector(".loading");

root.innerHTML = "";
// setTimeout(() => {
//   // renderBtnLogin();
// }, 3000);

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
    const goHome = document.querySelector(".go-home");
    formLogin.addEventListener("submit", (e) => {
      loadingEl.classList.remove("d-none");

      e.preventDefault();
      const email = emailLogin.value;
      const password = passwordLogin.value;
      if (email && password) {
        handleLogin({ email, password });
        // renderPost();
      } else {
        Toastify({
          text: "Đăng nhập thất bại! ",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
            borderRadius: "10px",
            color: "#fff",
          },
        }).showToast();
        loadingEl.classList.add("d-none");
      }
    });

    goHome.addEventListener("click", (e) => {
      root.innerHTML = "";
      renderBtnLogin();
      renderPost().then(() => {
        handleDetailPost();
      });
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
        } else {
          Toastify({
            text: "Đăng ký thất bại! ",
            duration: 3000,
            destination: "",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
              borderRadius: "10px",
              color: "#fff",
            },
          }).showToast();
          loadingEl.classList.add("d-none");
        }
        loadingEl.classList.add("d-none");
      });

      const goHome = document.querySelector(".go-home");
      goHome.addEventListener("click", (e) => {
        root.innerHTML = "";
        renderBtnLogin();
        renderPost().then(() => {
          handleDetailPost();
        });
      });
    });
  });
}

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
      destination: "",
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

    renderPost().then(() => {
      handleDetailPost();
    });
    Toastify({
      text: "Bạn đã đăng nhập thành công ",
      duration: 3000,
      destination: "",
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
    loadingEl.classList.add("d-none");
    Toastify({
      text: "Có lỗi xảy ra. Vui lòng thử lại! ",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();
  }
}

//Get Profile
async function getUser() {
  loadingEl.classList.remove("d-none");

  const { data: user, response } = await client.get(
    "/users/profile",
    localStorage.getItem("access_token")
  );

  if (+response.status === 401 || +response.status === 400) {
    refreshToken();
  }

  if (response.ok) {
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
      const calendarSet = document.querySelector(".calendar-set");

      const calendarSetTime = calendarSet.innerText;
      const title = titleEl.value;
      const content = contentEl.value;
      const token = localStorage.getItem("access_token");
      console.log(title, content);
      if (title && content && !calendarSetTime) {
        handlePostBlog(title, content, token, titleEl, contentEl);
      } else if (!title && !content) {
        Toastify({
          text: "Bài viết không hợp lệ! ",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
            borderRadius: "10px",
            color: "#fff",
          },
        }).showToast();
        loadingEl.classList.add("d-none");
      } else if (calendarSetTime) {
        Toastify({
          text: "Chức năng đăng bài theo ngày chưa xử lý. Vui lòng không chọn ngày giờ để đăng bài!",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
            borderRadius: "10px",
            color: "#fff",
          },
        }).showToast();
        loadingEl.classList.add("d-none");
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
    return user;
  }
}

async function refreshToken() {
  const { response, data: dataToken } = await client.post(
    "/auth/refresh-token",
    {
      refreshToken: localStorage.getItem("refresh_token"),
    }
  );
  // console.log(data);
  console.log("Response của refresh token: ", response);
  if (response.ok) {
    if (dataToken.code === 200) {
      console.log("ok");
      localStorage.setItem("access_token", dataToken.data.token.accessToken);
      localStorage.setItem("refresh_token", dataToken.data.token.refreshToken);
    }
  } else {
    root.innerHTML = "";
    renderBtnLogin();
    handleLoginAndRegister();
    Toastify({
      text: "Vui lòng đăng nhập lại! ",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        borderRadius: "10px",
        color: "#000",
      },
    }).showToast();
    renderPost().then(() => {
      handleNoneButtonDetail();
    });
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    renderPost().then(() => {
      handleNoneButtonDetail();
    });
    handleLoginAndRegister();
    loadingEl.classList.add("d-none");
    Toastify({
      text: "Bạn đã đăng xuất thành công ",
      duration: 3000,
      destination: "",
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
    checkAuth(response);
    root.innerHTML = "";
    renderBtnLogin();
    renderPost().then(() => {
      handleDetailPost();
    });
    handleLoginAndRegister();
  }
}

async function handlePostBlog(title, content, token, titleEL, contentEL) {
  const { response, data } = await client.post(
    "/blogs",
    { title, content },
    token
  );
  console.log(token);
  // console.log(response);
  // console.log(data);
  if (response.ok) {
    loadingEl.classList.remove("d-none");

    root.innerHTML = "";
    getUser();
    renderPost().then(() => {
      handleDetailPost();
    });
    titleEL.value = "";
    contentEL.value = "";
    Toastify({
      text: "Bạn đã đăng 1 bài viết mới ",
      duration: 3000,
      destination: "",
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
    console.log("Đăng bài viết lỗi!");
    refreshToken()
      .then(async () => {
        const { response, data } = await client.post(
          "/blogs",
          { title, content },
          localStorage.getItem("access_token")
        );
        console.log(localStorage.getItem("access_token"));

        if (response.ok) {
          console.log(12345678);
          root.innerHTML = "";
          getUser();
          renderPost().then(() => {
            handleDetailPost();
          });
          titleEL.value = "";
          contentEL.value = "";
          Toastify({
            text: "Bạn đã đăng 1 bài viết mới ",
            duration: 3000,
            destination: "",
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
      })
      .catch(() => {
        root.innerHTML = "";
        renderBtnLogin();
        handleLoginAndRegister();
        Toastify({
          text: "Vui lòng đăng nhập lại! ",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
            borderRadius: "10px",
            color: "#000",
          },
        }).showToast();
        renderPost().then(() => {
          handleDetailPost();
        });
      });

    loadingEl.classList.add("d-none");
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
      renderPost().then(() => {
        handleDetailPost();
      });
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
        root.innerHTML = "";
        getUser();
        renderPost().then(() => {
          handleDetailPost();
        });
      } else {
        console.log("Refresh thất bại!");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        root.innerHTML = "";
        renderBtnLogin();
        handleLoginAndRegister();
        renderPost().then(() => {
          handleNoneButtonDetail();
        });
        Toastify({
          text: "Vui lòng đăng nhập lại! ",
          duration: 3000,
          destination: "",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
            borderRadius: "10px",
            color: "#000",
          },
        }).showToast();
      }
    }
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    renderBtnLogin();
    handleLoginAndRegister();
    renderPost().then(() => {
      handleNoneButtonDetail();
    });
    // refreshToken();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  loadingEl.classList.remove("d-none");
  checkToken();
  // checkToken().then(() => {
  //   // getUser();
  //   // renderBtnLogin;
  //   // renderPost();
  // });
  // .then(() => {
  //   renderBtnLogin();
  // })
  // .catch(() => {
  //   renderBtnLogin();
  //   handleLoginAndRegister();
  // })
  // .finally(() => {
  //   renderPost();
  // });
  // renderPost();
});

function checkAuth(response) {
  if (response.status === 401) {
    Toastify({
      text: "Đăng xuất thành công ",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        borderRadius: "10px",
        color: "#fff",
      },
    }).showToast();

    loadingEl.classList.add("d-none");
  }
}

// Handle click button view detail post
function handleDetailPost() {
  const btnDetailPost = document.querySelectorAll(".btn-detail");
  btnDetailPost.forEach((btnDetail) => {
    btnDetail.addEventListener("click", () => {
      root.innerHTML = "";
      renderDetailPost();

      window.scrollTo(0, 0);

      const titleDetail = document.querySelector(".title-detail");
      const contentDetail = document.querySelector(".content-detail");
      const avatarDetail = document.querySelector(".avatar-detail");
      const nameDetail = document.querySelector(".name-detail");
      const timeDetail = document.querySelector(".time-detail");

      const childrenTarget = btnDetail.parentElement.children;
      Array.from(childrenTarget).forEach((element) => {
        if (element.classList.contains("title")) {
          console.log(element);
          const textHandle =
            element.innerText.charAt(0).toUpperCase() +
            element.innerText.slice(1);

          titleDetail.innerText = textHandle;
        } else if (element.classList.contains("content")) {
          contentDetail.innerText = element.innerText;
          let strContent = contentDetail.innerText;
          strContent = replacePhoneNumbers(strContent);
          strContent = replaceEmailAddresses(strContent);
          if (
            strContent.includes("youtube") ||
            strContent.includes("youtu.be")
          ) {
            strContent = replaceYouTubeVideos(strContent);
          } else {
            strContent = replaceLinks(strContent);
          }

          contentDetail.innerHTML = strContent;
        } else if (element.classList.contains("info")) {
          console.log(element);
          Array.from(element.children).forEach((info) => {
            if (info.classList.contains("avatar")) {
              avatarDetail.innerText = info.innerText;
            } else if (info.classList.contains("name")) {
              nameDetail.innerText = info.innerText;
            } else if (info.classList.contains("time")) {
              timeDetail.innerText = info.innerText;
            }
          });
        }
      });

      handleGoHome();
    });
  });
}

function handleGoHome() {
  const buttonGoHome = document.querySelector(".btn-go-home");
  buttonGoHome.addEventListener("click", () => {
    loadingEl.classList.remove("d-none");
    checkToken()
      .then(() => {
        loadingEl.classList.add("d-none");
      })
      .catch(() => {
        renderBtnLogin();
        renderPost();
      });
    // root.innerHTML = "";
  });
}

function handleNoneButtonDetail() {
  const btnDetailPost = document.querySelectorAll(".btn-detail");
  btnDetailPost.forEach((btnDetail) => {
    btnDetail.addEventListener("click", () => {
      Toastify({
        text: "Vui lòng đăng nhập để xem chi tiết bài viết! ",
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
          borderRadius: "10px",
          color: "#000",
        },
      }).showToast();
    });
  });
}

function replacePhoneNumbers(content) {
  const phonePattern =
    /[\+]?[(]?([0-9]{3})[)]?[-\s\.]?([0-9]{3})[-\s\.]?([0-9]{4,6})/g;
  return content.replace(phonePattern, (match, p1, p2, p3) => {
    const phoneNumber = p1 + p2 + p3;
    return `<a href="tel:${phoneNumber}" data-start="${p1}">${match}</a>`;
  });
}

function replaceEmailAddresses(content) {
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/g;
  return content.replace(emailPattern, (match) => {
    return `<a href="mailto:${match}">${match}</a>`;
  });
}

function replaceYouTubeVideos(content) {
  const youtubePattern =
    /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?/g;
  return content.replace(youtubePattern, (match) => {
    const videoID = match.match(
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    )[2];
    const anchorElement = `<a href="${match}" target="_blank">${match}</a>`;
    const iframeElement = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allowfullscreen></iframe>`;
    return `${anchorElement}<br>${iframeElement}`;
  });
}

function replaceLinks(content) {
  const linkPattern =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zAZ0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  return content.replace(linkPattern, (match) => {
    return `<a href="${match}" target="_blank">${match}</a>`;
  });
}
