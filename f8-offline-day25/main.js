var carouselContainer = document.querySelector(".carousel"),
  carouselInner = carouselContainer.querySelector(".carousel-inner"),
  carouselNav = carouselContainer.querySelector(".carousel-nav"),
  carouselDots = carouselContainer.querySelector(".carousel-dots"),
  nextButton = carouselNav.querySelector(".next"),
  prevButton = carouselNav.querySelector(".prev"),
  carouselItems = carouselInner.querySelectorAll(".item");

if (carouselItems.length) {
  var clientWidth,
    totalWidth,
    paginationHTML = "";

  clientWidth = carouselInner.clientWidth;
  totalWidth = clientWidth * carouselItems.length;

  carouselItems.forEach(function (item, index) {
    item.style.width = `${clientWidth}px`;
    paginationHTML += `<span class="${
      index === 0 ? "active" : ""
    }" data-index="${index}"></span>`;
  });

  carouselDots.innerHTML = paginationHTML;
  carouselInner.style.width = `${totalWidth}px`;

  var goToSlide = function (index) {
    var translateValue = -clientWidth * index;
    carouselInner.style.transform = `translateX(${translateValue}px)`;
    updatePagination(index);
  };

  var updatePagination = function (index) {
    Array.from(carouselDots.children).forEach(function (dot, dotIndex) {
      if (dot.classList.contains("active")) {
        dot.classList.remove("active");
      }
      if (index === dotIndex) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", function () {
        currentSlideIndex = dotIndex;
        currentTranslate = -clientWidth * currentSlideIndex;
        goToSlide(currentSlideIndex);
        console.log(currentTranslate);
      });
    });
  };

  console.log(carouselDots.children);

  updatePagination(0);

  var currentTranslate = 0,
    currentSlideIndex = 0;

  nextButton.addEventListener("click", function () {
    if (Math.abs(currentTranslate) < totalWidth - clientWidth) {
      currentTranslate -= clientWidth;
      currentSlideIndex++;
      carouselInner.style.transform = `translateX(${currentTranslate}px)`;
      updatePagination(currentSlideIndex);
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentTranslate < 0) {
      currentTranslate += clientWidth;
      currentSlideIndex--;
      carouselInner.style.transform = `translateX(${currentTranslate}px)`;
      updatePagination(currentSlideIndex);
    }
  });

  var isDragging = false,
    transitionInProgress = false,
    dragThreshold = (10 * clientWidth) / 100;

  carouselInner.addEventListener("mousedown", function (event) {
    event.preventDefault();
    isDragging = true;
    startX = event.clientX;
    console.log(startX);
  });

  carouselInner.addEventListener("mouseup", function (event) {
    event.preventDefault();
    isDragging = false;
    carouselInner.style.transform = `translateX(${currentTranslate}px)`;
    carouselInner.style.transition = null;
    updatePagination(currentSlideIndex);
    transitionInProgress = false;
    // console.log(currentTranslate, currentSlideIndex);
  });

  carouselInner.addEventListener("mousemove", function (event) {
    if (isDragging) {
      carouselInner.style.cursor = "move";
      var dragDistance = event.clientX - startX;
      // console.log(currentTranslate, totalWidth);
      if (dragDistance < 0) {
        if (Math.abs(dragDistance) < dragThreshold) {
          carouselInner.style.transform = `translateX(${
            currentTranslate + dragDistance
          }px)`;
          carouselInner.style.transition = "none";
        } else if (
          !transitionInProgress &&
          Math.abs(currentTranslate) < totalWidth - clientWidth
        ) {
          currentTranslate = 0 - ++currentSlideIndex * clientWidth;
          transitionInProgress = true;
          carouselInner.style.transform = `translateX(${currentTranslate}px)`;
          carouselInner.style.transition = null;
          goToSlide(currentSlideIndex);
          // console.log(currentSlideIndex);
        }
      } else {
        if (dragDistance < dragThreshold) {
          carouselInner.style.transform = `translateX(${
            currentTranslate + dragDistance
          }px)`;
          carouselInner.style.transition = "none";
        } else if (!transitionInProgress && currentTranslate < 0) {
          currentTranslate = 0 - --currentSlideIndex * clientWidth;
          transitionInProgress = true;
          carouselInner.style.transform = `translateX(${currentTranslate}px)`;
          carouselInner.style.transition = null;
          goToSlide(currentSlideIndex);
        }
      }
    } else {
      carouselInner.style.cursor = "default";
    }
  });
}

// var carouselContainer = document.querySelector(".carousel"),
//   carouselInner = carouselContainer.querySelector(".carousel-inner"),
//   carouselNav = carouselContainer.querySelector(".carousel-nav"),
//   carouselDots = carouselContainer.querySelector(".carousel-dots"),
//   nextButton = carouselNav.querySelector(".next"),
//   prevButton = carouselNav.querySelector(".prev"),
//   carouselItems = carouselInner.querySelectorAll(".item");

// if (carouselItems.length) {
//   var clientWidth,
//     totalWidth,
//     paginationHTML = "";

//   clientWidth = carouselInner.clientWidth;
//   totalWidth = clientWidth * carouselItems.length;

//   carouselItems.forEach(function (item, index) {
//     item.style.width = `${clientWidth}px`;
//     paginationHTML += `<span class="${
//       index === 0 ? "active" : ""
//     }" data-index="${index}"></span>`;
//   });

//   carouselDots.innerHTML = paginationHTML;
//   carouselInner.style.width = `${totalWidth}px`;

//   var goToSlide = function (index) {
//     var translateValue = -clientWidth * index;
//     carouselInner.style.transform = `translateX(${translateValue}px)`;
//     updatePagination(index);
//   };

//   var updatePagination = function (index) {
//     Array.from(carouselDots.children).forEach(function (dot, dotIndex) {
//       if (dot.classList.contains("active")) {
//         dot.classList.remove("active");
//       }
//       if (index === dotIndex) {
//         dot.classList.add("active");
//       }
//       dot.addEventListener("click", function () {
//         currentSlideIndex = dotIndex;
//         currentTranslate = -clientWidth * currentSlideIndex;
//         goToSlide(currentSlideIndex);
//         console.log(currentTranslate);
//       });
//     });
//   };

//   console.log(carouselDots.children);

//   updatePagination(0);

//   var currentTranslate = 0,
//     currentSlideIndex = 0;

//   nextButton.addEventListener("click", function () {
//     if (Math.abs(currentTranslate) < totalWidth - clientWidth) {
//       currentTranslate -= clientWidth;
//       currentSlideIndex++;
//       carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//       updatePagination(currentSlideIndex);
//     }
//   });

//   prevButton.addEventListener("click", function () {
//     if (currentTranslate < 0) {
//       currentTranslate += clientWidth;
//       currentSlideIndex--;
//       carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//       updatePagination(currentSlideIndex);
//     }
//   });

//   var isDragging = false,
//     transitionInProgress = false,
//     dragThreshold = (90 * clientWidth) / 100;

//   carouselInner.addEventListener("mousedown", function (event) {
//     event.preventDefault();
//     isDragging = true;
//     startX = event.clientX;
//   });

//   carouselInner.addEventListener("mouseup", function (event) {
//     event.preventDefault();
//     isDragging = false;
//     carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//     carouselInner.style.transition = null;
//     // transitionInProgress = false;
//     updatePagination(currentSlideIndex);
//     carouselInner.style.cursor = "default";

//     var dragDistance = event.clientX - startX;
//     if (transitionInProgress) {
//       if (dragDistance < 0) {
//         if (Math.abs(dragDistance) < dragThreshold) {
//           currentTranslate = 0 - ++currentSlideIndex * clientWidth;
//           transitionInProgress = true;
//           carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//           carouselInner.style.transition = null;
//           goToSlide(currentSlideIndex);
//         }
//       } else {
//         if (dragDistance < dragThreshold) {
//           currentTranslate = 0 - --currentSlideIndex * clientWidth;
//           transitionInProgress = true;
//           carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//           carouselInner.style.transition = null;
//           goToSlide(currentSlideIndex);
//         }
//       }
//     }
//   });

//   carouselInner.addEventListener("mousemove", function (event) {
//     if (isDragging) {
//       carouselInner.style.cursor = "move";
//       var dragDistance = event.clientX - startX;
//       if (dragDistance < 0) {
//         if (Math.abs(dragDistance) < dragThreshold) {
//           carouselInner.style.transform = `translateX(${
//             currentTranslate + dragDistance
//           }px)`;
//           carouselInner.style.transition = "none";
//         }
//         // else if (
//         //   !transitionInProgress &&
//         //   Math.abs(currentTranslate) < totalWidth - clientWidth
//         // ) {
//         //   currentTranslate = 0 - ++currentSlideIndex * clientWidth;
//         //   transitionInProgress = true;
//         //   carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//         //   carouselInner.style.transition = null;
//         //   goToSlide(currentSlideIndex);
//         // }
//       } else {
//         if (dragDistance < dragThreshold) {
//           carouselInner.style.transform = `translateX(${
//             currentTranslate + dragDistance
//           }px)`;
//           carouselInner.style.transition = "none";
//         }
//         // else if (!transitionInProgress && currentTranslate < 0) {
//         //   currentTranslate = 0 - --currentSlideIndex * clientWidth;
//         //   transitionInProgress = true;
//         //   carouselInner.style.transform = `translateX(${currentTranslate}px)`;
//         //   carouselInner.style.transition = null;
//         //   goToSlide(currentSlideIndex);
//         // }
//       }
//     } else {
//       carouselInner.style.cursor = "default";
//     }
//   });
// }
