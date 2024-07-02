const equal = document.querySelector(".equal");
const plus = document.querySelector(".plus");
const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clearAll");
const del = document.querySelector(".del");
const seconScreen = document.querySelector(".small");
const demical = document.querySelector(".demical");
// Bộ nhớ
const locate = document.querySelector(".locate");
const loca = document.querySelector(".localStorage");
const add = document.querySelector(".addMemory");
const text = document.querySelector(".text");
const sub = document.querySelector(".subMemory");
const store = document.querySelector(".storeMemory");
const clearMemory = document.querySelector(".clearMemory");
const recalMemory = document.querySelector(".recalMemory");
// Biến
let soThuNhat = 0;
let soThuHai = 0;
let toanTuHienTai = null; // Là tất cả các phép tính 
let manChinh = "";  // màn hình chính
let manPhu = ""; // màn hình phụ
let isNum1 = false;
let isNum2 = false;
let isOperator = false; // cờ toán tử
let isResult = false;
let dauBang = false; // cờ dấu =
let giaTriCuoi = 0;
let giaTriGanCuoi = null;
let count = false;
let toggleStore = false;
let arr = [];
// bật tắt 
loca.addEventListener('click', function () {
  if (toggleStore) { // bật 
    locate.style.height = '400px';
    locate.style.top = '35%'
  } else { // tawts
    locate.style.height = '0px';
    locate.style.top = '35%'
  }
  toggleStore = !toggleStore;
});
// Cộng dồn vào số gần nhất trong bộ nhớ
add.addEventListener('click', function () {
  if (screen.innerHTML.trim() === '') {
    if (arr.length === 0) {
      arr.push(0);
    } else {
      arr[0] += 0;
    }
  } else {
    let value = parseFloat(screen.innerHTML);
    if (arr.length > 0) {
      arr[0] += value;
    } else {
      arr.push(value);
    }
  }
  updateMemory();
});
// Trừ dồn vào số gần nhất trong bộ nhớ
sub.addEventListener('click', function () {
  if (screen.innerHTML.trim() === '') {
    if (arr.length === 0) {
      arr.push(0);
    } else {
      arr[0] -= 0;
    }
  } else {
    let value = parseFloat(screen.innerHTML);
    if (arr.length > 0) {
      arr[0] -= value;
    } else {
      arr.push(value);
    }
  }
  updateMemory();
});
// Thêm vào bộ nhớ
store.addEventListener('click', function () {
  let value = parseFloat(screen.innerHTML);
  arr.unshift(value); // Thêm phần tử mới vào đầu mảng
  updateMemory();
});
// gọi từ memory ra
recalMemory.addEventListener('click', function () {
  seconScreen.innerHTML = ''; 
  if (arr.length > 0) {
    screen.innerHTML = arr[0]; 
    manChinh = arr[0].toString(); 
    if (isOperator) {
      soThuHai = arr[0]; 
      isNum2 = true; i
    } else {
      soThuNhat = arr[0];
      isNum1 = true;
    }
    isResult = false; 
  }
});

// Xóa toàn bộ bộ nhớ
clearMemory.addEventListener('click', function () {
  text.innerHTML = '';
  arr = [];
});
// Nút demical
demical.addEventListener('click', function (e) {
  const demi = e.target.textContent;
  if (manChinh === "") {
    manChinh = "0";
  }
  if (!manChinh.includes('.')) {
    manChinh += '.';
    screen.innerHTML = manChinh;
  }
});
// click số
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    let a = e.target.innerHTML;
    if (isResult) { // nếu mà có dấu kết quả thì khi nhập số thì nó sẽ clear màn đi 
      ClearAll();
      isResult = false;
    }
    if (isOperator === false) { // nếu ko có toán tử thì cho nhập số thứ nhất , còn ko thì ngược lại
      SoDau(a);
      console.log(soThuNhat);
    } else {
      SoCuoi(a);
      console.log(soThuHai);
    }
  });
}

// Click toán tử
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (e) {
    const operator = e.target.textContent.trim();
    switch (operator) {
      case 'x2':
        Pow(); // bình phương
        break;
      case '1/x':
        Fraction(); // 1 phần x
        break;
      case '+/-':
        toggleSign(); // âm dương
        break;
      case '%':
        PhanTram(); // Percent
        break;
      case '2√x':
        SquareRoot(); // căn
        break;
      default:
        isOperator = true;
        toanTuHienTai = operator;
        if (isResult) {
          soThuNhat = parseFloat(screen.innerHTML);
          isResult = false;
        } else {
          if (soThuHai !== null) {
            soThuHai = parseFloat(screen.innerHTML);
            ThucHienPhepTinh();
          } else {
            soThuNhat = parseFloat(screen.innerHTML);
          }
        }

        seconScreen.innerHTML = `${soThuNhat} ${operator}`;
        manChinh = '';
        screen.innerHTML = '';
        break;
    }
  });
}
function ThucHienPhepTinh() {
  switch (toanTuHienTai) {
    case '+':
      ketQua = soThuNhat + soThuHai;
      break;
    case '-':
      ketQua = soThuNhat - soThuHai;
      break;
    case '*':
      ketQua = soThuNhat * soThuHai;
      break;
    case '∕':
      ketQua = soThuNhat / soThuHai;
      break;
    default:
      return;
  }
}
// Nút bằng
equal.addEventListener('click', function (e) {
  dauBang = true; // cộng liên tục 
  if(isNum1 === false){
    soThuNhat = 0 + soThuNhat;
  }
  switch (toanTuHienTai) {
    case '+':
      Cong();
      break;
    case '-':
      Tru();
      break;
    case '*':
      Nhan();
      break;
    case '∕':
      Chia();
      break;
    default:
      break;
  }
});

// Số Đầu 
function SoDau(num) {
  if (manChinh === "0" && num === "0") { // nếu mà màn chính = 0 ròi mà num = 0 thì ko làm j cả
    soThuNhat = 0;
  }
  manChinh += `${num}`;
  manChinh = manChinh.replace(',', '.');
  screen.innerHTML = manChinh;
  soThuNhat = parseFloat(manChinh);
  isNum1 = true;
}
// Số Cuối
function SoCuoi(num) {
  if (manChinh === "0" && num === "0") {
    return;
  }
  if (isOperator === true) { // có toán tử rồi thì nhập số thứ 2
    manChinh += `${num}`;
    manChinh = manChinh.replace(',', '.');
    screen.innerHTML = manChinh;
    soThuHai = parseFloat(manChinh);
    isNum2 = true;
  }
}
// Phép Cộng
function Cong() {
  seconScreen.innerHTML = `${soThuNhat} + ${soThuHai} = ` // in ra màn phụ
  const tong = soThuNhat + soThuHai;
  screen.innerHTML = tong;
  manChinh = tong.toString();
  isResult = true;
  if (dauBang === true) { // nếu click tiếp dấu = thì hiển gán soThuNhat = tong để cộng liên tiếp
    soThuNhat = tong;
  }
}

// Phép Trừ
function Tru() {
  seconScreen.innerHTML = `${soThuNhat} - ${soThuHai} = `
  const hieu = soThuNhat - soThuHai;
  screen.innerHTML = hieu;
  manChinh = hieu.toString();
  isResult = true;
  if (dauBang === true) {
    soThuNhat = hieu;
  }
}
// Phép Nhân
function Nhan() {
  seconScreen.innerHTML = `${soThuNhat} * ${soThuHai} = `
  const tich = soThuNhat * soThuHai;
  screen.innerHTML = tich;
  manChinh = tich.toString();
  isResult = true;
  if (dauBang === true) {
    soThuNhat = tich;
  }
}

// Phép Chia
function Chia() {
  seconScreen.innerHTML = `${soThuNhat} / ${soThuHai} = `
  console.log(soThuHai);
  if (soThuHai !== 0) {
    const thuong = soThuNhat / soThuHai;
    if (Number.isInteger(thuong)) {
      screen.innerHTML = thuong;
    }
    else {
      screen.innerHTML = thuong.toFixed(5);
    }
    manChinh = thuong.toString();
    soThuNhat = thuong.toFixed(5);
    isResult = true;
  } else {
    screen.innerHTML = "Cannot divide by zero";
    manChinh = "";
  }
}

// Phần Trăm
function PhanTram() {
  if (screen.innerHTML.trim() === '') {
    return;
  }
  if (isResult) { // nếu số phần trăm là kết quả
    let ketQua = parseInt(screen.innerHTML);
    seconScreen.innerHTML = `${ketQua}`
    ketQua = ketQua / 100;
    if (Number.isInteger(ketQua)) {
      screen.innerHTML = ketQua;
    }
    else {
      screen.innerHTML = ketQua.toFixed(5);
    }
    manChinh = ketQua.toString();
    soThuNhat = ketQua.toFixed(5); // gán tiếp nếu tiếp tục bình phương
    isResult = false;
  } else { // nếu là sothunhat hoặc so thu 2
    const soHienTai = parseInt(manChinh);
    if (soHienTai < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      const phanTram = soHienTai / 100
      seconScreen.innerHTML = `${soHienTai}`
      screen.innerHTML = phanTram.toFixed(5);
      manChinh = phanTram.toString();
      if (isOperator) {
        soThuHai = phanTram;
      } else {
        soThuNhat = phanTram;
      }
    }
  }
}
// Hàm bình phương
function Pow() {
  if (screen.innerHTML.trim() === '') {
    return;
  }
  if (isResult) { // nếu số pow là kết quả
    let ketQua = parseFloat(screen.innerHTML);
    seconScreen.innerHTML = `sqr(${ketQua})`
    ketQua = Math.pow(ketQua, 2);
    screen.innerHTML = ketQua.toFixed(5);
    manChinh = ketQua.toString();
    soThuNhat = ketQua;
    isResult = false;
  } else { // nếu là sothunhat hoặc so thu 2
    const soHienTai = parseFloat(manChinh);
    if (soHienTai < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      const binhPhuong = Math.pow(soHienTai, 2);
      seconScreen.innerHTML = `sqr(${soHienTai})`
      screen.innerHTML = binhPhuong.toFixed(5);
      manChinh = binhPhuong.toString();
      if (isOperator) {
        soThuHai = binhPhuong;
      } else {
        soThuNhat = binhPhuong;
      }
    }
  }
}
// Căn 
function SquareRoot() {
  if (screen.innerHTML.trim() === '') {
    return;
  }
  if (isResult) {
    let ketQua = parseFloat(screen.innerHTML);
    seconScreen.innerHTML = `√(${ketQua})`
    if (ketQua < 0) {
      screen.innerHTML = "Invalid input";
      manChinh = "";
    } else {
      ketQua = Math.sqrt(ketQua);
      screen.innerHTML = ketQua.toFixed(5);
      manChinh = ketQua.toString();
      soThuNhat = ketQua;
      isResult = false;
    }
  } else {
    const soHienTai = parseFloat(manChinh);
    seconScreen.innerHTML = `√(${soHienTai.toFixed(5)})`
    if (soHienTai < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      const can = Math.sqrt(soHienTai);
      screen.innerHTML = can.toFixed(5);
      manChinh = can.toString();
      if (isOperator) {
        soThuHai = can;
      } else {
        soThuNhat = can;
      }
    }
  }
}
// Hàm 1 nghịch đảo
function Fraction() {
  if (screen.innerHTML.trim() === '') {
    return;
  }
  if (isResult) {
    let ketQua = parseFloat(screen.innerHTML);
    seconScreen.innerHTML = `1/(${ketQua})`
    if (ketQua === 0) {
      screen.innerHTML = "Cannot divide by zero";
      manChinh = "";
    } else {
      ketQua = 1 / ketQua;
      screen.innerHTML = ketQua.toFixed(5);
      manChinh = ketQua.toString();
      soThuNhat = ketQua;
      isResult = false;
    }
  } else {
    const soHienTai = parseFloat(manChinh);
    seconScreen.innerHTML = `1/(${soHienTai})`
    if (soHienTai === 0) {
      screen.innerHTML = "Cannot divide by zero";
      manChinh = "";
    } else {
      const nghichDao = 1 / soHienTai;
      screen.innerHTML = nghichDao.toFixed(5);
      manChinh = nghichDao.toString();
      if (isOperator) {
        soThuHai = nghichDao;
      } else {
        soThuNhat = nghichDao;
      }
    }
  }
}
// Hàm đổi dấu
function toggleSign() {
  if (screen.innerHTML.trim() === '') {
    return;
  }
  if (isResult) { // nếu là kết quả 
    let ketQua = parseFloat(screen.innerHTML);
    seconScreen.innerHTML = `negate(${ketQua})`
    ketQua = -ketQua;
    screen.innerHTML = ketQua;
    manChinh = ketQua.toString();
    soThuNhat = ketQua;
    isResult = false;
  } else { // nếu là sothunhat hoặc sothu2
    const soHienTai = parseFloat(manChinh);
    seconScreen.innerHTML = `negate(${soHienTai})`
    if (soHienTai !== 0) {
      const doiDau = soHienTai * -1;
      screen.innerHTML = doiDau;
      manChinh = doiDau.toString();
      if (isOperator) {
        soThuHai = doiDau;
      } else {
        soThuNhat = doiDau;
      }
    }
    else {
      const doiDau = soHienTai; // 0 đổi dấu thì vẫn thế
      screen.innerHTML = doiDau;
    }
  }
}
// Xóa màn hình
function ClearMan() {
  manChinh = '';
  screen.innerHTML = '';
}
// Xóa all
function ClearAll() {
  ClearMan();
  manPhu = '';
  seconScreen.innerHTML = '';
  soThuNhat = 0;
  soThuHai = 0;
  toanTuHienTai = null;
  isNum1 = false;
  isNum2 = false;
  isOperator = false;
  isResult = false;
}
// Cập nhật hiển thị bộ nhớ
function updateMemory() {
  text.innerHTML = ''
  for (let i = 0; i < arr.length; i++) {
    const memoryItem = document.createElement("div");
    memoryItem.classList.add("memory-item");

    const m = document.createElement("p");
    m.classList.add("hover");
    m.innerText = arr[i];
    memoryItem.appendChild(m);

    // Create the buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const button1 = document.createElement("button");
    button1.innerText = "MC";
    button1.setAttribute('title', 'Clear Memory Item');
    buttonsContainer.appendChild(button1);

    button1.addEventListener("click", () => { // xóa tại vị trí đó
      arr.splice(i, 1);
      updateMemory();
    });

    const button2 = document.createElement("button");
    button2.innerText = "M+";
    button2.setAttribute('title', 'Add To Memory Item');
    buttonsContainer.appendChild(button2);

    button2.addEventListener("click", () => { // cộng dồn tại vị trí đó
      const chuyenSo = screen.innerHTML
      arr[i] += parseFloat(chuyenSo);
      updateMemory();
    });

    const button3 = document.createElement("button");
    button3.innerText = "M-";
    button3.setAttribute('title', 'Subtract From Memory Item');
    buttonsContainer.appendChild(button3);

    button3.addEventListener("click", () => { // tru dồn tại vị trí đó
      const chuyenSo = screen.innerHTML
      arr[i] -= parseFloat(chuyenSo);
      updateMemory();
    });

    buttonsContainer.style.display = "none";
    memoryItem.appendChild(buttonsContainer);

    memoryItem.addEventListener("mouseover", function () {
      buttonsContainer.style.display = "block";
    });

    memoryItem.addEventListener("mouseout", function () {
      buttonsContainer.style.display = "none";
    });

    text.appendChild(memoryItem);
  }
}

// Nút CE
clearAll.addEventListener('click', function () {
  ClearAll();
});
// Nút C
clear.addEventListener('click', function () {
  ClearMan();
});

// khi cộng dồn các số vào r , giả sử - cho 1 số nào đó => phải đặt cái sổ ở MÀN CHÍNH làm số thứ nhất => phải lược cho các toán tử còn lại
// nhưng mà toán tử nằm ở operator thì nếu mà chỉnh + - * / thì sẽ bị lỗi
// Chỉnh ở phía các toán tử + - * / , với mỗi hàm truyền vào 1 toán tử , nếu khác toán tử đó thì set nó = sothunhat
// text.innerHTML = "There's nothing saved in memory";
