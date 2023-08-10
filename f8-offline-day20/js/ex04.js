const containerElement = document.querySelector(".list-container");

var arrDatas = [
  {
    img: "./assets/img/img-1.jpg",
    title: "Tiêu đề bài viết 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "./assets/img/img-2.jpg",
    title: "Tiêu đề bài viết 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "./assets/img/img-3.jpg",
    title: "Tiêu đề bài viết 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "./assets/img/img-1.jpg",
    title: "Tiêu đề bài viết 4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "./assets/img/img-2.jpg",
    title: "Tiêu đề bài viết 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

for (var index in arrDatas) {
  var html = `
    <div class="item-wrap">
        <div class="image">
            <img src="${arrDatas[index].img}" alt="title-1">
        </div>
        <div class="content">
            <h2 class="title">${arrDatas[index].title}</h2>
            <p class="desc">${arrDatas[index].desc}</p>
        </div>
    </div>
    `;
  containerElement.innerHTML += html;
}
