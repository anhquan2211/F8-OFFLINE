var content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sed laborum! Officia ullam culpa fugiat vero nisi a.";

var words = content.split(" ");
// console.log(words);
var wordsSame = content.split(" ");

var i = 0;

let changeTextColor = function () {
  setInterval(function () {
    if (i > 0) {
      const str = document.querySelector("span").innerText;
      console.log(str);
      // words[i - 1] = words[i];
      words[i - 1] = str;
    }
    words[i] = `<span>${words[i]}</span>`;
    content = words.join(" ");
    document.getElementById("text").innerHTML = content;

    i++;
    if (i >= words.length) {
      i = 0;
    }
  }, 1000);
};

changeTextColor();
