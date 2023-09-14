const list = document.querySelector(".list");
const listItems = document.querySelectorAll(".list-item");

let listItemIndex = 0;
let moduleIndex = 0;

//Render and auto index
function render(rootElement) {
  const childArr = Array.from(rootElement.children);

  childArr.forEach(function (item, index) {
    item.draggable = "true";

    let type = "Bài ";

    if (item.classList.contains("title-module")) {
      type = "Module ";
      moduleIndex++;
    } else {
      listItemIndex++;
    }

    if (!item.children.length) {
      item.innerHTML = `${type} ${
        type === "Module " ? moduleIndex : listItemIndex
      }: <span>${item.innerText}</span>`;
    } else {
      item.innerHTML = `${type} ${
        type === "Module " ? moduleIndex : listItemIndex
      }: <span>${item.children[0].innerText}</span>`;
    }
  });
}

// Xử lý con trỏ chuột khi kéo thả
const getOffset = (e) => {
  const getRect = e.target.getBoundingClientRect();
  const offset = {
    x: e.pageX - getRect.left,
    y: e.pageY - getRect.top,
  };
  return offset;
};

// Hàm nhận biết vị trí của element để quyết định chèn vào trước hay sau.
const getHalfHeight = (element) => {
  const rect = element.getBoundingClientRect();
  return (rect.bottom - rect.top) / 2;
};

const appendPlaceholder = (e, index) => {
  e.preventDefault();
  if (index === dragIndex) {
    return;
  }

  const offset = getOffset(e);
  const halfHeight = getHalfHeight(e.target);
  const placeholder = list.children[dragIndex];

  // console.log(`hover on ${index} ${offset.y > halfHeight ? 'bottom half' : 'top half'}`)
  if (offset.y > halfHeight) {
    list.insertBefore(e.target, placeholder);
  } else if (list.children[index + 1]) {
    list.insertBefore(e.target.nextSibling || e.target, placeholder);
  }
  return;
};

function sortable(rootElement, renderView) {
  // Khởi tạo phần tử được drag
  var dragElement;

  // Render View
  render(rootElement);

  // Tạo function xử lý sự kiện thả dragover
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Lấy ra phần tử được thả
    var targetElement = e.target;
    if (
      targetElement &&
      targetElement !== dragElement &&
      targetElement.nodeName === "DIV"
    ) {
      // console.log(1);
      const offset = getOffset(e);
      const halfHeight = getHalfHeight(e.target);
      console.log(rootElement);

      if (offset.y > halfHeight) {
        if (targetElement.nextSibling.parentElement === rootElement) {
          console.log("You moving module");
          rootElement.insertBefore(dragElement, targetElement.nextSibling);
        } else {
          if (targetElement.parentElement === rootElement) {
            console.log("You moving lession");
            rootElement.insertBefore(dragElement, targetElement);
          }
        }
      }
    }
  }

  //Tạo function xử lý sự kiện kết thúc kéo thả
  function handleDragEnd(e) {
    e.preventDefault();

    dragElement.classList.remove("opacity");
    rootElement.removeEventListener("dragover", handleDragOver, false);
    rootElement.removeEventListener("dragend", handleDragEnd, false);

    renderView(dragElement);
  }

  // Sự kiện bắt đầu kéo thả.
  rootElement.addEventListener(
    "dragstart",
    function (e) {
      dragElement = e.target; //Lưu phân tử được kéo thả.

      //Set up Drag Start
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("Text", dragElement.textContent);

      rootElement.addEventListener("dragover", handleDragOver, false);
      rootElement.addEventListener("dragend", handleDragEnd, false);

      setTimeout(function () {
        dragElement.classList.add("opacity");
      }, 0);
    },
    false
  );
}

sortable(list, (item) => {
  listItemIndex = 0;
  moduleIndex = 0;

  render(list);
});
