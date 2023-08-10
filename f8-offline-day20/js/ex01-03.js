// Bai 1
var arrA = ["a", 1, 2];
var arrB = [5, 2, 6, 7, 1];

if (Array.isArray(arrA) && Array.isArray(arrB)) {
  var result = arrA.reduce((prev, current) => {
    if (arrB.includes(current) && !prev.includes(current)) {
      prev.push(current);
    }
    return prev;
  }, []);

  if (result.length === 0) {
    console.log(`Hai mảng đã cho không có phần tử nào giống nhau`);
  } else {
    console.log(`Các phần tử giống nhau của 2 mảng là:`, result);
  }
} else {
  console.log(`Vui lòng nhập lại mảng.`);
}

// Bai 2
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];

if (Array.isArray(arr)) {
  function flattenArr(arr) {
    return arr.reduce((prev, current) => {
      return prev.concat(
        Array.isArray(current) ? flattenArr(current) : current
      );
    }, []);
  }
  console.log(`Mảng sau khi đã được làm phẳng:`, flattenArr(arr));
} else {
  console.log(`Vui lòng nhập lại mảng.`);
}

//Bai 3:
var arr = [
  ["a", 1, true],
  ["b", 2, false],
];

if (Array.isArray(arr)) {
  if (arr.length === 0) {
    console.log("Mảng đã cho là mảng rỗng.");
  } else {
    var newArr = function flattenArr(arr) {
      return arr.reduce((prev, current) => {
        return prev.concat(
          Array.isArray(current) ? flattenArr(current) : current
        );
      }, []);
    };
  }
} else {
  console.log("Vui lòng nhập lại mảng.");
}

var arrFlat = newArr(arr);
// console.log(arrFlat);

var result = [[], [], [], [], [], [], []];

for (index in arrFlat) {
  if (typeof arrFlat[index] === "string") {
    result[0].push(arrFlat[index]);
  } else if (typeof arrFlat[index] === "number") {
    result[1].push(arrFlat[index]);
  } else if (typeof arrFlat[index] === "boolean") {
    result[2].push(arrFlat[index]);
  } else if (Array.isArray(arrFlat[index])) {
    result[3].push(arrFlat[index]);
  } else if (arrFlat[index] === null && arrFlat[index] === undefined) {
    result[4].push(arrFlat[index]);
  } else if (typeof arrFlat[index] === "function") {
    result[5].push(arrFlat[index]);
  } else {
    result[6].push(arrFlat[index]);
  }
}
console.log(result);
