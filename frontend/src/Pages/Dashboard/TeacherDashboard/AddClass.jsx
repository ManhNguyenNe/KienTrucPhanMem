import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DateTime from './DateTime';

function AddClass({ onClose }) {
  const { ID } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [CourseId, setCourseId] = useState('');
  const [allowedDays, setCurrData] = useState([]);

  // const DAY = [
  //   "Sunday",    
  //   "Monday",    
  //   "Tuesday",   
  //   "Wednesday", 
  //   "Thursday",  
  //   "Friday",    
  //   "Saturday"   
  // ];

  const DAY = [
    "Chủ nhật",    
    "Thứ hai",    
    "Thứ ba",   
    "Thứ tư", 
    "Thứ năm",  
    "Thứ sáu",    
    "Thứ bảy"   
  ];
  
  function setToMidnight(dateTimeString) {
    try {
      console.log("Processing date:", dateTimeString);
      
      // Create a new Date object from the input string
      let date = new Date(dateTimeString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
      }
      
      // Extract the time part
      let hours = date.getHours();
      let minutes = date.getMinutes();
      
      let totalMinutes = (hours * 60) + minutes;
      date.setHours(0, 0, 0, 0);
      let modifiedDateTimeString = date.toISOString();
      
      console.log("Date processing result:", {
        input: dateTimeString,
        hours,
        minutes,
        totalMinutes,
        modifiedDateTimeString
      });
      
      return [totalMinutes, modifiedDateTimeString];
    } catch (error) {
      console.error("Error in setToMidnight:", error);
      return null;
    }
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // console.log(response);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const res = await response.json();

        // console.log(res.data);
        setCourses(res.data);
        setCourseId(res.data[0]._id);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, [ID]); 

  useEffect(() => {
    const filteredData = courses.filter(course => course._id === CourseId);
    setCurrData(filteredData[0]?.schedule);
    // console.log("output:", filteredData[0]?.schedule);
  }, [CourseId]);
  

  const addCourses = async () => {
    console.log("Starting form submission with values:", {
      note,
      date,
      link,
      CourseId
    });

    // Kiểm tra các trường bắt buộc
    if (!note || !date || !link) {
      console.log("Validation failed:", {
        note: !note ? "Missing" : note,
        date: !date ? "Missing" : date,
        link: !link ? "Missing" : link
      });
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const currentDate = new Date();
    const givenDate = new Date(date);

    console.log("Date comparison:", {
      currentDate: currentDate.toISOString(),
      givenDate: givenDate.toISOString()
    });

    if (currentDate > givenDate) {
      alert('Vui lòng chọn ngày trong tương lai!');
      return;
    }

    try {
      const modifyDate = setToMidnight(date);
      console.log("Modified date:", modifyDate);

      if (!modifyDate || !Array.isArray(modifyDate) || modifyDate.length !== 2) {
        console.error("Invalid modifyDate:", modifyDate);
        throw new Error("Invalid date format");
      }

      // Kiểm tra và chuyển đổi timing thành số
      const timing = parseInt(modifyDate[0]);
      if (isNaN(timing)) {
        console.error("Invalid timing:", modifyDate[0]);
        throw new Error("Invalid timing format");
      }

      const data = {
        title: note.trim(),
        timing: timing,
        date: modifyDate[1],
        link: link.trim(),
        status: 'upcoming',
      };

      console.log("Submitting data:", data);

      // Kiểm tra dữ liệu trước khi gửi
      if (!data.title || !data.timing || !data.date || !data.link) {
        console.log("Invalid data:", data);
        throw new Error("Invalid data format");
      }

      const response = await fetch(`/api/course/${CourseId}/teacher/${ID}/add-class`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const res = await response.json();
      console.log("API Response:", res);

      if (!response.ok) {
        throw new Error(res.message || 'Failed to add class');
      }

      alert(res.message);
      if (res.statusCode === 200) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding class:", error);
      alert(error.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center'>
      <div className='w-[60%] h-[70%] bg-blue-gray-700 text-white rounded-md'>
        <div className='absolute w-9 h-9 bg-[#E2B659] rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
        
        <div className='flex justify-center mt-5 gap-10 border-b-2 py-5'>
          <p className='text-2xl'>Tạo lớp học</p>
          <select value={CourseId} onChange={(e) => setCourseId(e.target.value)} className='text-gray-900 rounded-md w-28 px-2 border-0 outline-0'>
            {courses && (
              courses.filter((course) => course.isapproved)
              .map((course) => (
                <option key={course._id} value={course._id}>{course.coursename.toUpperCase()} {'['} {course.schedule.map(day => DAY[day.day]).join(', ')} {']'}</option>
              ))
            )}
          </select>
        </div>

        <div className='flex items-center justify-around my-20 mx-5'>

          <div className='flex gap-5 text-black'>
            <label htmlFor="" className='text-xl text-white'>Ngày và giờ:</label>
            <DateTime setDate={setDate} allowedDays={allowedDays}/>
          </div>
        </div>

        <div className='m-10 flex items-center justify-center gap-20 mb-20'>
          <div className='flex gap-5'>
            <label htmlFor="" className='text-xl'>Link:</label>
            <input value={link} onChange={(e) => setLink(e.target.value)} type="url" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm' />
          </div>

          <div className='flex gap-5'>
            <label htmlFor="" className='text-xl'>Tiêu đề:</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} type="text" className='border-0 outline-0 text-gray-900 py-1 px-3 rounded-sm' />
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div onClick={addCourses} className='bg-[#E2B659] w-32 text-center py-2 rounded-sm text-brown-900 text-xl cursor-pointer'>Gửi</div>
        </div>
      </div>
    </div>
  );
}

export default AddClass;
