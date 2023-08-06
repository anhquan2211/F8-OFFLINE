/*
Bài 1: Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
 */
var arr1 = [1, 3, 4, 10, -2];

if (arr1.length !== 0) {
  var minNumber = Math.min(...arr1);
  var maxNumber = Math.max(...arr1);
  console.log(
    ` Giá trị nhỏ nhất trong mảng là ${minNumber} tại vị trí index = ${arr1.indexOf(
      minNumber
    )}`
  );
  console.log(
    ` Giá trị nhỏ nhất trong mảng là ${maxNumber} tại vị trí index = ${arr1.indexOf(
      maxNumber
    )}`
  );
} else {
  console.log(` Mảng đã cho không có phần tử nào để so sánh.`);
}

/*
Bài 2: Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”
 */
function isPrime(number) {
  if (number % 1 !== 0 || number < 2 || (number % 2 === 0 && number !== 2))
    return false;
  for (let i = 2; i <= Math.sqrt(number); i++)
    if (number % i === 0) return false;
  return true;
}

var arr2 = [1, 3, 5, -5, 9, 7];
var totalPrime = 0,
  countPrime = 0,
  hasPrime = false;

if (arr2.length !== 0) {
  for (var i = 0; i < arr2.length; i++) {
    if (isPrime(arr2[i])) {
      totalPrime += arr2[i];
      countPrime++;
      hasPrime = true;
    }
  }
} else {
  console.log(`Mảng không có phần tử nào.`);
}

if (hasPrime) {
  console.log(
    `Trung bình các số nguyên tố trong mảng là ${totalPrime / countPrime}`
  );
} else {
  console.log(` Không có số nguyên tố trong mảng đã cho!`);
}

/*
Bài 3: Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý
 */

var arr3 = [1, 1, 3, -4, 3, 5, 6, 3];

if (arr3.length !== 0) {
  var result = arr3.filter((item, index) => arr3.indexOf(item) === index);
} else {
  console.log(` Mảng không có phần tử nào!`);
}

console.log(result);

/*
Bài 4:
*/

var arr4 = [4, 2, 2, 7, 8];

var addNumber = 2,
  indexAdd = 0;

if (arr4.length !== 0) {
  arr4.sort((a, b) => a - b);

  if (arr4[indexAdd] < addNumber) {
    indexAdd++;
  }
  arr4.splice(indexAdd, 0, addNumber);
  console.log(arr4);
} else {
  console.log(`Mảng không có phần tử nào.`);
}
