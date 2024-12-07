// Mảng lưu trữ danh sách nhân viên
let danhSachNhanVien = [];

// Lấy danh sách nhân viên từ localStorage nếu có
if (localStorage.getItem("danhSachNhanVien")) {
    danhSachNhanVien = JSON.parse(localStorage.getItem("danhSachNhanVien"));
} else {
    danhSachNhanVien = [];
}
// Hiển thị danh sách nhân viên khi tải trang
hienThiDanhSachNhanVien();
// Hàm hiển thị danh sách nhân viên trong table
function hienThiDanhSachNhanVien() {
    let tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = "";

    danhSachNhanVien.forEach((nv, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
                <button class="btn btn-warning" onclick="capNhatNhanVien(${index})">Cập nhật</button>
                <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
            </td>
        `;
        tableDanhSach.appendChild(tr);
    });
}

// Hàm tạo đối tượng nhân viên từ form
function taoNhanVien() {
    let taiKhoan = document.getElementById("tknv").value;
    let hoTen = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ngayLam = document.getElementById("datepicker").value;
    let luongCB = document.getElementById("luongCB").value;
    let chucVu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;

    let loaiNhanVien = tinhLoaiNhanVien(gioLam);  // Hàm tính loại nhân viên (Full-time, Part-time, etc.)

    // Tạo đối tượng nhân viên
    let nhanVien = {
        taiKhoan,
        hoTen,
        email,
        password,
        ngayLam,
        luongCB,
        chucVu,
        gioLam,
        tongLuong: tinhTongLuong(luongCB, gioLam, chucVu),  // Hàm tính tổng lương
        loaiNhanVien
    };

    // Thêm nhân viên vào danh sách
    danhSachNhanVien.push(nhanVien);
    // Lưu danh sách nhân viên vào localStorage
    localStorage.setItem("danhSachNhanVien", JSON.stringify(danhSachNhanVien));

    hienThiDanhSachNhanVien();
}

// Hàm tính tổng lương
function tinhTongLuong(luongCB, gioLam, chucVu) {
    let tongLuong = 0;
    if (chucVu === "Sếp") {
        tongLuong = luongCB * gioLam * 1.5; // Tỉ lệ cho Giám đốc
    } else if (chucVu === "Trưởng phòng") {
        tongLuong = luongCB * gioLam * 1.2; // Tỉ lệ cho Trưởng Phòng
    } else {
        tongLuong = luongCB * gioLam; // Tỉ lệ cho Nhân Viên
    }
    return tongLuong;
}

// Hàm xác định loại nhân viên
function tinhLoaiNhanVien(gioLam) {
    if (gioLam >= 192) {
        return "Xuất sắc";
    } else if (gioLam >= 176) {
        return "Giỏi";
    } else if (gioLam >= 160) {
        return "Khá";
    }
    return "Trung bình";
}

// Hàm kiểm tra validation
function kiemTraValidation() {
    let isValid = true;

    // Kiểm tra tài khoản
    let taiKhoan = document.getElementById("tknv").value;
    let regexTaiKhoan = /^[0-9]{4,6}$/;
    if (!regexTaiKhoan.test(taiKhoan) || taiKhoan === "") {
        document.getElementById("tbTKNV").innerText = "Tài khoản phải từ 4-6 ký số!";
        isValid = false;
    } else {
        document.getElementById("tbTKNV").innerText = "";
    }
    console.log("Tài khoản hợp lệ:", regexTaiKhoan.test(taiKhoan));

    // Kiểm tra tên nhân viên
let hoTen = document.getElementById("name").value;
let regexTen = /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
if (!regexTen.test(hoTen) || hoTen === "") {
    document.getElementById("tbTen").innerText = "Tên nhân viên phải là chữ và không được để trống!";
    isValid = false;
} else {
    document.getElementById("tbTen").innerText = "";
}
console.log("Tên hợp lệ:", regexTen.test(hoTen));


    // Kiểm tra email
    let email = document.getElementById("email").value;
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email) || email === "") {
        document.getElementById("tbEmail").innerText = "Email không hợp lệ!";
        isValid = false;
    } else {
        document.getElementById("tbEmail").innerText = "";
    }
    console.log("Email hợp lệ:", regexEmail.test(email));

    // Kiểm tra mật khẩu
    let password = document.getElementById("password").value;
    let regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,10}$/;
    if (!regexPassword.test(password) || password === "") {
        document.getElementById("tbMatKhau").innerText = "Mật khẩu phải từ 6-10 ký tự, bao gồm ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt!";
        isValid = false;
    } else {
        document.getElementById("tbMatKhau").innerText = "";
    }
    console.log("Mật khẩu hợp lệ:", regexPassword.test(password));

    // Kiểm tra ngày làm
    let ngayLam = document.getElementById("datepicker").value;
    let regexNgayLam = /^\d{2}\/\d{2}\/\d{4}$/; // Định dạng mm/dd/yyyy
    if (!regexNgayLam.test(ngayLam) || ngayLam === "") {
        document.getElementById("tbNgay").innerText = "Ngày làm không hợp lệ, cần định dạng mm/dd/yyyy!";
        isValid = false;
    } else {
        document.getElementById("tbNgay").innerText = "";
    }
    console.log("Ngày làm hợp lệ:", regexNgayLam.test(ngayLam));

    // Kiểm tra lương cơ bản
    let luongCB = document.getElementById("luongCB").value;
    if (luongCB < 1000000 || luongCB > 20000000 || luongCB === "") {
        document.getElementById("tbLuongCB").innerText = "Lương cơ bản phải từ 1.000.000 - 20.000.000!";
        isValid = false;
    } else {
        document.getElementById("tbLuongCB").innerText = "";
    }
    console.log("Lương cơ bản hợp lệ:", luongCB >= 1000000 && luongCB <= 20000000);

    // Kiểm tra chức vụ
    let chucVu = document.getElementById("chucvu").value.trim();
const validChucVu = ["Sếp", "Trưởng phòng", "Nhân viên"];  // Đảm bảo giá trị trong mảng khớp chính xác
if (!validChucVu.includes(chucVu)) {
    document.getElementById("tbChucVu").innerText = "Chức vụ không hợp lệ!";
    isValid = false;
} else {
    document.getElementById("tbChucVu").innerText = "";
}
console.log("Chức vụ hợp lệ:", validChucVu.includes(chucVu));

    // Kiểm tra giờ làm
    let gioLam = document.getElementById("gioLam").value;
    if (gioLam < 80 || gioLam > 200 || gioLam === "") {
        document.getElementById("tbGiolam").innerText = "Giờ làm trong tháng phải từ 80 - 200!";
        isValid = false;
    } else {
        document.getElementById("tbGiolam").innerText = "";
    }
    console.log("Giờ làm hợp lệ:", gioLam >= 80 && gioLam <= 200);

    // Kết quả validation
    console.log("Tất cả điều kiện hợp lệ:", isValid);
    return isValid;
}


// Thêm nhân viên mới vào danh sách
document.getElementById("btnThemNV").addEventListener("click", function () {
    if (kiemTraValidation()) {
        taoNhanVien();  // Tạo nhân viên mới
        hienThiDanhSachNhanVien();  // Hiển thị danh sách nhân viên sau khi thêm
        // Reset form sau khi thêm nhân viên
        document.getElementById("tknv").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("datepicker").value = "";
        document.getElementById("luongCB").value = "";
        document.getElementById("chucvu").value = "Chọn chức vụ";
        document.getElementById("gioLam").value = "";
    }
});

// Cập nhật nhân viên
function capNhatNhanVien(index) {
    // Cập nhật thông tin nhân viên
    let nhanVien = danhSachNhanVien[index];
    document.getElementById("tknv").value = nhanVien.taiKhoan;
    document.getElementById("name").value = nhanVien.hoTen;
    document.getElementById("email").value = nhanVien.email;
    document.getElementById("password").value = nhanVien.password;
    document.getElementById("datepicker").value = nhanVien.ngayLam;
    document.getElementById("luongCB").value = nhanVien.luongCB;
    document.getElementById("chucvu").value = nhanVien.chucVu;
    document.getElementById("gioLam").value = nhanVien.gioLam;

    document.getElementById("btnCapNhat").style.display = "inline-block";
    document.getElementById("btnThemNV").style.display = "none";

    // Cập nhật thông tin khi nhấn nút Cập Nhật
    document.getElementById("btnCapNhat").onclick = function() {
        console.log("Nút Cập nhật đã được bấm!"); // Thêm log để kiểm tra
        if (kiemTraValidation()) {
            nhanVien.taiKhoan = document.getElementById("tknv").value;
            nhanVien.hoTen = document.getElementById("name").value;
            nhanVien.email = document.getElementById("email").value;
            nhanVien.password = document.getElementById("password").value;
            nhanVien.ngayLam = document.getElementById("datepicker").value;
            nhanVien.luongCB = document.getElementById("luongCB").value;
            nhanVien.chucVu = document.getElementById("chucvu").value;
            nhanVien.gioLam = document.getElementById("gioLam").value;
            nhanVien.loaiNhanVien = tinhLoaiNhanVien(nhanVien.gioLam);
            nhanVien.tongLuong = tinhTongLuong(nhanVien.luongCB, nhanVien.gioLam, nhanVien.chucVu);
            
            // Cập nhật danh sách nhân viên và lưu vào localStorage
            localStorage.setItem("danhSachNhanVien", JSON.stringify(danhSachNhanVien));
            hienThiDanhSachNhanVien();

            // Ẩn nút cập nhật và hiển thị nút thêm nhân viên
            document.getElementById("btnCapNhat").style.display = "none";
            document.getElementById("btnThemNV").style.display = "inline-block";
        }
    };
}


// Hàm xóa nhân viên khỏi danh sách
function xoaNhanVien(index) {
    // Xác nhận trước khi xóa
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        danhSachNhanVien.splice(index, 1);

        // Cập nhật danh sách sau khi xóa và lưu vào localStorage
        localStorage.setItem("danhSachNhanVien", JSON.stringify(danhSachNhanVien));

        hienThiDanhSachNhanVien();  // Hiển thị lại danh sách sau khi xóa
    }
}

// // Xử lý sự kiện tìm kiếm theo loại nhân viên
// document.getElementById("btnTimLoaiNV").addEventListener("click", function () {
//     let searchValue = document.getElementById("searchLoai").value.toLowerCase();
//     let filteredDanhSach = danhSachNhanVien.filter(nv => nv.loaiNhanVien.toLowerCase().includes(searchValue));

//     // Hiển thị danh sách tìm kiếm theo loại
//     let tableDanhSach = document.getElementById("tableDanhSach");
//     tableDanhSach.innerHTML = "";

//     filteredDanhSach.forEach((nv, index) => {
//         let tr = document.createElement("tr");
//         tr.innerHTML = `
//             <td>${nv.taiKhoan}</td>
//             <td>${nv.hoTen}</td>
//             <td>${nv.email}</td>
//             <td>${nv.ngayLam}</td>
//             <td>${nv.chucVu}</td>
//             <td>${nv.tongLuong}</td>
//             <td>${nv.loaiNhanVien}</td>
//             <td>
//                 <button class="btn btn-warning" onclick="capNhatNhanVien(${index})">Cập nhật</button>
//                 <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
//             </td>
//         `;
//         tableDanhSach.appendChild(tr);
//     });
// });

// Xử lý sự kiện hiển thị modal thêm nhân viên
document.getElementById("btnThem").addEventListener("click", function () {
    // Reset form khi mở modal
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("chucvu").value = "Chọn chức vụ";
    document.getElementById("gioLam").value = "";

    // Ẩn nút cập nhật và hiển thị nút thêm
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("btnThemNV").style.display = "inline-block";
});



