const equal = document.querySelector(".equal");
const plus = document.querySelector(".plus");
const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clearAll");
const del = document.querySelector(".del");
const signToggle = document.querySelector(".sign-toggle");
const seconScreen = document.querySelector(".small");
const demical = document.querySelector(".demical");
const addMemory = document.querySelector(".addMemory");
const local = document.querySelector(".localStorage");

let soThuNhat = 0;
let soThuHai = 0;
let toanTuHienTai = null; // Là tất cả các phép tính 
let manChinh = "";  // màn hình chính
let manPhu = ""; // màn hình phụ
let isNum1 = false;
let isNum2 = false;
let isOperator = false; // Là + - * /
let isResult = false;
let toanTu = true;
let dauBang = true;
let history = [];

// click số
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function (e) {
    let a = parseInt(e.target.innerHTML);
    if (isResult) {
      ClearMan();
      isResult = false;
    }
    if (isOperator === false) {
      SoDau(a);
      console.log(soThuNhat);
    } else {
      SoCuoi(a);
      console.log(soThuHai);
    }
  });
}
// click toán tử
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (e) {
    const operator = e.target.textContent.trim(); // Bỏ khoảng trắng
    toanTu;
    switch (operator) {
      case 'x2':
        Pow(); // bình phương
        break;
      case '1/x':
        console.log("suscess");
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
        isOperator = true; // Cập nhật trạng thái
        toanTuHienTai = operator; // Lưu toán tử
        console.log(operator);
        ClearMan(); // Xóa Màn Hình
        break;
    }
    manHinhPhu();
  });
}
// thêm vào lịch sử
addMemory.addEventListener('click' , function(e){
  if(e.target.textContent === 'M+'){
    addToHistory(soThuNhat , operators ,soThuHai);
  }
})
// in ra lịch sử
local.addEventListener("click", function () {
  if (history.length > 0) {
    console.log("History:");
    for (let i = 0; i < history.length; i++) {
      console.log(`${history[i].num1} ${history[i].operator} ${history[i].num2} = ${history[i].result}`);
    }
  } else {
    console.log("No history available.");
  }
});
//  Add ptu vao mang
function addToHistory(num1, operator, num2, result) {
  history.push({
      num1: num1,
      operator: operator,
      num2: num2,
      result: result
  });
}
// Nút bằng
equal.addEventListener('click', function (e) {
  if (toanTuHienTai && isOperator && soThuHai !== null) {
    let dauBang;
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
    manHinhPhu();
    addToHistory(soThuNhat, toanTuHienTai, soThuHai, result);
  }
});


// Nút Del
del.addEventListener('click', function () {
  if (manChinh.length > 0) {
    manChinh = manChinh.slice(0, -1);
    screen.innerHTML = manChinh;
    if (manChinh !== "") {
      soThuNhat = parseInt(manChinh);
    } else {
      soThuNhat = 0;
      isOperator = false;
    }
  }
});
// Nút demical
demical.addEventListener('click', function (e) {
  const demi = e.target.textContent;
  console.log(demi);
  if (!manChinh.includes(',')) {
    manChinh += ',';
    screen.innerHTML = manChinh;
  }
});
// Nút CE
clearAll.addEventListener('click', function () {
  ClearAll();
});

// Nút C
clear.addEventListener('click', function () {
  ClearMan();
});

// Số Đầu 
function SoDau(num) {
  manChinh += `${num}`;
  manChinh = manChinh.replace(',', '.'); 
  screen.innerHTML = manChinh;
  soThuNhat = parseFloat(manChinh); 
  isNum1 = true;
}
// Số Cuối
function SoCuoi(num) {
  if (isOperator === true) {
    manChinh += `${num}`;
    manChinh = manChinh.replace(',', '.'); 
    screen.innerHTML = manChinh;
    soThuHai = parseFloat(manChinh);
    isNum2 = true;
  }
}

function manHinhPhu() {
  if (toanTuHienTai && isOperator && soThuHai !== null) {
    manPhu = `${tong - soThuNhat} ${toanTuHienTai} ${soThuHai} =`;
    seconScreen.innerHTML = manPhu;
  } else if (isOperator) {
    manPhu = `${soThuNhat} ${toanTuHienTai}`;
    seconScreen.innerHTML = manPhu;
  } else {
    manPhu = `${soThuNhat}`;
    seconScreen.innerHTML = manPhu;
  }
}

// Xóa màn hình
function ClearMan() {
  manChinh = '';
  screen.innerHTML = '';

}

function ClearAll() {
  ClearMan();
  manPhu = '';
  seconScreen.innerHTML = '';
  soThuNhat = 0;
  soThuHai = null;
  toanTuHienTai = null;
  isNum1 = false;
  isNum2 = false;
  isOperator = false;
}
// Phép Cộng
function Cong() {
  const tong = soThuNhat + soThuHai;
  screen.innerHTML = tong;
  manChinh = tong.toString();
  soThuNhat = tong
  isResult = true; // Đánh dấu rằng kết quả cuối cùng đã được tính
  return tong;
}

// Phép Trừ
function Tru() {
  const hieu = soThuNhat - soThuHai;
  screen.innerHTML = hieu;
  manChinh = hieu.toString();
  soThuNhat = hieu;
  isResult = true; // Đánh dấu rằng kết quả cuối cùng đã được tính
  return hieu;
}

// Phép Nhân
function Nhan() {
  const tich = soThuNhat * soThuHai;
  screen.innerHTML = tich;
  manChinh = tich.toString();
  soThuNhat = tich;
  isResult = true; // Đánh dấu rằng kết quả cuối cùng đã được tính
  return tich;
}

// Phép Chia
function Chia() {
  console.log(soThuHai);
  if (soThuHai !== 0) {
    const thuong = soThuNhat / soThuHai;
    screen.innerHTML = thuong;
    manChinh = thuong.toString();
    soThuNhat = thuong;
    isResult = true; // Đánh dấu rằng kết quả cuối cùng đã được tính
  } else {
    screen.innerHTML = "Error"; // Xử lý khi chia cho 0
    manChinh = "";
  }
}

// Phần Trăm
function PhanTram() {
  const phanTram = soThuNhat / 100;
  screen.innerHTML = phanTram;
  soThuNhat = phanTram;
  return phanTram;
}

// Bình Phương
function Pow() {
  if (isResult) {
    // Nếu kết quả đã được tính, áp dụng bình phương cho kết quả đó
    let ketQua = parseFloat(screen.innerHTML);
    if (ketQua < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      ketQua = Math.pow(ketQua, 2);
      screen.innerHTML = ketQua;
      manChinh = ketQua.toString();
      soThuNhat = ketQua; // Cập nhật lại soThuNhat với kết quả mới bình phương
      isResult = false; // Sau khi bình phương, không còn là kết quả cuối nữa
    }
  } else {
    const soHienTai = parseFloat(manChinh);
    if (soHienTai < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      const binhPhuong = Math.pow(soHienTai, 2);
      screen.innerHTML = binhPhuong;
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
  if (isResult) {
    // Nếu kết quả đã được tính, áp dụng căn bậc hai cho kết quả đó
    let ketQua = parseFloat(screen.innerHTML);
    if (ketQua < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      ketQua = Math.sqrt(ketQua);
      screen.innerHTML = ketQua;
      manChinh = ketQua.toString();
      soThuNhat = ketQua; // Cập nhật lại soThuNhat với kết quả mới căn bậc hai
      isResult = false; // Sau khi căn bậc hai, không còn là kết quả cuối nữa
    }
  } else {
    const soHienTai = parseFloat(manChinh);
    if (soHienTai < 0) {
      screen.innerHTML = "Undefined";
      manChinh = "";
    } else {
      const can = Math.sqrt(soHienTai);
      screen.innerHTML = can;
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
  if (isResult) {
    // Nếu kết quả đã được tính, áp dụng nghịch đảo cho kết quả đó
    let ketQua = parseFloat(screen.innerHTML);
    if (ketQua === 0) {
      screen.innerHTML = "Error"; // Không thể chia cho 0
      manChinh = "";
    } else {
      ketQua = 1 / ketQua;
      screen.innerHTML = ketQua;
      manChinh = ketQua.toString();
      soThuNhat = ketQua; // Cập nhật lại soThuNhat với kết quả mới nghịch đảo
      isResult = false; // Sau khi nghịch đảo, không còn là kết quả cuối nữa
    }
  } else {
    const soHienTai = parseFloat(manChinh);
    if (soHienTai === 0) {
      screen.innerHTML = "Error"; // Không thể chia cho 0
      manChinh = "";
    } else {
      const nghichDao = 1 / soHienTai;
      screen.innerHTML = nghichDao;
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
  if (isResult) {
    // Nếu kết quả đã được tính, áp dụng đổi dấu cho kết quả đó
    let ketQua = parseFloat(screen.innerHTML);
    ketQua = -ketQua;
    screen.innerHTML = ketQua;
    manChinh = ketQua.toString();
    soThuNhat = ketQua; // Cập nhật lại soThuNhat với kết quả mới đổi dấu
    isResult = false; // Sau khi đổi dấu, không còn là kết quả cuối nữa
  } else {
    // Nếu chưa tính kết quả, áp dụng đổi dấu cho số hiện tại
    const soHienTai = parseFloat(manChinh);
    if (!isNaN(soHienTai)) {
      const doiDau = soHienTai * -1;
      screen.innerHTML = doiDau;
      manChinh = doiDau.toString();
      if (isOperator) {
        soThuHai = doiDau;
      } else {
        soThuNhat = doiDau;
      }
    }
  }
}
