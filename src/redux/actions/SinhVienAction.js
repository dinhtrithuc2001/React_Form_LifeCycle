import {LAY_SINH_VIEN, SEARCH_SINH_VIEN, THEM_CAPNHAT_SINH_VIEN, XOA_SINH_VIEN} from '../type/SinhVienType'

export const themVaCapNhatSV = (sinhVien) => {
    return {
        type: THEM_CAPNHAT_SINH_VIEN,
        sinhVien
    }
}
export const xoaSV = (sinhVien) => {
    return {
        type: XOA_SINH_VIEN,
        sinhVien
    }
}
export const layThongTinSV = (sinhVien) => {
    return {
        type: LAY_SINH_VIEN,
        sinhVien
    }
}
export const searchSinhVien = (keyword) => {
    return {
        type: SEARCH_SINH_VIEN,
        keyword
    }
}