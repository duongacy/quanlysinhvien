renderTableSinhVien();
document.querySelector("#themsv-btn").onclick = function (e) {
    e.preventDefault();
    // if (validateRequired()) {
    themSVLocal();
    renderTableSinhVien();
    // }

}

function renderTableSinhVien() {
    let listSVObject = layDanhSachSVTuLocal();
    document.querySelector("#ds-sinhvien tbody").innerHTML = "";
    for (let i = 0; i < listSVObject.length; i++) {
        let item = listSVObject[i];
        document.querySelector("#ds-sinhvien tbody").innerHTML += `
            <tr>
                <td>${item.maSinhVien}</td>
                <td>${item.tenSinhVien}</td>
                <td>${item.loaiSinhVien}</td>
                <td>${item.diemTrungBinh()}</td>
                <td>${item.diemRenLuyen}</td>
                <td>${item.xepLoai()}</td>
                <td>
                    <button class="sua-btn">Sửa</button><button class="xoa-btn"  onclick="xoaSVLocal('${item.maSinhVien}')">Xóa</button>
                </td>
            </tr>
        `
    }
}

function layDanhSachSVTuLocal() {
    const listSVObject = [];
    let listSV = [];
    if (localStorage.getItem("listSVLocal")) {
        listSV = JSON.parse(localStorage.getItem("listSVLocal"));
    }

    for (let i = 0; i < listSV.length; i++) {
        let item = listSV[i];
        listSVObject.push(new SinhVien(item.masv, item.tensv, item.loaisv, item.dtoan, item.dly, item.dhoa, item.drenluyen));
    }
    return listSVObject;
}



function themSVLocal() {
    let validate = new Validation();
    let listSV = [];
    let masv = document.querySelector("#masv").value;
    let tensv = document.querySelector("#tensv").value;
    let loaisv = document.querySelector("#loaisv").value;
    let dtoan = Number(document.querySelector("#dtoan").value);
    let dly = Number(document.querySelector("#dly").value);
    let dhoa = Number(document.querySelector("#dhoa").value);
    let drenluyen = Number(document.querySelector("#drenluyen").value);

    if (validateRequired() && validate.kiemTraString(tensv)
        // && validate.kiemTraString(masv) && validate.kiemTraString(tensv) && validate.kiemTraNumber(dtoan) && validate.kiemTraNumber(dly) && validate.kiemTraNumber(dhoa) && validate.kiemTraNumber(drenluyen)
    ) {
        let sv = {
            masv: masv,
            tensv: tensv,
            loaisv: loaisv,
            dtoan: dtoan,
            dly: dly,
            dhoa: dhoa,
            drenluyen: drenluyen
        };
        if (localStorage.getItem("listSVLocal")) { // neu da ton tai trong local thi lay ra
            listSV = JSON.parse(localStorage.getItem("listSVLocal"));
        }

        listSV.push(sv); //Luu sinh vien vao mang
        localStorage.setItem("listSVLocal", JSON.stringify(listSV)); // update sinh vien vao local
    } else {
        console.log("xxx");
    }



}
function xoaSVLocal(masv) {
    listSV = JSON.parse(localStorage.getItem("listSVLocal"));
    for (let i = listSV.length - 1; i >= 0; i--) {
        if (listSV[i].masv == masv) {
            listSV.splice(i, 1);
        }
    }
    localStorage.setItem("listSVLocal", JSON.stringify(listSV));
    renderTableSinhVien();
}

function validateRequired() {
    let flag = true;
    const listRequired = document.querySelectorAll(".required");
    listRequired.forEach(function (item) {
        if (item.value.trim() === "") {
            item.style.borderColor = "red";
            flag = false;
        }
    })
    return flag;
}

function Validation() {
    this.kiemTraNumber = function (value) {
        return /^[0-9]+$/.test(value);
    }
    this.kiemTraString = function (value) {
        var result = /^[a-z A-Z]+$/.test(value)
        console.log(result);
        return result;
    }
    this.kiemTraEmail = function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }
}
