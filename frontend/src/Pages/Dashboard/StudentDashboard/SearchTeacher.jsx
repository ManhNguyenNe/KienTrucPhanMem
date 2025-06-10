import React, { useState } from 'react'
import Search from '../../Components/Searchbtn/Search'

function SearchTeacher() {
  const [popup, SetPopup] = useState(false);
  return (
    <div className='ml-56'>
        <Search/>
        {popup && (
          <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-[#5be0de] w-[70vw] px-14 py-10 rounded-sm'>
              {/* <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div> */}

              <p className='text-3xl'>Form đánh giá</p>
              <p className=' border-b-2 py-2'>Giúp chúng tôi cải thiện qua form này. Cảm ơn!</p>

              <div className='flex flex-col gap-3 my-5 pb-5 border-b-2'>
                <label>Giáo viên</label>
                <input type="text" className='p-2'  placeholder='Teacher / Instructor Name'/>
                <label>Tên khoá học</label>
                <input type="text" className='p-2'  placeholder='Course Name'/>
                <label>Đánh giá của bạn</label>
                <input type="text" className='p-2'  placeholder=''/>
              </div>

              <p className='font-bold'>Đánh giá: </p>
              
              <div className='my-3'>
                <div className='flex gap-1'>
                  <p className='mr-[1.65rem]'>Chất lượng giáo viên</p>
                  <input name="group" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Rất tốt</label>
                  <input name="group" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Tốt</label>
                  <input name="group" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Bình thường</label>
                  <input name="group" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Tệ</label>
                  <input name="group" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Rất tệ</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-4'>Kiến thức bộ môn</p>
                  <input name="group-0" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Rất tốt</label>
                  <input name="group-0" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Tốt</label>
                  <input name="group-0" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Bình thường</label>
                  <input name="group-0" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Tệ</label>
                  <input name="group-0" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Rất tệ</label>
                </div>
                <div className='flex gap-1 mt-1'>
                  <p className='mr-[5.48rem]'>Mức độ truyền đạt</p>
                  <input name="group-1" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Rất tốt</label>
                  <input name="group-1" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Tốt</label>
                  <input name="group-1" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Bình thường</label>
                  <input name="group-1" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Tệ</label>
                  <input name="group-1" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Rất tệ</label>
                </div>

              </div>

              <div className='py-3'>
                <p className='pb-3'>Bạn có giới thiệu với các học sinh khác?</p>
                <input name="radio-group" type="radio" id='one'/> <label htmlFor='one'>Có</label>
                <input name="radio-group" type="radio" id='two' className='ml-5'/> <label htmlFor='two'>Không</label>
              </div>

              <div className='flex justify-center'>
                <button className='w-[10rem]'>Gửi</button>
              </div>
              
            </div>
          </div>
        )}
    </div> 
  )
}

export default SearchTeacher