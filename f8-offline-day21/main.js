var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};
function getError(field) {
  if (errors[field]) {
    for (var key in errors[field]) {
      return errors[field][key];
    }
  } else {
    return "Not exists errors!";
  }
}

console.log(getError("password"));

//========================================================================
function Customer(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

function createCustomers(inputArray) {
  const validData = inputArray.every(
    (customer) =>
      typeof customer.name === "string" &&
      customer.name &&
      typeof customer.age === "number" &&
      customer.age > 0 &&
      customer.age % 1 === 0 &&
      typeof customer.address === "string" &&
      customer.address
  );

  if (validData) {
    const sortedArray = inputArray.slice().sort((a, b) => a.age - b.age);

    const result = sortedArray.map((customer) => {
      const arrayName = customer.name.split(" ");
      const shortName = `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
      return { ...customer, shortName };
    });

    return result;
  } else {
    return `Vui lòng nhập lại dữ liệu!`;
  }
}

const customers = [
  { name: "Nguyen Van A", age: 11, address: "Ha Noi" },
  { name: "Nguyen Van B", age: 2, address: "Hai Phong" },
  { name: "Nguyen Van C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);

console.log(result);

//=========================================================================================================

function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
}

const registeredUsers = [];

function register(name, password, email) {
  if (!name || !password || !email) {
    console.log("Vui lòng cung cấp đầy đủ thông tin.");
    return;
  }

  const existingUser = registeredUsers.find((user) => user.email === email);
  if (existingUser) {
    console.log("Người dùng đã tồn tại.");
    return;
  }

  const newUser = new User(name, password, email);
  newUser.role = "user";
  registeredUsers.push(newUser);
  console.log("Đăng ký thành công.");
  return newUser;
}

function login(email, password) {
  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    console.log("Đăng nhập thành công.");
    return user;
  } else {
    console.log("Email hoặc mật khẩu không đúng.");
    return null;
  }
}
register("Nguyễn Văn A", "123456");
register("Lưu Anh Quân", "123456", "anhquanst2211@gmail.com");

console.log(registeredUsers);

login("an123456@gmail.com", "123456");
login("anhquanst2211@gmail.com", "123456");
