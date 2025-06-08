import React from 'react'
import Email from '../../Images/email.svg'
import { NavLink } from "react-router-dom"
import Header from '../../Home/Header/Header'

function VarifyEmail() {
  return (
    <>
    <Header/>
    <div className='flex justify-center'>
        <div className='bg-blue-gray-900 w-96 h-96  rounded-md flex flex-col gap-5 justify-center items-center mt-10'>
            <img src={Email} width={150} alt="email" />
            <p className='text-white text-3xl'>Gửi mail thành công</p>
            <p className='text-gray-300 mx-7 text-sm'>Chúng tôi đã gửi một liên kết xác thực đến Email của bạn. Vui lòng nhấp vào liên kết để hoàn tất quá trình xác thực. Kiểm tra spam nếu không thấy.</p>
            <NavLink to='/login'>
                <p className=' text-blue-700'>◀ Quay về trang chủ</p>
            </NavLink>
        </div>
    </div>
    </>
  )
}

export default VarifyEmail