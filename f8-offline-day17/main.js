/*
Bài 1: Tính tiền taxi.
*/
let distance = 10,
  price,
  discount,
  total;

if (distance > 0) {
  if (distance <= 1) {
    price = 15000;
    total = price * distance;
  } else if (distance > 1 && distance <= 5) {
    price = 13500;
    total = 15000 + price * (distance - 1);
  } else {
    price = 11000;
    total = 15000 + 13500 * 4 + price * (distance - 5);
    if (distance > 120) {
      discount = 0.1;
      total = total - total * discount;
    }
  }
  console.log(`Tổng quãng đường đi được là ${distance}km hết ${total} đồng.`);
} else {
  console.log(`Vui lòng nhập quãng đường hợp lệ! `);
}

/*
Bài 2: Tính tiền điện.
*/
let kWh = 300,
  priceOfOnekWh,
  totalBill;

if (kWh > 0) {
  if (kWh <= 50) {
    priceOfOnekWh = 1678;
    totalBill = priceOfOnekWh * kWh;
  } else if (kWh > 51 && kWh <= 100) {
    priceOfOnekWh = 1734;
    totalBill = 50 * 1678 + priceOfOnekWh * (kWh - 50);
  } else if (kWh > 101 && kWh <= 200) {
    priceOfOnekWh = 2014;
    totalBill = 50 * 1678 + 50 * 1734 + priceOfOnekWh * (kWh - 100);
  } else if (kWh > 201 && kWh <= 300) {
    priceOfOnekWh = 2536;
    totalBill =
      50 * 1678 + 50 * 1734 + 100 * 2014 + priceOfOnekWh * (kWh - 200);
  } else if (kWh > 301 && kWh <= 400) {
    priceOfOnekWh = 2834;
    totalBill =
      50 * 1678 +
      50 * 1734 +
      100 * 2014 +
      100 * 2536 +
      priceOfOnekWh * (kWh - 300);
  } else if (kWh >= 401) {
    price = 2927;
    totalBill =
      50 * 1678 +
      50 * 1734 +
      100 * 2014 +
      100 * 2536 +
      100 * 2834 +
      priceOfOnekWh * (kWh - 400);
  }
  console.log(`Tổng số tiền điện phải đóng thàng này là: ${totalBill}đ`);
} else {
  console.log(`Số kWh nhập vào phải lớn hơn 0!`);
}

/*
Bài 3: Tính giá trị biểu thức S = 1 * 2 + 2 * 3 + ... + n * (n + 1)
*/
let n = 4,
  add = 1,
  sum = 0;

if (n % 1 === 0 && n > 0) {
  for (let i = 1; i <= n; i++) {
    sum += i * (i + 1);
  }

  console.log(`Giá trị của biểu thức S là: ${sum} `);
}

/*
Bài 4: Kiểm tra số nguyên tố.
*/

function isPrime(number) {
  if (number % 1 === 0) {
    if (number <= 1) {
      return false;
    } else {
      for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
          return false;
        }
      }
      return true;
    }
  } else {
    return false;
  }
}

if (isPrime(7.5)) {
  console.log(`Thỏa mãn điều kiện là số nguyên tố`);
} else {
  console.log(`Không thỏa mãn điều kiện số nguyên tố!`);
}

/*
Bài 5: Vẽ tam giác số với n dòng.
*/
function triangle(N) {
  let result = "";
  let currentNumber = 1;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= i; j++) {
      result += currentNumber + " ";
      currentNumber++;
    }
    result += "\n";
  }
  return result;
}

console.log(triangle(5));

/*
Bài 6: Vẽ bàn cờ vua..
*/
for (let i = 0; i < 64; i++) {
  document
    .getElementById("mainChessBoard")
    .appendChild(document.createElement("div")).style.backgroundColor =
    parseInt(i / 8 + i) % 2 == 0 ? "#ababab" : "white";
}

/*
Bài 7: Vẽ bảng cửu chương.
*/

document.write("<center><table border='1px'>");
for (var a = 1; a < 11; a++) {
  document.write("<tr style='height:40px'>");
  for (var b = 1; b < 11; b++) {
    document.write(
      "<td style='width:40px'><center>" + a * b + "</center></td>"
    );
  }
}

/*
Bài 8: Tính giá trị biểu thức mà không dùng vòng lặp.
*/
function getTotal(N) {
  if (N === 1) {
    return 1;
  } else {
    return 1 / N + getTotal(N - 1);
  }
}

let N = 5;
const result = getTotal(N);
console.log(`Giá trị của biểu thức S là: ${result}`);
