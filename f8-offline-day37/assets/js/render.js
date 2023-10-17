/** @format */

import { config } from "./config.js";
import { client } from "./client.js";

const { SERVER_AUTH_API } = config;

let limit = 12;
let page = 1;

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
  const { data: blogs, response } = await client.get(
    `/blogs?limit=${limit}&page=${page}`
  );

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
  var ampm = hours >= 12 ? "PM" : "AM";
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

export function renderDatePicker() {
  const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector(".calendar");
  const month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month_picker = document.querySelector("#month-picker");
  const dayTextFormate = document.querySelector(".day-text-formate");
  const timeFormate = document.querySelector(".time-formate");
  const dateFormate = document.querySelector(".date-formate");

  month_picker.onclick = () => {
    month_list.classList.remove("hideonce");
    month_list.classList.remove("hide");
    month_list.classList.add("show");
    dayTextFormate.classList.remove("showtime");
    dayTextFormate.classList.add("hidetime");
    timeFormate.classList.remove("showtime");
    timeFormate.classList.add("hideTime");
    dateFormate.classList.remove("showtime");
    dateFormate.classList.add("hideTime");
  };

  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector(".calendar-days");
    calendar_days.innerHTML = "";
    let calendar_header_year = document.querySelector("#year");
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement("div");

      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;

        if (
          i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add("current-date");
        }
      }
      calendar_days.appendChild(day);
    }

    const calendarSetEl = document.querySelector(".calendar-set");

    calendar_days.addEventListener("click", (event) => {
      console.log(event.target);
      const selectedDay = parseInt(event.target.textContent);
      const selectedMonth = currentMonth.value;
      const selectedYear = currentYear.value;

      const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

      const currentDate = new Date();

      var timeDifference = selectedDate - currentDate;

      // You can use the selectedDay, selectedMonth, and selectedYear as needed
      console.log(`Selected Date: ${selectedDay}`);
      console.log(`Selected Month: ${month_names[selectedMonth]}`);
      console.log(`Selected Year: ${selectedYear}`);

      // To get the current time, you can use the existing timer
      // (as it updates every second)
      const currentTime = todayShowTime.textContent;
      console.log(`Current Time: ${currentTime}`);

      // Calculate days and time
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const timeDifferenceMillis = timeDifference % (1000 * 60 * 60 * 24);
      const hoursDifference = Math.floor(
        timeDifferenceMillis / (1000 * 60 * 60)
      );
      const minutesDifference = Math.floor(
        (timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60)
      );
      let timeDifferenceString;

      // Format the time difference
      if (daysDifference > 0 && hoursDifference > 0 && minutesDifference > 0) {
        timeDifferenceString =
          daysDifference > 0
            ? `Bài đăng của bạn sẽ được đăng sau ${daysDifference} ngày ${hoursDifference} giờ và ${minutesDifference} phút khi bạn submit`
            : `Bài đăng của bạn sẽ được đăng sau ${hoursDifference} giờ ${minutesDifference} phút khi bạn submit.`;
      } else {
        timeDifferenceString = `Vui lòng chọn lại thời gian đăng bài!`;
      }

      // const timeDifferenceString =
      //   daysDifference > 0
      //     ? `Bài đăng của bạn sẽ được đăng sau ${daysDifference} ngày ${hoursDifference} giờ và ${minutesDifference} phút khi bạn submit`
      //     : `Bài đăng của bạn sẽ được đăng sau ${hoursDifference} giờ ${minutesDifference} phút khi bạn submit.`;

      Toastify({
        text: timeDifferenceString,
        duration: 5000,
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

      console.log(timeDifferenceString);

      const timeSet = `${selectedDay} ${month_names[selectedMonth]} ${selectedYear} ${currentTime}`;
      calendarSetEl.innerText = timeSet;
    });
  };

  let month_list = calendar.querySelector(".month-list");
  month_names.forEach((e, index) => {
    let month = document.createElement("div");
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace("show", "hide");
      dayTextFormate.classList.remove("hideTime");
      dayTextFormate.classList.add("showtime");
      timeFormate.classList.remove("hideTime");
      timeFormate.classList.add("showtime");
      dateFormate.classList.remove("hideTime");
      dateFormate.classList.add("showtime");
    };
  });

  (function () {
    month_list.classList.add("hideonce");
  })();
  document.querySelector("#pre-year").onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector("#next-year").onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };

  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector(".time-formate");
  const todayShowDate = document.querySelector(".date-formate");

  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    "en-US",
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formateTimer = new Intl.DateTimeFormat("en-us", option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      "0"
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      "0"
    )}: ${`${timer.getSeconds()}`.padStart(2, "0")}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);
}
