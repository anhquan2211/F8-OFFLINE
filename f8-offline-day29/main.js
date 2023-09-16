const list = document.querySelector(".list");
const listItems = document.querySelectorAll(".list-item");
const moduleItems = document.querySelectorAll(".title-module");

let listItemIndex = 0;
let moduleIndex = 0;

//Render and auto index
function render(rootElement) {
  const childArr = Array.from(rootElement.children);

  childArr.forEach(function (item, index) {
    item.draggable = "true";

    let title = "Bài ";

    if (item.classList.contains("title-module")) {
      title = "Module ";
      moduleIndex++;
    } else {
      listItemIndex++;
    }

    if (!item.children.length) {
      item.innerHTML = `${title} ${
        title === "Module " ? moduleIndex : listItemIndex
      }: <span>${item.innerText}</span>`;
    } else {
      item.innerHTML = `${title} ${
        title === "Module " ? moduleIndex : listItemIndex
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
    // console.log(targetElement !== dragElement);
    if (
      targetElement &&
      targetElement !== dragElement &&
      targetElement.nodeName === "DIV"
    ) {
      // console.log(`offset.y: ${offset.y}, halfHeight: ${halfHeight}`);
      const offset = getOffset(e);
      const halfHeight = getHalfHeight(e.target);

      if (offset.y > halfHeight) {
        if (targetElement.nextSibling.parentElement === rootElement) {
          rootElement.insertBefore(dragElement, targetElement.nextSibling);
        }
      } else {
        if (targetElement.parentElement === rootElement) {
          // rootElement.insertBefore(dragElement, targetElement);
        }
      }
      // if (targetElement.parentElement === rootElement) {
      //   rootElement.insertBefore(dragElement, targetElement);
      // }
    }
  }

  //Tạo function xử lý sự kiện kết thúc kéo thả
  function handleDragEnd(e) {
    e.preventDefault();

    dragElement.classList.remove("opacity");
    rootElement.removeEventListener("dragover", handleDragOver);
    rootElement.removeEventListener("dragend", handleDragEnd);

    renderView(dragElement);
  }

  // Sự kiện bắt đầu kéo thả.
  rootElement.addEventListener("dragstart", function (e) {
    dragElement = e.target; //Lưu phân tử được kéo thả.
    console.log(dragElement);

    //Set up Drag Start
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("Text", dragElement.textContent);

    rootElement.addEventListener("dragover", handleDragOver);
    rootElement.addEventListener("dragend", handleDragEnd);

    setTimeout(function () {
      dragElement.classList.add("opacity");
    }, 0);

    // dragElement.classList.add("opacity");

    // Lấy chiều cao của viewport
    const viewportHeight = window.innerHeight;
    // console.log(viewportHeight);

    // let isDragging = false;
    // let initialMouseY;
    // let initialElementY;

    // const scrollThreshold = 100;
    // const scrollSpeed = 5;

    // // Function to scroll the window
    // function scrollWindow(direction) {
    //   window.scrollBy(0, direction * scrollSpeed);
    // }

    // document.addEventListener("mousedown", function (e) {
    //   // dragElement = e.target;
    //   console.log("Đang nhảy vào mousedown");
    //   isDragging = true;

    //   e.preventDefault();

    //   initialMouseY = e.clientY;
    //   let elementRect = dragElement.getBoundingClientRect();
    //   initialElementY = elementRect.top;

    //   document.addEventListener("mousemove", handleMouseMove);
    // });

    // const handleMouseMove = function (e) {
    //   // console.log(e.target);
    //   console.log("Đang nhảy vào mousemove");
    //   if (!isDragging) return;

    //   // console.log(e.clientY);

    //   const deltaY = e.clientY - initialMouseY;
    //   const newElementY = initialElementY + deltaY;

    //   // Update the element's position
    //   // dragElement.style.top = newElementY + "px";

    //   if (newElementY < scrollThreshold) {
    //     // Scroll up
    //     scrollWindow(-1);
    //   } else if (newElementY > window.innerHeight - scrollThreshold) {
    //     // Scroll down
    //     scrollWindow(1);
    //   }
    // };

    // document.addEventListener("mouseup", () => {
    //   console.log("Đang nhảy vào mouseup");
    //   isDragging = false;
    //   document.removeEventListener("mousemove", handleMouseMove);
    // });
  });
}

sortable(list, () => {
  listItemIndex = 0;
  moduleIndex = 0;

  render(list);
});
