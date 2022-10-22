import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchSinhVien, themVaCapNhatSV } from '../redux/actions/SinhVienAction'

class FormSinhVien extends Component {
    state = {
        sinhVien: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: ''
        },
        error: {
            maSV: '',
            hoTen: '',
            soDienThoai: '',
            email: ''
        },
        isValid: true
    }
    // -------------------------- Validation --------------------------
    kiemTraRong = (value, error, name, title) => {
        if (value !== "") {
            error[name] = ''
            return true;
        }
        error[name] = `${title} không được rỗng !!`;
        return false
    }
    kiemTraDinhDang = (value, error, name, title, regex) => {
        if (value.match(regex)) {
            error[name] = ''    
            return true;
        }
        error[name] = `${title} không đúng định dạng !!`;
        return false
    }
    // ---------------------------------------------------------------
    handleSubmit = (event) => {
        event.preventDefault()
        let { maSV, hoTen, soDienThoai, email } = this.state.sinhVien
        if (maSV !== '' && hoTen !== '' && soDienThoai !== '' && email !== '' && this.state.isValid == true) {
            this.props.dispatch(themVaCapNhatSV(this.state.sinhVien))
            this.setState({
                sinhVien: {
                    maSV: '',
                    hoTen: '',
                    soDienThoai: '',
                    email: ''
                }
            })
        }
    }
    handleChangeInput = (event) => {
        let { name, title, value } = event.target
        let { sinhVien, isValid, error } = this.state
        // Vì trong quá trình validation, isValid có thể sẽ mang giá trị false, và setState isValid = false 
        // -> lần OnChange tiếp theo ko thể thay đổi isValid = true được (do cơ chế &= , chỉ true khi cả 2 đều true, mà có 1 false mẹ ròi -> auto false -> ko submit đc)
        // Do đó mỗi lần OnChage thì trước tiên set isValid = true trước
        isValid = true
        // Kiem tra maSV (ko có khoảng cách, ko đc rỗng)
        if (name == 'maSV'){
            isValid &= this.kiemTraRong(value, error, name, title)  && this.kiemTraDinhDang(value, error, name, title,/^\S*$/)
        }
        // kiem tra email (phải đúng định dạng email, ko đc rỗng)
        if(name == 'email'){
            isValid &= this.kiemTraRong(value, error, name, title) && this.kiemTraDinhDang(value, error, name, title,/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
        }
        // kiem tra ho ten (Tên tiếng việt hoặc ko dấu, ko đc có số và ký tự đặc biệt, ko đc rỗng)
        if(name == 'hoTen'){
            isValid &= this.kiemTraRong(value, error, name, title) && this.kiemTraDinhDang(value, error, name, title,"^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")
        }
        // kiem tra so dien thoai (phải là số, ko đc rỗng)
        if(name == 'soDienThoai'){
            isValid &= this.kiemTraRong(value, error, name, title) && this.kiemTraDinhDang(value, error, name, title,/^[0-9]+$/)
        }
        sinhVien[name] = value
        this.setState({
            sinhVien,
            error,
            isValid
        })
    }
    handleSearch = (event) => {
        let {value} = event.target
        this.props.dispatch(searchSinhVien(value))
    }
    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.isUpdate && currentState.sinhVien.maSV !== newProps.sinhVienCapNhat.maSV) {
            currentState.sinhVien = { ...newProps.sinhVienCapNhat }
        }
        return { ...currentState }
    }
    render() {
        let { maSV, hoTen, soDienThoai, email } = this.state.sinhVien
        let { isUpdate } = this.props
        return (
            <div className='mt-3'>
                <div className='p-2 bg-dark p-3'>
                    <h5 className='text-white font-bold m-0'>Thông tin sinh viên</h5>
                </div>
                <form className='row mt-3' onSubmit={this.handleSubmit}>
                    <div className="col-6">
                        <label >Mã sinh viên<nav></nav></label>
                        <input disabled={`${isUpdate ? true : ''}`} onChange={this.handleChangeInput} title="Mã SV" name='maSV' className="form-control" value={maSV} />
                        <small className="text-danger">{this.state.error.maSV}</small>
                    </div>

                    <div className="col-6">
                        <label >Họ tên</label>
                        <input onChange={this.handleChangeInput} title="Họ tên" name='hoTen' className="form-control" value={hoTen} />
                        <small className="text-danger">{this.state.error.hoTen}</small>
                    </div>
                    <div className="col-6">
                        <label >Số điện thoại</label>
                        <input onChange={this.handleChangeInput} title="Số điện thoại" name='soDienThoai' className="form-control" value={soDienThoai} />
                        <small className="text-danger">{this.state.error.soDienThoai}</small>
                    </div>
                    <div className="col-6">
                        <label >Email</label>
                        <input onChange={this.handleChangeInput} title="Email" name='email' className="form-control" value={email} />
                        <small className="text-danger">{this.state.error.email}</small>
                    </div>
                    <div className='col-12'>
                        <div className='text-center'>
                            <button style={{ display: isUpdate? 'none' : '' }} className="btn btn-primary m-3 px-5">Thêm sinh viên</button>
                            <button style={{ display: isUpdate? '' : 'none' }} className="btn btn-warning m-3 px-5">Cập nhật</button>
                        </div>
                    </div>
                </form>
                <div className='text-center my-4'>
                    <h5>Tìm kiếm theo tên: </h5>
                    <input onChange={this.handleSearch} title="search" name='search' className="w-50 form-control mx-auto" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUpdate: state.SinhVienReducer.isUpdate,
        sinhVienCapNhat: state.SinhVienReducer.sinhVienCapNhat,
        danhSachSinhVien: state.SinhVienReducer.danhSachSinhVien
    }
}

export default connect(mapStateToProps)(FormSinhVien)   