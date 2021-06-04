function SinhVien(masv, tensv, loaisv, dtoan, dly, dhoa, drenluyen) {
    this.maSinhVien = masv;
    this.tenSinhVien = tensv;
    this.loaiSinhVien = loaisv;
    this.diemToan = dtoan;
    this.diemLy = dly;
    this.diemHoa = dhoa;
    this.diemRenLuyen = drenluyen;

    this.diemTrungBinh = function () {
        return (this.diemToan + this.diemHoa + this.diemLy) / 3;
    }
    this.xepLoai = function () {
        if (this.diemRenLuyen < 5) {
            return "Yeu";
        }
        if (this.diemTrungBinh() < 5) {
            return "Yeu";
        }
        if (this.diemTrungBinh() <= 6.5) {
            return "Trung binh";
        }
        if (this.diemTrungBinh() <= 7) {
            return "Trung binh kha";
        }
        if (this.diemTrungBinh() <= 8) {
            return "Kha";
        }
        if (this.diemTrungBinh() <= 9) {
            return "Gioi";
        }
        if (this.diemTrungBinh() <= 10) {
            return "Xuat sac";
        }


    }
}