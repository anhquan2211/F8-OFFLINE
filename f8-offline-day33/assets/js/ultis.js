/** @format */

let action, app, result;

// Hàm hiển thị text khi có hành động của người dùng
export function setAction(actionText) {
  action.textContent = actionText;
}

//Hàm set class cho hành động đó, ban đầu thì successClass = "" còn khi nói xong thì successClass = "success"
export function setActionSuccess(successClass) {
  action.className = "action " + successClass;
}

//Hàm xử lý việc tìm kiếm theo đoạn text nhận được
export function handleSearchAction(actionDiv, appDiv) {
  action = actionDiv;
  app = appDiv;
  //Tạo một instance object SpeechRecognition hoặc webkitSpeechRecognition
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "vi-VN";

  //Sự kiện khi speech recognition được start
  recognition.onstart = function () {
    setAction("Hãy nói nội dung Dương muốn!");
    setActionSuccess("");

    //Xoá result nếu như tồn tại để khi nhấn vào tìm kiếm lần thứ 2 sẽ mất kết quả của lần thứ nhất
    if (result) {
      result.remove();
    }
  };

  //Sự kiện khi speech recognition kết thúc
  recognition.onspeechend = function () {
    recognition.stop();
  };

  //Sự kiện khi speech recognition nhận diện được giọng nói
  recognition.onresult = function (e) {
    setAction("Đã nói xong. Hi vọng kết quả như Dương muốn");
    setActionSuccess("success");

    //Lấy ra text khi người dùng nói
    const transcript = e.results[0][0].transcript;
    result = document.createElement("div");
    result.className = "result";
    result.textContent = "Đang thực hiện: " + transcript;
    app.appendChild(result);

    setTimeout(() => {
      const status = handleResult(transcript.toLowerCase().replaceAll(".", ""));
      if (status) {
        result.textContent = "Đã thực hiện xong Dương nhé!";
      } else {
        result.textContent = "Không thực hiện được rồi Dương ơi!";
      }
    }, 1000);
  };

  //Bắt đầu speech recognition
  recognition.start();
}

export function handleResult(transcript) {
  let status = true;
  switch (transcript) {
    case "google":
      window.open("https://google.com");
      break;

    case "youtube":
      window.open("https://youtube.com");
      break;

    case "facebook":
      window.open("https://facebook.com");
      break;

    case "google drive":
      window.open("https://drive.google.com");
      break;

    case "google maps":
    case "bản đồ":
    case "maps":
      window.open("https://maps.google.com");
      break;

    default:
      if (
        transcript.includes("chỉ đường") ||
        transcript.includes("tới") ||
        transcript.includes("đường tới")
      ) {
        const transcriptNew = transcript
          .replace("chỉ đường", "")
          .replace("tới", "")
          .replace("đường tới", "")
          .trim();

        const url = `https://www.google.com/maps/search/${transcriptNew}`;
        window.open(url.trim());
      } else if (
        transcript.includes("bài hát") ||
        transcript.includes("mở bài") ||
        transcript.includes("nghe bài")
      ) {
        const transcriptNew = transcript
          .replace("bài hát", "")
          .replace("mở", "")
          .replace("nghe", "")
          .replace("bài", "")
          .trim();

        const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${transcriptNew}`;
        window.open(url.trim());
      } else if (transcript.includes("video")) {
        const transcriptNew = transcript
          .replace("video", "")
          .replace("mở", "")
          .replace("xem", "")
          .trim();

        const url = `https://www.youtube.com/results?search_query=${transcriptNew}`;
        window.open(url.trim());
      } else {
        status = false;
      }
      break;
  }
  return status;
}
