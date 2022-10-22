import React, { Component } from 'react'
import { connect } from 'react-redux'
import { layThongTinSV, xoaSV } from '../redux/actions/SinhVienAction.js';
class TableDanhSachSinhVien extends Component {
    renderFilterTable = (danhSachSinhVien) => {
        const danhSachSinhVienNew = danhSachSinhVien.filter(item => {
            if (this.props.keyword == '') {
                return item
            }
            else {
                let keyLower = this.props.keyword.toLocaleLowerCase()
                let itemLower = item.hoTen.toLocaleLowerCase()
                return itemLower.includes(keyLower)
                // return itemLower.indexOf(keyLower) !== -1
            }
        })
        return (
            danhSachSinhVienNew.map((item, index) => <tr key={index}>
                <td>{item.maSV}</td>
                <td>{item.hoTen}</td>
                <td>{item.soDienThoai}</td>
                <td>{item.email}</td>
                <td>
                    <button onClick={() => this.props.dispatch(layThongTinSV(item))} className='btn btn-success mr-2'>Sửa</button>
                    <button onClick={() => this.props.dispatch(xoaSV(item))} className='btn btn-danger'>Xóa</button>
                </td>
            </tr>)
        )

    }
    render() {
        let { danhSachSinhVien } = this.props
        return (
            <table className='table'>
                <thead>
                    <tr className='bg-dark text-white'>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderFilterTable(danhSachSinhVien)}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => {
    return {
        danhSachSinhVien: state.SinhVienReducer.danhSachSinhVien,
        keyword: state.SinhVienReducer.keyword
    }
}

export default connect(mapStateToProps)(TableDanhSachSinhVien)