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
          "linear-gradient(to right, rgb(255, 255, 255)" +
          progress.value +
          "% , rgb(90, 85, 96)" +
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
        "linear-gradient(to right, rgb(255, 255, 255)" +
        progress.value +
        "% , rgb(90, 85, 96)" +
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
        "linear-gradient(to right, rgb(255, 255, 255)" +
        progress.value +
        "% , rgb(90, 85, 96)" +
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
        "linear-gradient(to right, rgb(255, 255, 255)" +
        audio.volume * 100 +
        "% , rgb(90, 85, 96)" +
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
        "linear-gradient(to right, rgb(255, 255, 255)" +
        audio.volume * 100 +
        "% , rgb(90, 85, 96)" +
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
        "linear-gradient(to right, rgb(255, 255, 255)" +
        audio.volume * 100 +
        "% , rgb(90, 85, 96)" +
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

//Feature karaoke

var lyric = `
{
  "err": 0,
  "msg": "Success",
  "data": {
    "sentences": [
      {
        "words": [
          {
            "startTime": 20660,
            "endTime": 20920,
            "data": "Có"
          },
          {
            "startTime": 20920,
            "endTime": 21190,
            "data": "ai"
          },
          {
            "startTime": 21190,
            "endTime": 21720,
            "data": "đang"
          },
          {
            "startTime": 21720,
            "endTime": 21990,
            "data": "hẹn"
          },
          {
            "startTime": 21990,
            "endTime": 22520,
            "data": "hò"
          },
          {
            "startTime": 22520,
            "endTime": 22790,
            "data": "cùng"
          },
          {
            "startTime": 22790,
            "endTime": 23850,
            "data": "em"
          },
          {
            "startTime": 23850,
            "endTime": 25970,
            "data": "chưa"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 25970,
            "endTime": 26240,
            "data": "Rồi"
          },
          {
            "startTime": 26240,
            "endTime": 26770,
            "data": "ai"
          },
          {
            "startTime": 26770,
            "endTime": 27290,
            "data": "đón"
          },
          {
            "startTime": 27290,
            "endTime": 27820,
            "data": "ai"
          },
          {
            "startTime": 27820,
            "endTime": 29420,
            "data": "đưa"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 29420,
            "endTime": 29690,
            "data": "Liệu"
          },
          {
            "startTime": 29690,
            "endTime": 30220,
            "data": "anh"
          },
          {
            "startTime": 30220,
            "endTime": 30750,
            "data": "có"
          },
          {
            "startTime": 30750,
            "endTime": 31020,
            "data": "quan"
          },
          {
            "startTime": 31020,
            "endTime": 31550,
            "data": "tâm"
          },
          {
            "startTime": 31550,
            "endTime": 32090,
            "data": "dư"
          },
          {
            "startTime": 32090,
            "endTime": 33670,
            "data": "thừa"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 33670,
            "endTime": 34200,
            "data": "Còn"
          },
          {
            "startTime": 34200,
            "endTime": 34470,
            "data": "anh"
          },
          {
            "startTime": 34470,
            "endTime": 35000,
            "data": "thì"
          },
          {
            "startTime": 35000,
            "endTime": 35270,
            "data": "tệ"
          },
          {
            "startTime": 35270,
            "endTime": 35800,
            "data": "hơn"
          },
          {
            "startTime": 35800,
            "endTime": 36330,
            "data": "trước"
          },
          {
            "startTime": 36330,
            "endTime": 37140,
            "data": "kia"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 37140,
            "endTime": 37660,
            "data": "Sống"
          },
          {
            "startTime": 37660,
            "endTime": 37930,
            "data": "trong"
          },
          {
            "startTime": 37930,
            "endTime": 38180,
            "data": "hoài"
          },
          {
            "startTime": 38180,
            "endTime": 38720,
            "data": "niệm"
          },
          {
            "startTime": 38720,
            "endTime": 39260,
            "data": "sáng"
          },
          {
            "startTime": 39260,
            "endTime": 39780,
            "data": "đến"
          },
          {
            "startTime": 39780,
            "endTime": 40580,
            "data": "khuya"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 40580,
            "endTime": 41120,
            "data": "Vì"
          },
          {
            "startTime": 41120,
            "endTime": 41380,
            "data": "quá"
          },
          {
            "startTime": 41380,
            "endTime": 41650,
            "data": "yêu"
          },
          {
            "startTime": 41650,
            "endTime": 42170,
            "data": "một"
          },
          {
            "startTime": 42170,
            "endTime": 42970,
            "data": "người"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 42970,
            "endTime": 43240,
            "data": "Nên"
          },
          {
            "startTime": 43240,
            "endTime": 43770,
            "data": "chưa"
          },
          {
            "startTime": 43770,
            "endTime": 44830,
            "data": "quên"
          },
          {
            "startTime": 44830,
            "endTime": 47480,
            "data": "được"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 47480,
            "endTime": 47760,
            "data": "Người"
          },
          {
            "startTime": 47760,
            "endTime": 48280,
            "data": "vẫn"
          },
          {
            "startTime": 48280,
            "endTime": 48550,
            "data": "vương"
          },
          {
            "startTime": 48550,
            "endTime": 49080,
            "data": "sau"
          },
          {
            "startTime": 49080,
            "endTime": 49620,
            "data": "cuộc"
          },
          {
            "startTime": 49620,
            "endTime": 49880,
            "data": "tình"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 49880,
            "endTime": 50400,
            "data": "Thật"
          },
          {
            "startTime": 50400,
            "endTime": 51200,
            "data": "đáng"
          },
          {
            "startTime": 51200,
            "endTime": 53340,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 53340,
            "endTime": 53600,
            "data": "Ngồi"
          },
          {
            "startTime": 53600,
            "endTime": 54130,
            "data": "ôm"
          },
          {
            "startTime": 54130,
            "endTime": 54660,
            "data": "những"
          },
          {
            "startTime": 54660,
            "endTime": 55200,
            "data": "tấm"
          },
          {
            "startTime": 55200,
            "endTime": 56240,
            "data": "hình"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 56240,
            "endTime": 56520,
            "data": "Rồi"
          },
          {
            "startTime": 56520,
            "endTime": 57050,
            "data": "đôi"
          },
          {
            "startTime": 57050,
            "endTime": 57570,
            "data": "khi"
          },
          {
            "startTime": 57570,
            "endTime": 58120,
            "data": "để"
          },
          {
            "startTime": 58120,
            "endTime": 58920,
            "data": "nước"
          },
          {
            "startTime": 58920,
            "endTime": 59450,
            "data": "mắt"
          },
          {
            "startTime": 59450,
            "endTime": 60760,
            "data": "rơi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 60760,
            "endTime": 61030,
            "data": "Anh"
          },
          {
            "startTime": 61030,
            "endTime": 61560,
            "data": "gắng"
          },
          {
            "startTime": 61560,
            "endTime": 61840,
            "data": "chịu"
          },
          {
            "startTime": 61840,
            "endTime": 62360,
            "data": "được"
          },
          {
            "startTime": 62360,
            "endTime": 62890,
            "data": "thế"
          },
          {
            "startTime": 62890,
            "endTime": 64240,
            "data": "thôi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 64240,
            "endTime": 64480,
            "data": "Yếu"
          },
          {
            "startTime": 64480,
            "endTime": 65280,
            "data": "đuối"
          },
          {
            "startTime": 65280,
            "endTime": 65540,
            "data": "giữ"
          },
          {
            "startTime": 65540,
            "endTime": 66340,
            "data": "anh"
          },
          {
            "startTime": 66340,
            "endTime": 68210,
            "data": "rồi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 68210,
            "endTime": 68730,
            "data": "Dẫu"
          },
          {
            "startTime": 68730,
            "endTime": 69260,
            "data": "anh"
          },
          {
            "startTime": 69260,
            "endTime": 69530,
            "data": "trong"
          },
          {
            "startTime": 69530,
            "endTime": 70060,
            "data": "một"
          },
          {
            "startTime": 70060,
            "endTime": 70600,
            "data": "khoảng"
          },
          {
            "startTime": 70600,
            "endTime": 70860,
            "data": "trời"
          },
          {
            "startTime": 70860,
            "endTime": 71650,
            "data": "chơi"
          },
          {
            "startTime": 71650,
            "endTime": 73000,
            "data": "vơi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 73000,
            "endTime": 73520,
            "data": "Em"
          },
          {
            "startTime": 73520,
            "endTime": 73780,
            "data": "có"
          },
          {
            "startTime": 73780,
            "endTime": 74320,
            "data": "quay"
          },
          {
            "startTime": 74320,
            "endTime": 74840,
            "data": "về"
          },
          {
            "startTime": 74840,
            "endTime": 75370,
            "data": "được"
          },
          {
            "startTime": 75370,
            "endTime": 76430,
            "data": "không"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 76430,
            "endTime": 76980,
            "data": "Em"
          },
          {
            "startTime": 76980,
            "endTime": 77240,
            "data": "nói"
          },
          {
            "startTime": 77240,
            "endTime": 77760,
            "data": "anh"
          },
          {
            "startTime": 77760,
            "endTime": 78030,
            "data": "đừng"
          },
          {
            "startTime": 78030,
            "endTime": 78560,
            "data": "hy"
          },
          {
            "startTime": 78560,
            "endTime": 79900,
            "data": "vọng"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 79900,
            "endTime": 80160,
            "data": "Yêu"
          },
          {
            "startTime": 80160,
            "endTime": 80690,
            "data": "đối"
          },
          {
            "startTime": 80690,
            "endTime": 81210,
            "data": "với"
          },
          {
            "startTime": 81210,
            "endTime": 81500,
            "data": "em"
          },
          {
            "startTime": 81500,
            "endTime": 82010,
            "data": "bây"
          },
          {
            "startTime": 82010,
            "endTime": 83340,
            "data": "giờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 83340,
            "endTime": 83610,
            "data": "Chỉ"
          },
          {
            "startTime": 83610,
            "endTime": 84140,
            "data": "như"
          },
          {
            "startTime": 84140,
            "endTime": 84680,
            "data": "một"
          },
          {
            "startTime": 84680,
            "endTime": 85210,
            "data": "chiều"
          },
          {
            "startTime": 85210,
            "endTime": 85480,
            "data": "gió"
          },
          {
            "startTime": 85480,
            "endTime": 87600,
            "data": "đông"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 87600,
            "endTime": 88120,
            "data": "Câu"
          },
          {
            "startTime": 88120,
            "endTime": 88400,
            "data": "nói"
          },
          {
            "startTime": 88400,
            "endTime": 89450,
            "data": "ấy"
          },
          {
            "startTime": 89450,
            "endTime": 89720,
            "data": "thật"
          },
          {
            "startTime": 89720,
            "endTime": 90260,
            "data": "nhẫn"
          },
          {
            "startTime": 90260,
            "endTime": 91050,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 91050,
            "endTime": 91580,
            "data": "Ngày"
          },
          {
            "startTime": 91580,
            "endTime": 92110,
            "data": "tháng"
          },
          {
            "startTime": 92110,
            "endTime": 92640,
            "data": "ấy"
          },
          {
            "startTime": 92640,
            "endTime": 93180,
            "data": "là"
          },
          {
            "startTime": 93180,
            "endTime": 93980,
            "data": "sai"
          },
          {
            "startTime": 93980,
            "endTime": 95290,
            "data": "lầm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 95290,
            "endTime": 95820,
            "data": "Cứ"
          },
          {
            "startTime": 95820,
            "endTime": 96090,
            "data": "cho"
          },
          {
            "startTime": 96090,
            "endTime": 96630,
            "data": "là"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 96630,
            "endTime": 96890,
            "data": "Anh"
          },
          {
            "startTime": 96890,
            "endTime": 97420,
            "data": "đang"
          },
          {
            "startTime": 97420,
            "endTime": 97950,
            "data": "trách"
          },
          {
            "startTime": 97950,
            "endTime": 98220,
            "data": "em"
          },
          {
            "startTime": 98220,
            "endTime": 98760,
            "data": "đừng"
          },
          {
            "startTime": 98760,
            "endTime": 99550,
            "data": "để"
          },
          {
            "startTime": 99550,
            "endTime": 100340,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 100340,
            "endTime": 100880,
            "data": "Ai"
          },
          {
            "startTime": 100880,
            "endTime": 101140,
            "data": "cũng"
          },
          {
            "startTime": 101140,
            "endTime": 101670,
            "data": "nói"
          },
          {
            "startTime": 101670,
            "endTime": 102210,
            "data": "rằng"
          },
          {
            "startTime": 102210,
            "endTime": 102740,
            "data": "thời"
          },
          {
            "startTime": 102740,
            "endTime": 103800,
            "data": "gian"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 103800,
            "endTime": 104330,
            "data": "Sẽ"
          },
          {
            "startTime": 104330,
            "endTime": 104590,
            "data": "xóa"
          },
          {
            "startTime": 104590,
            "endTime": 105130,
            "data": "đi"
          },
          {
            "startTime": 105130,
            "endTime": 105660,
            "data": "những"
          },
          {
            "startTime": 105660,
            "endTime": 106180,
            "data": "vết"
          },
          {
            "startTime": 106180,
            "endTime": 107260,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 107260,
            "endTime": 107780,
            "data": "Nhưng"
          },
          {
            "startTime": 107780,
            "endTime": 108050,
            "data": "có"
          },
          {
            "startTime": 108050,
            "endTime": 108570,
            "data": "ai"
          },
          {
            "startTime": 108570,
            "endTime": 108840,
            "data": "chứng"
          },
          {
            "startTime": 108840,
            "endTime": 109370,
            "data": "minh"
          },
          {
            "startTime": 109370,
            "endTime": 110700,
            "data": "được"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 110700,
            "endTime": 111250,
            "data": "Cả"
          },
          {
            "startTime": 111250,
            "endTime": 111510,
            "data": "đời"
          },
          {
            "startTime": 111510,
            "endTime": 112050,
            "data": "này"
          },
          {
            "startTime": 112050,
            "endTime": 112560,
            "data": "không"
          },
          {
            "startTime": 112560,
            "endTime": 113360,
            "data": "vấn"
          },
          {
            "startTime": 113360,
            "endTime": 115220,
            "data": "vương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 115220,
            "endTime": 115490,
            "data": "Hạnh"
          },
          {
            "startTime": 115490,
            "endTime": 116020,
            "data": "phúc"
          },
          {
            "startTime": 116020,
            "endTime": 116550,
            "data": "nhé"
          },
          {
            "startTime": 116550,
            "endTime": 117070,
            "data": "anh"
          },
          {
            "startTime": 117070,
            "endTime": 117340,
            "data": "lại"
          },
          {
            "startTime": 117340,
            "endTime": 118400,
            "data": "thế"
          },
          {
            "startTime": 118400,
            "endTime": 119210,
            "data": "rồi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 119210,
            "endTime": 119470,
            "data": "Nắng"
          },
          {
            "startTime": 119470,
            "endTime": 119740,
            "data": "sẽ"
          },
          {
            "startTime": 119740,
            "endTime": 120260,
            "data": "về"
          },
          {
            "startTime": 120260,
            "endTime": 120540,
            "data": "chiều"
          },
          {
            "startTime": 120540,
            "endTime": 121060,
            "data": "đông"
          },
          {
            "startTime": 121060,
            "endTime": 121590,
            "data": "lại"
          },
          {
            "startTime": 121590,
            "endTime": 122130,
            "data": "ấm"
          },
          {
            "startTime": 122130,
            "endTime": 123720,
            "data": "thôi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 123720,
            "endTime": 123990,
            "data": "Cho"
          },
          {
            "startTime": 123990,
            "endTime": 124530,
            "data": "dẫu"
          },
          {
            "startTime": 124530,
            "endTime": 124780,
            "data": "bây"
          },
          {
            "startTime": 124780,
            "endTime": 125320,
            "data": "giờ"
          },
          {
            "startTime": 125320,
            "endTime": 125850,
            "data": "và"
          },
          {
            "startTime": 125850,
            "endTime": 126650,
            "data": "quá"
          },
          {
            "startTime": 126650,
            "endTime": 128240,
            "data": "khứ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 128240,
            "endTime": 128760,
            "data": "Anh"
          },
          {
            "startTime": 128760,
            "endTime": 129310,
            "data": "vẫn"
          },
          {
            "startTime": 129310,
            "endTime": 130090,
            "data": "nhớ"
          },
          {
            "startTime": 130090,
            "endTime": 133090,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 138330,
            "endTime": 138600,
            "data": "Người"
          },
          {
            "startTime": 138600,
            "endTime": 139130,
            "data": "vấn"
          },
          {
            "startTime": 139130,
            "endTime": 139390,
            "data": "vương"
          },
          {
            "startTime": 139390,
            "endTime": 139930,
            "data": "sau"
          },
          {
            "startTime": 139930,
            "endTime": 140450,
            "data": "cuộc"
          },
          {
            "startTime": 140450,
            "endTime": 140730,
            "data": "tình"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 140730,
            "endTime": 141240,
            "data": "Thật"
          },
          {
            "startTime": 141240,
            "endTime": 142050,
            "data": "đáng"
          },
          {
            "startTime": 142050,
            "endTime": 144170,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 144170,
            "endTime": 144710,
            "data": "Ngồi"
          },
          {
            "startTime": 144710,
            "endTime": 144970,
            "data": "ôm"
          },
          {
            "startTime": 144970,
            "endTime": 145510,
            "data": "những"
          },
          {
            "startTime": 145510,
            "endTime": 146030,
            "data": "tấm"
          },
          {
            "startTime": 146030,
            "endTime": 147100,
            "data": "hình"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 147100,
            "endTime": 147630,
            "data": "Rồi"
          },
          {
            "startTime": 147630,
            "endTime": 147900,
            "data": "đôi"
          },
          {
            "startTime": 147900,
            "endTime": 148420,
            "data": "khi"
          },
          {
            "startTime": 148420,
            "endTime": 148690,
            "data": "để"
          },
          {
            "startTime": 148690,
            "endTime": 149490,
            "data": "nước"
          },
          {
            "startTime": 149490,
            "endTime": 150290,
            "data": "mắt"
          },
          {
            "startTime": 150290,
            "endTime": 151350,
            "data": "rơi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 151350,
            "endTime": 151610,
            "data": "Anh"
          },
          {
            "startTime": 151610,
            "endTime": 152150,
            "data": "gắng"
          },
          {
            "startTime": 152150,
            "endTime": 152670,
            "data": "chịu"
          },
          {
            "startTime": 152670,
            "endTime": 152930,
            "data": "được"
          },
          {
            "startTime": 152930,
            "endTime": 153730,
            "data": "thế"
          },
          {
            "startTime": 153730,
            "endTime": 155070,
            "data": "thôi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 155070,
            "endTime": 155330,
            "data": "Yếu"
          },
          {
            "startTime": 155330,
            "endTime": 156130,
            "data": "đuối"
          },
          {
            "startTime": 156130,
            "endTime": 156670,
            "data": "giữ"
          },
          {
            "startTime": 156670,
            "endTime": 157190,
            "data": "anh"
          },
          {
            "startTime": 157190,
            "endTime": 159050,
            "data": "rồi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 159050,
            "endTime": 159580,
            "data": "Dẫu"
          },
          {
            "startTime": 159580,
            "endTime": 159840,
            "data": "anh"
          },
          {
            "startTime": 159840,
            "endTime": 160390,
            "data": "trong"
          },
          {
            "startTime": 160390,
            "endTime": 160650,
            "data": "một"
          },
          {
            "startTime": 160650,
            "endTime": 161180,
            "data": "khoảng"
          },
          {
            "startTime": 161180,
            "endTime": 161700,
            "data": "trời"
          },
          {
            "startTime": 161700,
            "endTime": 162500,
            "data": "chơi"
          },
          {
            "startTime": 162500,
            "endTime": 163570,
            "data": "vơi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 163570,
            "endTime": 164090,
            "data": "Em"
          },
          {
            "startTime": 164090,
            "endTime": 164620,
            "data": "có"
          },
          {
            "startTime": 164620,
            "endTime": 164890,
            "data": "quay"
          },
          {
            "startTime": 164890,
            "endTime": 165430,
            "data": "về"
          },
          {
            "startTime": 165430,
            "endTime": 165950,
            "data": "được"
          },
          {
            "startTime": 165950,
            "endTime": 167290,
            "data": "không"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 167290,
            "endTime": 167550,
            "data": "Em"
          },
          {
            "startTime": 167550,
            "endTime": 168080,
            "data": "nói"
          },
          {
            "startTime": 168080,
            "endTime": 168610,
            "data": "anh"
          },
          {
            "startTime": 168610,
            "endTime": 168880,
            "data": "đừng"
          },
          {
            "startTime": 168880,
            "endTime": 169420,
            "data": "hy"
          },
          {
            "startTime": 169420,
            "endTime": 170730,
            "data": "vọng"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 170730,
            "endTime": 171000,
            "data": "Yêu"
          },
          {
            "startTime": 171000,
            "endTime": 171530,
            "data": "đối"
          },
          {
            "startTime": 171530,
            "endTime": 172060,
            "data": "với"
          },
          {
            "startTime": 172060,
            "endTime": 172330,
            "data": "em"
          },
          {
            "startTime": 172330,
            "endTime": 172870,
            "data": "bây"
          },
          {
            "startTime": 172870,
            "endTime": 174180,
            "data": "giờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 174180,
            "endTime": 174720,
            "data": "Chỉ"
          },
          {
            "startTime": 174720,
            "endTime": 174980,
            "data": "như"
          },
          {
            "startTime": 174980,
            "endTime": 175520,
            "data": "một"
          },
          {
            "startTime": 175520,
            "endTime": 175780,
            "data": "chiều"
          },
          {
            "startTime": 175780,
            "endTime": 176580,
            "data": "gió"
          },
          {
            "startTime": 176580,
            "endTime": 178440,
            "data": "đông"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 178440,
            "endTime": 178970,
            "data": "Câu"
          },
          {
            "startTime": 178970,
            "endTime": 179230,
            "data": "nói"
          },
          {
            "startTime": 179230,
            "endTime": 180300,
            "data": "ấy"
          },
          {
            "startTime": 180300,
            "endTime": 180570,
            "data": "thật"
          },
          {
            "startTime": 180570,
            "endTime": 181100,
            "data": "nhẫn"
          },
          {
            "startTime": 181100,
            "endTime": 181890,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 181890,
            "endTime": 182160,
            "data": "Ngày"
          },
          {
            "startTime": 182160,
            "endTime": 182680,
            "data": "tháng"
          },
          {
            "startTime": 182680,
            "endTime": 183480,
            "data": "ấy"
          },
          {
            "startTime": 183480,
            "endTime": 184020,
            "data": "là"
          },
          {
            "startTime": 184020,
            "endTime": 184550,
            "data": "sai"
          },
          {
            "startTime": 184550,
            "endTime": 186150,
            "data": "lầm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 186150,
            "endTime": 186420,
            "data": "Cứ"
          },
          {
            "startTime": 186420,
            "endTime": 186960,
            "data": "cho"
          },
          {
            "startTime": 186960,
            "endTime": 187220,
            "data": "là"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 187220,
            "endTime": 187750,
            "data": "Anh"
          },
          {
            "startTime": 187750,
            "endTime": 188280,
            "data": "đang"
          },
          {
            "startTime": 188280,
            "endTime": 188820,
            "data": "trách"
          },
          {
            "startTime": 188820,
            "endTime": 189080,
            "data": "em"
          },
          {
            "startTime": 189080,
            "endTime": 189610,
            "data": "đừng"
          },
          {
            "startTime": 189610,
            "endTime": 190140,
            "data": "để"
          },
          {
            "startTime": 190140,
            "endTime": 191210,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 191210,
            "endTime": 191740,
            "data": "Ai"
          },
          {
            "startTime": 191740,
            "endTime": 192260,
            "data": "cũng"
          },
          {
            "startTime": 192260,
            "endTime": 192530,
            "data": "nói"
          },
          {
            "startTime": 192530,
            "endTime": 193060,
            "data": "rằng"
          },
          {
            "startTime": 193060,
            "endTime": 193600,
            "data": "thời"
          },
          {
            "startTime": 193600,
            "endTime": 194650,
            "data": "gian"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 194650,
            "endTime": 195180,
            "data": "Sẽ"
          },
          {
            "startTime": 195180,
            "endTime": 195460,
            "data": "xóa"
          },
          {
            "startTime": 195460,
            "endTime": 195980,
            "data": "đi"
          },
          {
            "startTime": 195980,
            "endTime": 196240,
            "data": "những"
          },
          {
            "startTime": 196240,
            "endTime": 196780,
            "data": "vết"
          },
          {
            "startTime": 196780,
            "endTime": 198110,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 198110,
            "endTime": 198650,
            "data": "Nhưng"
          },
          {
            "startTime": 198650,
            "endTime": 198910,
            "data": "có"
          },
          {
            "startTime": 198910,
            "endTime": 199440,
            "data": "ai"
          },
          {
            "startTime": 199440,
            "endTime": 199980,
            "data": "chứng"
          },
          {
            "startTime": 199980,
            "endTime": 200240,
            "data": "minh"
          },
          {
            "startTime": 200240,
            "endTime": 201030,
            "data": "được"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 201030,
            "endTime": 201830,
            "data": "Cả"
          },
          {
            "startTime": 201830,
            "endTime": 202360,
            "data": "đời"
          },
          {
            "startTime": 202360,
            "endTime": 202900,
            "data": "này"
          },
          {
            "startTime": 202900,
            "endTime": 203430,
            "data": "không"
          },
          {
            "startTime": 203430,
            "endTime": 204220,
            "data": "vấn"
          },
          {
            "startTime": 204220,
            "endTime": 206080,
            "data": "vương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 206080,
            "endTime": 206340,
            "data": "Hạnh"
          },
          {
            "startTime": 206340,
            "endTime": 206880,
            "data": "phúc"
          },
          {
            "startTime": 206880,
            "endTime": 207670,
            "data": "nhé"
          },
          {
            "startTime": 207670,
            "endTime": 207930,
            "data": "anh"
          },
          {
            "startTime": 207930,
            "endTime": 208470,
            "data": "lại"
          },
          {
            "startTime": 208470,
            "endTime": 209260,
            "data": "thế"
          },
          {
            "startTime": 209260,
            "endTime": 210060,
            "data": "rồi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 210060,
            "endTime": 210330,
            "data": "Nắng"
          },
          {
            "startTime": 210330,
            "endTime": 210600,
            "data": "sẽ"
          },
          {
            "startTime": 210600,
            "endTime": 211130,
            "data": "về"
          },
          {
            "startTime": 211130,
            "endTime": 211400,
            "data": "chiều"
          },
          {
            "startTime": 211400,
            "endTime": 211930,
            "data": "đông"
          },
          {
            "startTime": 211930,
            "endTime": 212190,
            "data": "lại"
          },
          {
            "startTime": 212190,
            "endTime": 213250,
            "data": "ấm"
          },
          {
            "startTime": 213250,
            "endTime": 214580,
            "data": "thôi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 214580,
            "endTime": 214840,
            "data": "Cho"
          },
          {
            "startTime": 214840,
            "endTime": 215380,
            "data": "dẫu"
          },
          {
            "startTime": 215380,
            "endTime": 215640,
            "data": "bây"
          },
          {
            "startTime": 215640,
            "endTime": 216180,
            "data": "giờ"
          },
          {
            "startTime": 216180,
            "endTime": 216710,
            "data": "và"
          },
          {
            "startTime": 216710,
            "endTime": 217230,
            "data": "quá"
          },
          {
            "startTime": 217230,
            "endTime": 219290,
            "data": "khứ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 219290,
            "endTime": 219820,
            "data": "Anh"
          },
          {
            "startTime": 219820,
            "endTime": 220360,
            "data": "vẫn"
          },
          {
            "startTime": 220360,
            "endTime": 220880,
            "data": "nhớ"
          },
          {
            "startTime": 220880,
            "endTime": 223880,
            "data": "em"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 226140,
            "endTime": 226400,
            "data": "Em"
          },
          {
            "startTime": 226400,
            "endTime": 226660,
            "data": "có"
          },
          {
            "startTime": 226660,
            "endTime": 226930,
            "data": "quay"
          },
          {
            "startTime": 226930,
            "endTime": 227460,
            "data": "về"
          },
          {
            "startTime": 227460,
            "endTime": 228000,
            "data": "được"
          },
          {
            "startTime": 228000,
            "endTime": 229060,
            "data": "không"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 229060,
            "endTime": 229590,
            "data": "Em"
          },
          {
            "startTime": 229590,
            "endTime": 229850,
            "data": "nói"
          },
          {
            "startTime": 229850,
            "endTime": 230390,
            "data": "anh"
          },
          {
            "startTime": 230390,
            "endTime": 230640,
            "data": "đừng"
          },
          {
            "startTime": 230640,
            "endTime": 231440,
            "data": "hy"
          },
          {
            "startTime": 231440,
            "endTime": 232510,
            "data": "vọng"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 232510,
            "endTime": 232780,
            "data": "Yêu"
          },
          {
            "startTime": 232780,
            "endTime": 233320,
            "data": "đối"
          },
          {
            "startTime": 233320,
            "endTime": 233580,
            "data": "với"
          },
          {
            "startTime": 233580,
            "endTime": 234110,
            "data": "em"
          },
          {
            "startTime": 234110,
            "endTime": 234630,
            "data": "bây"
          },
          {
            "startTime": 234630,
            "endTime": 235960,
            "data": "giờ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 235960,
            "endTime": 236220,
            "data": "Chỉ"
          },
          {
            "startTime": 236220,
            "endTime": 236760,
            "data": "như"
          },
          {
            "startTime": 236760,
            "endTime": 237020,
            "data": "một"
          },
          {
            "startTime": 237020,
            "endTime": 237550,
            "data": "chiều"
          },
          {
            "startTime": 237550,
            "endTime": 238350,
            "data": "gió"
          },
          {
            "startTime": 238350,
            "endTime": 240220,
            "data": "đông"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 240220,
            "endTime": 240480,
            "data": "Câu"
          },
          {
            "startTime": 240480,
            "endTime": 241010,
            "data": "nói"
          },
          {
            "startTime": 241010,
            "endTime": 241820,
            "data": "ấy"
          },
          {
            "startTime": 241820,
            "endTime": 242340,
            "data": "thật"
          },
          {
            "startTime": 242340,
            "endTime": 242870,
            "data": "nhẫn"
          },
          {
            "startTime": 242870,
            "endTime": 243620,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 243620,
            "endTime": 243890,
            "data": "Ngày"
          },
          {
            "startTime": 243890,
            "endTime": 244420,
            "data": "tháng"
          },
          {
            "startTime": 244420,
            "endTime": 245210,
            "data": "ấy"
          },
          {
            "startTime": 245210,
            "endTime": 245750,
            "data": "là"
          },
          {
            "startTime": 245750,
            "endTime": 246270,
            "data": "sai"
          },
          {
            "startTime": 246270,
            "endTime": 248140,
            "data": "lầm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 248140,
            "endTime": 248400,
            "data": "Cứ"
          },
          {
            "startTime": 248400,
            "endTime": 248670,
            "data": "cho"
          },
          {
            "startTime": 248670,
            "endTime": 249210,
            "data": "anh"
          },
          {
            "startTime": 249210,
            "endTime": 249740,
            "data": "là"
          },
          {
            "startTime": 249740,
            "endTime": 249990,
            "data": "đáng"
          },
          {
            "startTime": 249990,
            "endTime": 250530,
            "data": "trách"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 250530,
            "endTime": 250790,
            "data": "Em"
          },
          {
            "startTime": 250790,
            "endTime": 251330,
            "data": "đừng"
          },
          {
            "startTime": 251330,
            "endTime": 252130,
            "data": "để"
          },
          {
            "startTime": 252130,
            "endTime": 253180,
            "data": "tâm"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 253180,
            "endTime": 253460,
            "data": "Ai"
          },
          {
            "startTime": 253460,
            "endTime": 253980,
            "data": "cũng"
          },
          {
            "startTime": 253980,
            "endTime": 254250,
            "data": "nói"
          },
          {
            "startTime": 254250,
            "endTime": 254510,
            "data": "rằng"
          },
          {
            "startTime": 254510,
            "endTime": 255050,
            "data": "thời"
          },
          {
            "startTime": 255050,
            "endTime": 256650,
            "data": "gian"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 256650,
            "endTime": 256910,
            "data": "Sẽ"
          },
          {
            "startTime": 256910,
            "endTime": 257170,
            "data": "xóa"
          },
          {
            "startTime": 257170,
            "endTime": 257440,
            "data": "đi"
          },
          {
            "startTime": 257440,
            "endTime": 257970,
            "data": "những"
          },
          {
            "startTime": 257970,
            "endTime": 259030,
            "data": "vết"
          },
          {
            "startTime": 259030,
            "endTime": 259830,
            "data": "thương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 259830,
            "endTime": 260090,
            "data": "Nhưng"
          },
          {
            "startTime": 260090,
            "endTime": 260630,
            "data": "có"
          },
          {
            "startTime": 260630,
            "endTime": 261160,
            "data": "ai"
          },
          {
            "startTime": 261160,
            "endTime": 261430,
            "data": "chứng"
          },
          {
            "startTime": 261430,
            "endTime": 261950,
            "data": "minh"
          },
          {
            "startTime": 261950,
            "endTime": 263270,
            "data": "được"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 263270,
            "endTime": 263810,
            "data": "Cả"
          },
          {
            "startTime": 263810,
            "endTime": 264070,
            "data": "đời"
          },
          {
            "startTime": 264070,
            "endTime": 264610,
            "data": "này"
          },
          {
            "startTime": 264610,
            "endTime": 265140,
            "data": "không"
          },
          {
            "startTime": 265140,
            "endTime": 265670,
            "data": "vấn"
          },
          {
            "startTime": 265670,
            "endTime": 267790,
            "data": "vương"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 267790,
            "endTime": 268050,
            "data": "Hạnh"
          },
          {
            "startTime": 268050,
            "endTime": 268330,
            "data": "phúc"
          },
          {
            "startTime": 268330,
            "endTime": 269130,
            "data": "nhé"
          },
          {
            "startTime": 269130,
            "endTime": 269650,
            "data": "anh"
          },
          {
            "startTime": 269650,
            "endTime": 270190,
            "data": "lại"
          },
          {
            "startTime": 270190,
            "endTime": 270980,
            "data": "thế"
          },
          {
            "startTime": 270980,
            "endTime": 271770,
            "data": "rồi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 271770,
            "endTime": 272040,
            "data": "Nắng"
          },
          {
            "startTime": 272040,
            "endTime": 272310,
            "data": "sẽ"
          },
          {
            "startTime": 272310,
            "endTime": 272830,
            "data": "về"
          },
          {
            "startTime": 272830,
            "endTime": 273110,
            "data": "chiều"
          },
          {
            "startTime": 273110,
            "endTime": 273640,
            "data": "đông"
          },
          {
            "startTime": 273640,
            "endTime": 273910,
            "data": "lại"
          },
          {
            "startTime": 273910,
            "endTime": 274970,
            "data": "ấm"
          },
          {
            "startTime": 274970,
            "endTime": 277970,
            "data": "thôi"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 278160,
            "endTime": 278430,
            "data": "Cho"
          },
          {
            "startTime": 278430,
            "endTime": 278950,
            "data": "dẫu"
          },
          {
            "startTime": 278950,
            "endTime": 279220,
            "data": "bây"
          },
          {
            "startTime": 279220,
            "endTime": 279740,
            "data": "giờ"
          },
          {
            "startTime": 279740,
            "endTime": 280280,
            "data": "và"
          },
          {
            "startTime": 280280,
            "endTime": 281070,
            "data": "quá"
          },
          {
            "startTime": 281070,
            "endTime": 283200,
            "data": "khứ"
          }
        ]
      },
      {
        "words": [
          {
            "startTime": 283200,
            "endTime": 283460,
            "data": "Anh"
          },
          {
            "startTime": 283460,
            "endTime": 284260,
            "data": "vẫn"
          },
          {
            "startTime": 284260,
            "endTime": 285860,
            "data": "nhớ"
          },
          {
            "startTime": 285860,
            "endTime": 286860,
            "data": "em"
          }
        ]
      }
    ],
    "file": "https://static-zmp3.zmdcdn.me/lyrics/7/d/5/a/7d5aba62f9bd4324c7e614fc6ca665e4.lrc",
    "enabledVideoBG": true,
    "streamingUrl": "https://mcloud-bf-s7-mv-zmp3.zmdcdn.me/hKIxD7CKmso/e82c03954ab4a5eafca5/92d782f310e5ffbba6f4/1080/Co-Ai-Hen-Ho-Cung-Em-Chua.mp4?authen=exp=1694528961~acl=/hKIxD7CKmso/*~hmac=6b59603d4d1bc0e01c8f4f1d50e8c16e",
    "defaultIBGUrls": [
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/1/5/2/f152e583961e734282df164c80d5cd75.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/3/2/3/d323a5875be597fd650cfa686dff6c0c.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/4/c/3/4/4c341991bd4e1343e259c5f00d78758e.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/8/0/e/d80ec4b39a3ed7354a3b144c6d3ada6e.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/f/a/1/8fa11abfef011e8cb7c42ec22c3f2526.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/7/9/1/4/79140e5cfa71c4aab6b5e75d571e5264.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/1/f/3/b1f32f54524631ed7d7c5bc88a3c8136.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/9/e/f/e9efd148ae84847c469bbc166f925125.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/3/6/2/63623b11f70d3357adbc7129bb55ce3a.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/9/9/b/d99b84e9e63b68dba3d33de0be957828.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/e/a/8/cea830ade7ef1884410135bfed729da8.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/7/b/c/d/7bcd096c84654ca2a12c9650cdb51af6.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/9/e/3/09e35e011efdfda05ac01a4cc2925087.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/6/1/d/b61d967e9d5a8b01627340f2f7fe4f0a.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/0/c/1/80c1b6c1ae8c23b67026b6616fd46956.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/e/e/5/8ee5f3f3b9b64d72c744035fe4a63955.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/3/b/3/c3b3d3006142e447d74634f5e0f1501f.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/a/c/1/dac1ca0ac52689a0968123e23847e5d7.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/a/5/a/0a5a6d8d870af192ff6fca1efaf3069e.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/8/0/f/680f1631368a3b9dfc2eeadd8426721e.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/7/7/2/1772a2b9a82f762d9604ed0d5e9596b2.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/7/3/2/e7323f08d593a73e8fa77a396e6f8acf.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/9/0/a/7/90a78343340da0ea5fe7033433237166.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/5/5/0/c550bba8009aa32392f9e0249a7321e8.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/a/e/3/5/ae35663ef8268162c99a8bed6bd38e52.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/e/8/2/ee82708ba31a0686407457504148d455.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/2/3/c/f/23cfb8b53236540d0fed2bf7a90837d5.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/2/b/e/1/2be1f1baee13e7957fb4d24bdeebe253.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/7/1/0/b710f83917a327e6db47808d8c058ae0.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/b/f/b/ebfb6584ed892229532ad623a13a26f0.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/8/c/d/38cda0920c9f59c7939a9067aee63757.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/7/5/6/f75687d0912f3cc053458d7ebbe981df.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/7/8/9/9/789995f8e9be543d9a98f2f9c651c44d.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/5/a/7/35a788571cc857a6f1101b71f0603823.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/2/8/b/8/28b86539c038d331c9489716e74ea8ea.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/f/b/c/bfbc9c2968e29934d76ece97afe23fe7.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/4/a/e/e/4aeecf27885bdcbfadaa52c02d304db6.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/b/7/6/fb76e2eb0cd38fb765fc3ca356960468.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/c/a/3/6ca3b8332c780b4f7cce27ba514a246a.jpg",
      "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/2/4/d/c24daa06910382d1a782908561dded3d.jpg"
    ],
    "BGMode": 0
  },
  "timestamp": 1694358032652
}
`;

lyric = JSON.parse(lyric).data.sentences;
console.log(lyric);

var karaokeBtn = document.querySelector(".karaoke");
var arrowDown = document.querySelector(".arrow-down");
var activeKaraoke = document.querySelector(".active-karaoke");
var centerControl = document.querySelector(".center-control");
var textKaraoke = document.querySelector(".active-karaoke .text");
var textKaraoke2 = document.querySelector(".active-karaoke .text-2");
var karaokeWrap = document.querySelector(".active-karaoke");
var wordsArr;

karaokeBtn.addEventListener("click", function () {
  karaokeWrap.classList.add("active");

  setTimeout(function () {
    centerControl.style.zIndex = 6;
  }, 800);
});

arrowDown.addEventListener("click", function () {
  karaokeWrap.classList.remove("active");
  centerControl.style.zIndex = 0;
});

var arrStartTime = [];
var arrEndTime = [];
var arrSetence = [];
var arrCurrentTime = [];
var arrWords = [];
var listTimeWordThird = [];

lyric.map(function (item) {
  wordsArr = item.words;
  arrWords.push(wordsArr);

  // wordsArr.map(function (word) {
  //   durationWord = (word.endTime - word.startTime) / 1000;
  //   console.log(durationWord);
  // });

  startTimeWord = wordsArr[0].startTime;
  endTimeWord = wordsArr[wordsArr.length - 1].endTime;

  arrEndTime.push(endTimeWord);
  arrStartTime.push(startTimeWord);

  //Thoi gian cua 1 cau
  durationWord = endTimeWord - startTimeWord;

  wordSplit = wordsArr.map(function (word) {
    durationWord = (word.endTime - word.startTime) / 1000;
    return `<span class=""><span>${word.data}</span></span>`;
  });
  oneSetence = wordSplit.join(" ");
  arrSetence.push(oneSetence);
});
// console.log(arrStartTime);

audio.addEventListener("timeupdate", function () {
  var currentTime = (audio.currentTime * 1000).toFixed(0);

  arrCurrentTime.push(currentTime);

  arrWords.map(function (word) {
    wordTimeThird = word[word.length - 3].startTime;
    listTimeWordThird.push(wordTimeThird);
    word.map(function (char) {
      // console.log(char);
    });
  });

  for (let i = 0; i < arrSetence.length; i++) {
    // console.log(
    //   `arrStartTime: ${arrStartTime[i]} - arrSetence: ${arrSetence[i]}`
    // );
    if (currentTime >= arrStartTime[i] && currentTime < arrStartTime[i + 1]) {
      if (i % 2 === 0) {
        textKaraoke.innerHTML = arrSetence[i];
        textKaraoke.classList.add("opacity");
        textKaraoke2.classList.remove("opacity");
        if (currentTime >= listTimeWordThird[i]) {
          textKaraoke2.innerHTML = arrSetence[i + 1];
        }
      } else {
        textKaraoke2.innerHTML = arrSetence[i];
        textKaraoke2.classList.add("opacity");
        textKaraoke.classList.remove("opacity");
        if (currentTime >= listTimeWordThird[i]) {
          textKaraoke.innerHTML = arrSetence[i + 1];
        }
      }
    } else if (currentTime < arrStartTime[0]) {
      textKaraoke.innerHTML = `
      <div>Tên bài hát: Có Ai Đang Hẹn Hò Cùng Em Chưa</div>
      <div>Ca Sỹ: Quân A.P</div>
      `;
      textKaraoke2.innerHTML = "";
    } else if (currentTime > 133090 && currentTime < 138330) {
      textKaraoke.innerHTML = `
      <div>Tên bài hát: Có Ai Đang Hẹn Hò Cùng Em Chưa</div>
      <div>Ca Sỹ: Quân A.P</div>
      `;
      textKaraoke2.innerHTML = "";
    } else if (currentTime > 223880 && currentTime < 26140) {
      textKaraoke.innerHTML = `
      <div>Tên bài hát: Có Ai Đang Hẹn Hò Cùng Em Chưa</div>
      <div>Ca Sỹ: Quân A.P</div>
      `;
      textKaraoke2.innerHTML = "";
    } else if (currentTime > arrEndTime[arrEndTime.length - 1]) {
      textKaraoke.innerHTML = `
      <div>Tên bài hát: Có Ai Đang Hẹn Hò Cùng Em Chưa</div>
      <div>Ca Sỹ: Quân A.P</div>
      `;
      textKaraoke2.innerHTML = "";
    }
  }
});

window.addEventListener("load", function () {
  alert(
    "Tính năng karaoke khả dụng đối với bài hát 'Có Ai Hẹn Hò Cùng Em Chưa' của Quân A.P!"
  );
});
