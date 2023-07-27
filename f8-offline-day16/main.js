/*
Bài 1: Hoán vị 2 số.
Input: Cho trước 2 số a, b
Output: Thực hiện hoán vị 2 số không dùng biến trung gian.
*/
var a = 2,
  b = 5;

a = a + b; // a = 2 + 5 = 7
b = a - b; // b = 7 - 5 = 2
a = a - b; // a = 7 - 2 = 5

console.log(`Kết quả sau khi hoán vị là: ${a} và ${b}`);

/*
Bài 2: Thực hiện phép toán: S = 10 + 20 + 5 ^ 10 / 2
*/

var S = 10 + 20 + 5 ** 10 / 2;

console.log(`Kết quả sau khi tính toán là S = ${S}`);

/*
Bài 3:
Input: Cho trước 3 số a, b, c
Output: Tìm số lớn nhất trong 3 số và hiển thị kết quả.
*/
var a = 0,
  b = 0,
  c = 0,
  max = a;
if (b >= max) {
  max = b;
} else if (c >= max) {
  max = c;
}
console.log(`Số lớn nhất trong ba số a, b, c là ${max}`);

/*
Bài 4:
Input: Cho trước 2 số a, b
Output: Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/

var a = 2,
  b = 0;

if (a * b > 0) {
  console.log(`Hai số a và b cùng dấu`);
} else if (a * b < 0) {
  console.log(`Hai số a và b khác dấu`);
} else {
  console.log(`Trong hai số a và b có ít nhất một số có giá trị là 0`);
}

/*
Bài 5:
Input: Cho trước 3 số a, b
Output: Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var a = 3,
  b = 4,
  c = 8,
  temp;
if (a > b) {
  temp = a;
  a = b;
  b = temp;
}
if (a > c) {
  temp = a;
  a = c;
  c = temp;
}
if (b > c) {
  temp = b;
  b = c;
  c = temp;
}

console.log(`Kết quả sắp xếp theo thứ tự tăng dần là: ${a}, ${b}, ${c} `);
