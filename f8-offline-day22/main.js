/*
Bài 1: Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter

Yêu cầu:
- Hàm return về giá trị.
- Ép ràng buộc kiểu dữ liệu là số.
- Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi.
*/

var total = function (...args) {
  var i = 0,
    arr = [];
  while (i < args.length) {
    if (isNaN(args[i])) {
      break;
    } else {
      arr.push(parseFloat(args[i]));
    }

    i++;
  }
  //   console.log(arr);
  if (args.length === arr.length) {
    return arr.reduce((prev, current) => {
      return prev + current;
    });
  } else {
    return `Invalid Data!`;
  }
};

console.log(total(9, "2", "a"));

/*
Bài 2: Viết một phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị.
*/
var price = "12000000";
Object.prototype.getCurrency = function (unit) {
  var arr = this.toString().split("");
  //   console.log(arr);
  for (var i = arr.length - 1; i >= 0; i -= 3) {
    // console.log(arr[i]);
    if (i === arr.length - 1) {
      continue;
    }
    arr[i] += ",";
  }
  return arr.join("") + " " + unit;
};

console.log(price.getCurrency("đ"));

/*
Bài 3: Chuyển đổi mảng một chiều thành dạng lồng.
*/
var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];

var categoriesCopy = [...categories];

// console.log(categoriesCopy);

function getNestedArr(categories, parentId = 0) {
  if (categories.length !== 0) {
    var parentElements = categories.filter(
      (category) => category.parent === parentId
    );

    var result = parentElements.map((item) => {
      const { parent, ...rest } = item;
      const children = getNestedArr(categories, item.id);
      if (children.length > 0) {
        return {
          ...rest,
          children,
        };
      } else {
        return rest;
      }
    });
    return result;
  } else {
    return `This is an empty array!`;
  }
}

console.log(getNestedArr(categories));

/*
Bài 4: Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong JS.
 */
Array.prototype.reduce2 = function (callback, initialValue) {
  if (!this.length) {
    return `Invalid Input!`;
  }

  var result = initialValue !== undefined ? initialValue : this[0];
  var startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    result = callback(result, this[i]);
  }
  return result;
};

var arr = [1, 2, 3, 4];
var result = arr.reduce2((pre, current) => {
  return pre + current;
}, 0);

console.log(result);
