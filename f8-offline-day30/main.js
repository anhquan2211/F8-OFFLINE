let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let fileName = document.getElementById("fileName");
let charNumber = document.querySelector(".char-number");
let wordNumber = document.querySelector(".word-number");

const countEvent = new Event("count");

charNumber.addEventListener("count", function () {
  var countChar = writingArea.innerText
    .replace(/(\n\n)/g, "\n")
    .replace(/\t/g, "    ").length;
  charNumber.innerHTML = `Số ký tự: ${countChar}`;
});

wordNumber.addEventListener("count", function () {
  var str = writingArea.innerText.trim();
  if (str) {
    var countWord = str.split(/[\s\t]+/g).length;
    wordNumber.innerHTML = `Số từ: ${countWord}`;
  } else {
    wordNumber.innerHTML = `Số từ: 0`;
  }
});

writingArea.addEventListener("input", function () {
  charNumber.dispatchEvent(countEvent);
  wordNumber.dispatchEvent(countEvent);
});

// Font List
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Initial Setting
const initializer = () => {
  // Highlight button but no highlight for link, unlink, lists, undo, redo.
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font name
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontsize allow to 8
  for (let i = 1; i <= 8; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default fontsize
  fontSizeRef.value = 3;
};

//Main logic
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

//For basic operations which do not need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//Link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");

  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;

        //If current clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

//Handle Save File
function fileHandle(value) {
  if (value === "new") {
    writingArea = "";
    fileName.value = "Untitled";
  } else if (value === "txt") {
    const blob = new Blob([writingArea.innerText]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName.value}.txt`;
    link.click();
  } else if (value === "pdf") {
    html2pdf(writingArea).save(filename.value);
  }
}

//Tab for indent
writingArea.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key === "Tab") {
    e.preventDefault();
    document.execCommand("insertText", false, "\t");
  }
});

window.onload = initializer();
