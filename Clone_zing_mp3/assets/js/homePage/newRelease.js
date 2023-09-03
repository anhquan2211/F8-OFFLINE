// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "PLAYER";
const player = $(".control-player .container");
const imgMedia = $(".control-player .media-left img");
const heading = $(".media-center .name-song");
const author = $(".media-center .author");
const audio = $("#audio");
const playBtn = $(".action-play-pause");
const button = $(".btn");
const progress = $("#progress");
const prevBtn = $(".icon-prev");
const nextBtn = $(".icon-next");
const randomBtn = $(".icon-shuffle");
const repeatBtn = $(".icon-repeat");
const playlist = $(".list-music-app");
const volumeBar = $(".volume-bar");
const muteIcon = $(".icon-mute");
const unmuteIcon = $(".icon-unmute");
const audioDuration = $(".time-right");
const audioTimeLeft = $(".time-left");
const timer = $(".timer");
const durationBar = $(".duration-bar");
var r = $(":root");

const initialConfig = {
  isRandom: false,
  isRepeat: false,
  currentIndex: 0,
  isPlaying: false,
  currentVolume: 1,
  savedVolume: 1,
  progressSong: 0,
};

const storedConfig = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY));

const app = {
  isMove: false,
  isRandom: false,
  isRepeat: false,
  isDraggingProgress: true,
  currentIndex: 0,
  isPlaying: false,
  playedIndexes: [],
  currentVolume: 1,
  savedVolume: 1,
  progressSong: 0,
  config: storedConfig || initialConfig,
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Call Me",
      singer: "Wren Evans, Itsnk",
      path: "./assets/music/newReleaseList/song10.mp3",
      image: "./assets/images/newReleaseImg/song10.webp",
      time: "3 ngày trước",
    },
    {
      name: "Ngõ Chạm",
      singer: "BigDaddy, Emily",
      path: "./assets/music/newReleaseList/song11.mp3",
      image: "./assets/images/newReleaseImg/song11.webp",
      time: "1 ngày trước",
    },
    {
      name: "Có Ai Hẹn Hò Cùng Em Chưa",
      singer: "Quân A.P",
      path: "./assets/music/newReleaseList/song12.mp3",
      image: "./assets/images/newReleaseImg/song12.webp",
      time: "6 ngày trước",
    },
    {
      name: "Không Thể Say",
      singer: "HIEUTHUHAI",
      path: "./assets/music/newReleaseList/song1.mp3",
      image: "./assets/images/newReleaseImg/song1.jpg",
      time: "2 ngày trước",
    },
    {
      name: "Để tôi ôm em bằng giai điệu này",
      singer: "Kai Dinh, MIN, GREY D",
      path: "./assets/music/newReleaseList/song2.mp3",
      image: "./assets/images/newReleaseImg/song2.jpg",
      time: "4 ngày trước",
    },
    {
      name: "Nếu Lúc Đó",
      singer: "tlinh, 2pillz",
      path: "./assets/music/newReleaseList/song3.mp3",
      image: "./assets/images/newReleaseImg/song3.jpg",
      time: "1 ngày trước",
    },
    {
      name: "Waiting For You",
      singer: "Mono",
      path: "./assets/music/newReleaseList/song4.mp3",
      image: "./assets/images/newReleaseImg/song4.jpg",
      time: "7 ngày trước",
    },
    {
      name: "Lan Man",
      singer: "Ronboogz",
      path: "./assets/music/newReleaseList/song5.mp3",
      image: "./assets/images/newReleaseImg/song5.jpg",
      time: "5 ngày trước",
    },
    {
      name: "Ngủ Một Mình (tình Rất Tình)",
      singer: "HIEUTHUHAI, Negav, Kewtiie",
      path: "./assets/music/newReleaseList/song6.mp3",
      image: "./assets/images/newReleaseImg/song6.jpg",
      time: "6 ngày trước",
    },
    {
      name: "Ai Mới Là Kẻ Xấu Xa",
      singer: "MCK",
      path: "./assets/music/newReleaseList/song7.mp3",
      image: "./assets/images/newReleaseImg/song7.jpg",
      time: "8 ngày trước",
    },
    {
      name: "Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau",
      singer: "O.lew",
      path: "./assets/music/newReleaseList/song8.mp3",
      image: "./assets/images/newReleaseImg/song8.jpg",
      time: "9 ngày trước",
    },
    {
      name: "Chuyện Chúng Ta Sau Này",
      singer: "Hải Đăng Doo, ERIK",
      path: "./assets/music/newReleaseList/song9.mp3",
      image: "./assets/images/newReleaseImg/song9.jpg",
      time: "3 ngày trước",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="item ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="avatar">
                  <img
                    src="${song.image}"
                    alt="${song.name}"
                  />
                  <i class="fa-solid fa-play"></i>
                </div>

                <div class="info">
                  <h3 class="info-title">${song.name}</h3>
                  <h4 class="info-author">${song.singer}</h4>
                  <span class="info-time">${song.time}</span>
                </div>

                <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
                </div>
              </div>
            `;
    });
    playlist.innerHTML = htmls.join("");
  },

  //Ngay khi bat dau thi se lay bai hay dau tien Current Song.
  definedProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;

    let isTouchingVolume = false;
    volumeBar.addEventListener(
      "touchstart",
      (e) => {
        isTouchingVolume = true;
      },
      { passive: false }
    );

    var getTime = function (seconds) {
      var mins = Math.floor(seconds / 60);
      seconds = Math.floor(seconds - mins * 60);
      return `${mins < 10 ? "0" + mins : mins}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    };

    progress.addEventListener("mousemove", function (e) {
      e.stopPropagation();
      if (audio.duration) {
        var isMove = false;
        if (!isMove) {
          timer.style.display = "block";
          timer.style.left = `${e.offsetX + 65}px`;
          var percentage = (100 * e.offsetX) / this.clientWidth;
          var time = (audio.duration * percentage) / 100;
          if (time <= audio.duration && time >= 0) {
            timer.innerText = getTime(time);
          } else {
            timer.style.display = "none";
          }
        }
      }
    });

    progress.addEventListener("mouseout", function () {
      isMove = false;
      timer.style.display = "none";
    });

    document.addEventListener("touchmove", (e) => {
      if (isTouchingVolume) {
        e.preventDefault(); // Ngăn cuộn trang khi di chuyển ngón tay
      }
    });

    document.addEventListener("touchend", (e) => {
      isTouchingVolume = false;
    });

    playBtn.addEventListener(
      "touchstart",
      (e) => {
        playBtn.style.backgroundColor = "#00ffca";
      },
      { passive: true }
    );

    playBtn.addEventListener(
      "touchend",
      (e) => {
        playBtn.style.backgroundColor = "";
      },
      { passive: true }
    );

    playBtn.onmousedown = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      // Khi bài hát đc play
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add("playing");
      };

      // Khi bài hát pause
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
      };
    };

    let isTouchingProgressBar = false;

    progress.addEventListener(
      "touchstart",
      (e) => {
        if (e.cancelable) {
          e.preventDefault();
        }
        isTouchingProgressBar = true;
        $(".progress").style.height = "10px";
        $(".progress").style.cursor = "pointer";
        const touchX = e.touches[0].clientX; // Vị trí ngón tay theo trục X
        const progressRect = progress.getBoundingClientRect(); // Kích thước và vị trí của thanh progress
        if (touchX >= progressRect.left && touchX <= progressRect.right) {
          // Ngón tay chạm vào thanh progress
          // Thực hiện xử lý ở đây, ví dụ: cập nhật audio.currentTime
          const percent = (touchX - progressRect.left) / progressRect.width;
          const seekTime = audio.duration * percent;
          audio.currentTime = seekTime;
          audio.play();
        }
      },
      { passive: false }
    );

    progress.addEventListener(
      "touchmove",
      (e) => {
        if (isTouchingProgressBar) {
          const touchX = e.touches[0].clientX; // Vị trí ngón tay theo trục X
          const progressRect = progress.getBoundingClientRect(); // Kích thước và vị trí của thanh progress

          if (touchX >= progressRect.left && touchX <= progressRect.right) {
            // Ngón tay di chuyển trong phạm vi của thanh progress
            const percent = (touchX - progressRect.left) / progressRect.width;
            const seekTime = audio.duration * percent;
            audio.currentTime = seekTime;
          } else {
            console.log("không chạm progress");
            // Người dùng chạm ngoài phạm vi thanh progress
            // Không cập nhật giá trị audio.currentTime
          }
        }
      },
      { passive: true }
    );

    progress.addEventListener(
      "touchend",
      (e) => {
        $(".progress").style.height = "";
        $(".progress").style.cursor = "";
        isTouchingProgressBar = false;
      },
      { passive: false }
    );

    // Trạng thái của isDraggingProgress khi nhấn chuột xuống
    progress.onmousedown = function () {
      _this.isDraggingProgress = false;
    };

    // Trạng thái của isDraggingProgress khi nhấn chuột lên
    progress.onmouseup = function () {
      _this.isDraggingProgress = true;
    };

    //Xy ly khi tua
    audio.ontimeupdate = function () {
      if (_this.isDraggingProgress && audio.duration) {
        const progressPercent = Math.trunc(
          (audio.currentTime / audio.duration) * 100
        );

        progress.value = progressPercent;

        var color =
          "linear-gradient(to right, rgb(0, 0, 204)" +
          progress.value +
          "% , rgb(214, 214, 214)" +
          progress.value +
          "%)";
        progress.style.background = color;

        _this.startTimer(audio.currentTime);
        _this.endTimer();

        // Lấy current progress && current index
        _this.setConfig("lastProgress", audio.currentTime);
        _this.setConfig("lastIndex", _this.currentIndex);
        _this.setConfig("lastVolume", audio.volume);
      }
    };
    // Khi tua bài hát
    progress.onclick = function () {
      audio.currentTime = Math.trunc((progress.value / 100) * audio.duration);
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
      var color =
        "linear-gradient(to right, rgb(0, 0, 204)" +
        progress.value +
        "% , rgb(214, 214, 214)" +
        progress.value +
        "%)";
      progress.style.background = color;
    };

    progress.oninput = function (e) {
      // const seekTime = (audio.duration / 100) * e.target.value;
      // progress.value = seekTime;
      var currentTime = (e.target.value / 100) * audio.duration;
      _this.setConfig("progressSong", currentTime);
      audioTimeLeft.innerHTML = _this.formatTime(currentTime);
      var color =
        "linear-gradient(to right, rgb(0, 0, 204)" +
        progress.value +
        "% , rgb(214, 214, 214)" +
        progress.value +
        "%)";
      progress.style.background = color;
    };

    // Khi next song
    nextBtn.addEventListener(
      "touchstart",
      () => {
        nextBtn.style.backgroundColor = "#d3d3d3";
        nextBtn.style.borderRadius = "50%";
      },
      { passive: true }
    );

    nextBtn.addEventListener(
      "touchend",
      () => {
        nextBtn.style.backgroundColor = "";
        nextBtn.style.borderRadius = "";
      },
      { passive: true }
    );

    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
    };

    // Khi prev song
    prevBtn.addEventListener(
      "touchstart",
      () => {
        prevBtn.style.backgroundColor = "#d3d3d3";
        prevBtn.style.borderRadius = "50%";
      },
      { passive: true }
    );

    prevBtn.addEventListener(
      "touchend",
      () => {
        prevBtn.style.backgroundColor = "";
        prevBtn.style.borderRadius = "";
      },
      { passive: true }
    );

    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
    };

    // Xử lý lặp lại một song
    repeatBtn.addEventListener(
      "touchstart",
      () => {
        repeatBtn.style.backgroundColor = "#d3d3d3";
        repeatBtn.style.borderRadius = "50%";
      },
      { passive: true }
    );

    repeatBtn.addEventListener(
      "touchend",
      () => {
        repeatBtn.style.backgroundColor = "";
        repeatBtn.style.borderRadius = "";
      },
      { passive: true }
    );

    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý bật/ tắt random song
    randomBtn.addEventListener(
      "touchstart",
      () => {
        randomBtn.style.backgroundColor = "#d3d3d3";
        randomBtn.style.borderRadius = "50%";
      },
      { passive: true }
    );

    randomBtn.addEventListener(
      "touchend",
      () => {
        randomBtn.style.backgroundColor = "";
        randomBtn.style.borderRadius = "";
      },
      { passive: true }
    );

    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    //Xử lý next song khi audio end
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".item:not(.active)");

      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.progressSong = 0;
          _this.loadCurrentSong();
          $(".item.active").classList.remove("active");
          songNode.classList.add("active");
          if (_this.isPlaying) audio.play();
        }
      }
    };

    //Xử lý khi click vào nút volume

    if (_this.currentVolume > 0) {
      volumeBar.value = _this.currentVolume;
      audio.volume = _this.currentVolume;
      var color =
        "linear-gradient(to right, rgb(0, 0, 204)" +
        audio.volume * 100 +
        "% , rgb(214, 214, 214)" +
        audio.volume * 100 +
        "%)";
      volumeBar.style.background = color;
      $(".icon-unmute").style.display = "block";
      $(".icon-mute").style.display = "none";
    } else {
      volumeBar.value = 0;
      audio.volume = 0;
      $(".icon-unmute").style.display = "none";
      $(".icon-mute").style.display = "block";
    }

    audio.onvolumechange = () => {
      volumeBar.value = audio.volume;
      var color =
        "linear-gradient(to right, rgb(0, 0, 204)" +
        audio.volume * 100 +
        "% , rgb(214, 214, 214)" +
        audio.volume * 100 +
        "%)";
      volumeBar.style.background = color;
      if (audio.volume === 0) {
        muteIcon.style.display = "block";
        unmuteIcon.style.display = "none";
      } else {
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "block";
      }
    };

    volumeBar.oninput = (e) => {
      this.setConfig("currentVolume", e.target.value);
      audio.volume = volumeBar.value;
      volumeBar.setAttribute(
        "title",
        "Âm lượng " + volumeBar.value * 100 + "%"
      );
      var color =
        "linear-gradient(to right, rgb(0, 0, 204)" +
        audio.volume * 100 +
        "% , rgb(214, 214, 214)" +
        audio.volume * 100 +
        "%)";
      volumeBar.style.background = color;
    };

    unmuteIcon.onclick = (e) => {
      this.setConfig("savedVolume", audio.volume);
      audio.volume = 0;
      this.setConfig("currentVolume", audio.volume);
    };

    muteIcon.onclick = (e) => {
      audio.volume = this.config.savedVolume;
      this.setConfig("currentVolume", audio.volume);
    };
  },

  formatTime: function (seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedTime = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return formattedTime;
  },

  //Tai bai hat dau tien khi chay ung dung
  loadCurrentSong: function () {
    this.setConfig("currentIndex", this.currentIndex);
    heading.textContent = this.currentSong.name;
    author.textContent = this.currentSong.singer;
    imgMedia.src = this.currentSong.image;
    imgMedia.alt = this.currentSong.name;
    audio.src = this.currentSong.path;
    audio.onloadedmetadata = () => {
      audioDuration.innerHTML = this.formatTime(audio.duration);
      audio.currentTime = this.progressSong;
    };
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    this.currentIndex = this.config.currentIndex;
    this.currentVolume = this.config.currentVolume;
    this.progressSong = this.config.progressSong;

    // Object.assign(this, this.config)
  },

  nextSong: function () {
    this.currentIndex++;
    this.progressSong = 0;
    this.isPlaying = true;
    player.classList.add("playing");
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
      this.setConfig("currentIndex", this.currentIndex);
    }
    $(".item.active").classList.remove("active");
    const songList = $$(".item");
    const song = songList[this.currentIndex];
    song.classList.add("active");
    this.loadCurrentSong();
    console.log("new song loaded");
  },

  prevSong: function () {
    this.currentIndex--;
    this.progressSong = 0;
    this.isPlaying = true;
    player.classList.add("playing");
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    $(".item.active").classList.remove("active");
    const songList = $$(".item");
    const song = songList[this.currentIndex];
    song.classList.add("active");
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.playedIndexes.includes(newIndex));

    this.playedIndexes.push(newIndex);
    console.log(this.playedIndexes);
    if (this.playedIndexes.length === this.songs.length) {
      this.playedIndexes = [];
    }
    this.currentIndex = newIndex;
    this.progressSong = 0;
    this.isPlaying = true;
    player.classList.add("playing");
    $(".item.active").classList.remove("active");
    const songList = $$(".item");
    const song = songList[this.currentIndex];
    song.classList.add("active");
    this.loadCurrentSong();
  },

  startTimer: function (e) {
    let startMinute = Math.floor(e / 60);
    let startSecond = Math.floor(e % 60);

    let displayStartMinute = startMinute < 10 ? "0" + startMinute : startMinute;
    let displayStartSecond = startSecond < 10 ? "0" + startSecond : startSecond;

    audioTimeLeft.textContent = displayStartMinute + " : " + displayStartSecond;
  },

  endTimer: function () {
    let endMinute = Math.floor(audio.duration / 60);
    let endSecond = Math.floor(audio.duration % 60);

    let displayEndMinute = endMinute < 10 ? "0" + endMinute : endMinute;
    let displayEndSecond = endSecond < 10 ? "0" + endSecond : endSecond;

    audioDuration.textContent = displayEndMinute + " : " + displayEndSecond;
  },

  start: function () {
    //Gán cấu hình vào ứng dụng
    this.loadConfig();

    this.definedProperties();

    this.handleEvents();

    this.loadCurrentSong();

    this.render();

    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
