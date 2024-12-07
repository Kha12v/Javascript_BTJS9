//1. In danh sách nhân viên vào bảng
let danhSachNhanVien = [];

function hienThiDanhSachNhanVien(ds = danhSachNhanVien) { // Thêm tham số mặc định
    const tableDanhSach = document.getElementById("tableDanhSach");
    tableDanhSach.innerHTML = ds.map((nv, index) => `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.xepLoai()}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien(${index})">Xóa</button>
                <button class="btn btn-primary" onclick="suaNhanVien(${index})">Sửa</button>
            </td>
        </tr>
    `).join('');
}
//2. Thêm nhân viên mới
function themNhanVien() {
    const nhanVien = taoDoiTuongNhanVien();
    if (!nhanVien) return;

    danhSachNhanVien.push(nhanVien);
    hienThiDanhSachNhanVien();
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
modal.hide();
}
function resetForm() {
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("chucvu").value = "Chọn chức vụ";
    document.getElementById("gioLam").value = "";
    document.querySelectorAll(".sp-thongbao").forEach(el => el.innerText = "");
}

// Gọi resetForm khi đóng modal
document.getElementById("btnDong").addEventListener("click", resetForm);

function luuDanhSachNhanVien() {
    localStorage.setItem("danhSachNhanVien", JSON.stringify(danhSachNhanVien));
}

function taiDanhSachNhanVien() {
    const data = localStorage.getItem("danhSachNhanVien");
    if (data) danhSachNhanVien = JSON.parse(data);
    hienThiDanhSachNhanVien();
}

// Gọi khi khởi tạo
taiDanhSachNhanVien();

//3. Tạo đối tượng nhân viên từ form
function taoDoiTuongNhanVien() {
    const taiKhoan = document.getElementById("tknv").value.trim();
    const hoTen = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const matKhau = document.getElementById("password").value.trim();
    const ngayLam = document.getElementById("datepicker").value.trim();
    const luongCB = Number(document.getElementById("luongCB").value.trim());
    const chucVu = document.getElementById("chucvu").value.trim() || "";
    const gioLam = Number(document.getElementById("gioLam").value.trim());

    if (!validation(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam)) {
        return null;
    }

    return {
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam,
        tongLuong() {
            switch (this.chucVu) {
                case "Giám đốc": return this.luongCB * 3;
                case "Trưởng phòng": return this.luongCB * 2;
                case "Nhân viên": return this.luongCB;
                default: return 0;
            }
        },
        xepLoai() {
            if (this.gioLam >= 192) return "Xuất sắc";
            if (this.gioLam >= 176) return "Giỏi";
            if (this.gioLam >= 160) return "Khá";
            return "Trung bình";
        }
    };
}
//4. Validation
function validation(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
    const regexTaiKhoan = /^\d{4,6}$/;
    const regexTen = /^[a-zA-Z\s]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexMatKhau = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    let isValid = true;

    // Kiểm tra tài khoản
    if (!regexTaiKhoan.test(taiKhoan)) {
        document.getElementById("tbTKNV").innerText = "Tài khoản phải từ 4-6 ký số.";
        isValid = false;
    } else {
        document.getElementById("tbTKNV").innerText = "";
    }

    // Kiểm tra họ tên
    if (!regexTen.test(hoTen)) {
        document.getElementById("tbTen").innerText = "Họ tên chỉ được chứa chữ cái và khoảng trắng.";
        isValid = false;
    } else {
        document.getElementById("tbTen").innerText = "";
    }

    // Kiểm tra email
    if (!regexEmail.test(email)) {
        document.getElementById("tbEmail").innerText = "Email không đúng định dạng.";
        isValid = false;
    } else {
        document.getElementById("tbEmail").innerText = "";
    }

    // Kiểm tra mật khẩu
    if (!regexMatKhau.test(matKhau)) {
        document.getElementById("tbMatKhau").innerText = "Mật khẩu từ 6-10 ký tự, bao gồm ít nhất 1 chữ in hoa, 1 số và 1 ký tự đặc biệt.";
        isValid = false;
    } else {
        document.getElementById("tbMatKhau").innerText = "";
    }

    // Kiểm tra ngày làm
    if (!ngayLam || isNaN(Date.parse(ngayLam))) {
        document.getElementById("tbNgay").innerText = "Ngày làm không hợp lệ (định dạng: yyyy-mm-dd).";
        isValid = false;
    } else {
        document.getElementById("tbNgay").innerText = "";
    }

    // Kiểm tra lương cơ bản
    if (luongCB < 1000000 || luongCB > 20000000) {
        document.getElementById("tbLuongCB").innerText = "Lương cơ bản phải từ 1,000,000 đến 20,000,000.";
        isValid = false;
    } else {
        document.getElementById("tbLuongCB").innerText = "";
    }

    // Kiểm tra chức vụ
    if (!["Giám đốc", "Trưởng phòng", "Nhân viên"].includes(chucVu)) {
        document.getElementById("tbChucVu").innerText = "Chức vụ không hợp lệ.";
        isValid = false;
    } else {
        document.getElementById("tbChucVu").innerText = "";
    }

    // Kiểm tra giờ làm
    if (gioLam < 80 || gioLam > 200) {
        document.getElementById("tbGioLam").innerText = "Giờ làm phải từ 80 đến 200 giờ.";
        isValid = false;
    } else {
        document.getElementById("tbGioLam").innerText = "";
    }

    return isValid;
}


//5. Xóa nhân viên
function xoaNhanVien(index) {
    danhSachNhanVien.splice(index, 1);
    hienThiDanhSachNhanVien();
}
//6. Sửa nhân viên
function suaNhanVien(index) {
    const nv = danhSachNhanVien[index];

    document.getElementById("tknv").value = nv.taiKhoan;
    document.getElementById("name").value = nv.hoTen;
    document.getElementById("email").value = nv.email;
    document.getElementById("password").value = nv.matKhau;
    document.getElementById("datepicker").value = nv.ngayLam;
    document.getElementById("luongCB").value = nv.luongCB;
    document.getElementById("chucvu").value = nv.chucVu;
    document.getElementById("gioLam").value = nv.gioLam;

    document.getElementById("btnCapNhat").onclick = function () {
        capNhatNhanVien(index);
    };
}
//7. Cập nhật nhân viên
function capNhatNhanVien(index) {
    const nhanVien = taoDoiTuongNhanVien();
    if (!nhanVien) return;

    danhSachNhanVien[index] = nhanVien;
    hienThiDanhSachNhanVien();
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
modal.hide();

}
//8. Tìm nhân viên theo loại
function timNhanVienTheoLoai() {
    const loai = document.getElementById("searchName").value.trim();
    const ketQua = danhSachNhanVien.filter(nv => nv.xepLoai().toLowerCase() === loai.toLowerCase());
    hienThiDanhSachNhanVien(ketQua);
}
document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document.getElementById("btnTimNV").addEventListener("click", timNhanVienTheoLoai);

