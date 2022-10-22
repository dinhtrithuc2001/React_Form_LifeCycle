import React, { Component } from 'react'
import FormSinhVien from './FormSinhVien'
import TableDanhSachSinhVien from './TableDanhSachSinhVien'

export default class BaiTapQuanLSinhVien extends Component {
  render() {
    return (
      <div className='container text-left text-lg'>
        <FormSinhVien />
        <TableDanhSachSinhVien />
      </div>
    )
  }
}
