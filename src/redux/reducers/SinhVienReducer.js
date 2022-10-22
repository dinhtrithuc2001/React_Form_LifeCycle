import { LAY_SINH_VIEN, THEM_CAPNHAT_SINH_VIEN, XOA_SINH_VIEN,SEARCH_SINH_VIEN } from "../type/SinhVienType"
const stateDefault = {
    danhSachSinhVien: [],
    sinhVienCapNhat: '',
    isUpdate: false,
    keyword: ''
}

export const SinhVienReducer = (state = stateDefault, action) => {
    let { type, sinhVien, keyword } = action
    switch (type) {
        case THEM_CAPNHAT_SINH_VIEN: {
            let danhSachSinhVien = [...state.danhSachSinhVien]
            if (!state.isUpdate) {
                let sinhVienNew = danhSachSinhVien.find(item => item.maSV === sinhVien.maSV)
                if (!sinhVienNew) {
                    danhSachSinhVien.push(sinhVien)
                }
                else {
                    alert('Sinh viên đã tồn tại')
                }
            }
            else {
                let index = danhSachSinhVien.findIndex(item => item.maSV === sinhVien.maSV)
                if(index !== -1){
                    danhSachSinhVien[index] = sinhVien
                }
                state.isUpdate = false
            }
            return { ...state, danhSachSinhVien }
        }
        case XOA_SINH_VIEN: {
            let danhSachSinhVien = [...state.danhSachSinhVien]
            danhSachSinhVien = danhSachSinhVien.filter(item => item.maSV !== sinhVien.maSV)
            return { ...state, danhSachSinhVien, isUpdate: false }
        }
        case LAY_SINH_VIEN: {
            state.sinhVienCapNhat = sinhVien
            return {...state, isUpdate: true}
        }
        case SEARCH_SINH_VIEN: {
            state.keyword = keyword
            return {...state}
        }
        default: {
            return { ...state }
        }
    }
}