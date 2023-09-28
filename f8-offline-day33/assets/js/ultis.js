/** @format */

let action, app, result;

export function setAction(actionText) {
  action.textContent = actionText;
}

export function setActionSuccess(successClass) {
  action.className = "action " + successClass;
}

export function handleSearchAction(actionDiv, appDiv) {
  action = actionDiv;
  app = appDiv;
  //Tạo một instance object SpeechRecognition hoặc webkitSpeechRecognition
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "vi-VN";

  recognition.onstart = function () {
    setAction("Hãy nói nội dung Dương muốn <3");
    setActionSuccess("");

    if (result) {
      result.remove();
    }
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };

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
      const status = handleResult(transcript.toLowerCase());
      if (status) {
        result.textContent = "Đã thực hiện xong Dương nhé!";
      } else {
        result.textContent = "Không thực hiện được rồi Dương ơi!";
      }
    }, 1000);
  };

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
        transcript.includes("mở bài hát") ||
        transcript.includes("nghe bài hát")
      ) {
        const transcriptNew = transcript
          .replace("bài hát", "")
          .replace("mở", "")
          .replace("nghe", "")
          .trim();

        const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${transcriptNew}`;
        window.open(url.trim());
      } else if (
        transcript.includes("video") ||
        transcript.includes("mở video") ||
        transcript.includes("xem video")
      ) {
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
