const $ = document.querySelector.bind(document);
let listSinhVien = [];

$("#show-themsv-modal").onclick = function () {
    showAddForm();
}
getSinhVienAPI();

// hien thi danh sach sinh vien
function getSinhVienAPI() {
    let promise = axios({
        url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien",
        method: "GET",
    })

    promise.then(function (result) {
        listSinhVien = [];
        for (let i = 0; i < result.data.length; i++) {
            let item = result.data[i];
            let sv = new SinhVien(item.maSinhVien, item.tenSinhVien, item.loaiSinhVien, item.diemToan, item.diemLy, item.diemHoa, item.diemRenLuyen);
            listSinhVien.push(sv);
        }
        renderSinhVienTable();
    })
}
function renderSinhVienTable() {
    $("#ds-sinhvien tbody").innerHTML = "";
    for (let i = 0; i < listSinhVien.length; i++) {
        let sv = listSinhVien[i];
        $("#ds-sinhvien tbody").innerHTML += `
        <tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.loaiSinhVien}</td>
            <td>${sv.diemTrungBinh()}</td>
            <td>${sv.diemRenLuyen}</td>
            <td>${sv.xepLoai()}</td>
            <td>
                <div class="d-flex">
                    <button class="btn btn-warning btn-sm rounded-0" onclick="showUpdateForm('${sv.maSinhVien}')"><small>Sửa</small></button>
                    <button class="btn btn-danger btn-sm rounded-0"  onclick="deleteSinhVien('${sv.maSinhVien}')"><small>Xóa</small></button>
                </div>
                
            </td>
        </tr>
    `
    }
}
// ============

// Khi bam vao nut them
function showAddForm() {
    $("#themsv_container").style.display = "block";
    $("#updatesv_container").style.display = "none";
    $("#themsv_form").onsubmit = function (e) {
        e.preventDefault();
        addSinhVien();
    }
}

function addSinhVien() {
    const svAdd =
    {
        "maSinhVien": $("#masv").value,
        "tenSinhVien": $("#tensv").value,
        "loaiSinhVien": $("#loaisv").value,
        "diemToan": $("#dtoan").value,
        "diemLy": $("#dly").value,
        "diemHoa": $("#dhoa").value,
        "diemRenLuyen": $("#drenluyen").value,
        "email": $("#email").value
    }
    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien`,
        method: "POST",
        data: svAdd
    })
    promise.then(function (result) {
        getSinhVienAPI();
        ;
        let toastElement = $("#toastElement");
        let toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        $("#toast_body").innerHTML = result.data;
        toast.show();
    })
}
// =========

// Khi bam vao nut sua
function showUpdateForm(masv) {
    $("#themsv_container").style.display = "none";
    $("#updatesv_container").style.display = "block";

    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien/?maSinhVien=${masv}`,
        method: "GET",
    })
    promise.then(function (result) {
        showValueUpdateForm(result.data);
    })
    promise.catch(function (err) {
        console.log(err);
    })
}
function showValueUpdateForm(sv) {
    $("#masv_update").value = sv.maSinhVien;
    $("#tensv_update").value = sv.tenSinhVien;
    $("#email_update").value = sv.email;
    $("#loaisv_update").value = sv.loaiSinhVien;
    $("#dtoan_update").value = sv.diemToan;
    $("#dly_update").value = sv.diemLy;
    $("#dhoa_update").value = sv.diemHoa;
    $("#drenluyen_update").value = sv.diemRenLuyen;

    $("#updatesv_form").onsubmit = function (e) {
        e.preventDefault();
        updateSinhVien();
    }
}
function updateSinhVien() {
    const masv = $("#masv_update").value
    const svUpdate =
    {
        "tenSinhVien": $("#tensv_update").value,
        "loaiSinhVien": $("#loaisv_update").value,
        "diemToan": $("#dtoan_update").value,
        "diemLy": $("#dly_update").value,
        "diemHoa": $("#dhoa_update").value,
        "diemRenLuyen": $("#drenluyen_update").value,
        "email": $("#email_update").value
    }
    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien/?maSinhVien=${masv}`,
        method: "PUT",
        data: svUpdate
    })
    promise.then(function (result) {
        getSinhVienAPI();
        alert(result.data)
    })
    promise.catch(function (err) {
        alert(err)
    })
}

// ========


// Khi bam vao nut delete sinh vien
function deleteSinhVien(masv) {
    let promise = axios({
        url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien/?maSinhVien=${masv}`,
        method: "DELETE"
    })
    promise.then(function (result) {
        alert(result.data);
        getSinhVienAPI();
    })
    promise.catch(function (err) {
        alert(err);
    })
}
//






