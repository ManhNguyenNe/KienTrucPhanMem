import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import logo from "../../Images/logo.svg";

function Search() {
  const [data, setData] = useState("");
  const [course, setCourse] = useState([]);
  const [courseID, setCourseID] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const { ID } = useParams();
  const [openTM, setOpenTM] = useState(false);
  const [Tdec, setTeacherDetails] = useState(null);
  const [tname, setTname] = useState({});

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  // const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysName = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];


  const openTeacherDec = async(id,fname,lname,sub)=>{
    setTname({fname,lname,sub});

    const data = await fetch('/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : id}),
    })

    const res = await data.json();
    console.log(res.data);
    setTeacherDetails(res.data);
    setOpenTM(true);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/course/student/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const user = await response.json();
        setCourseID(user.data);
        console.log(user.data);
        setIdArray(prevIdArray => [...prevIdArray, ...user.data.map(res => res._id)]);
      } catch (error) {
        console.log(error.message)
      }
    };
    getData();
  }, []);
  

  const SearchTeacher = async (sub) => {
    const subject = sub.toLowerCase();
    const Data = await fetch(`/api/course/${subject}`);
    const response = await Data.json();
    if (response.statusCode === 200) {
      setCourse(response.data);
    }
    setData("");
  };

  const updateEnrolledCourses = async () => {
    try {
      const response = await fetch(`/api/course/student/${ID}/enrolled`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const user = await response.json();
      setCourseID(user.data);
      setIdArray(user.data.map(res => res._id));
      console.log("Updated enrolled courses:", user.data);
    } catch (error) {
      console.error("Error updating enrolled courses:", error);
    }
  };

  const handleEnroll = async (courseName, id) => {
    try {
      console.log("Starting enrollment process for course:", courseName, id);
      
      let check = await fetch(
        `/api/course/${courseName}/${id}/verify/student/${ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );
      const verifyRes = await check.json();
      console.log("Verification response:", verifyRes);

      if (verifyRes.statusCode === 200) {
        const enrollResponse = await fetch(
          `/api/course/${courseName}/${id}/add/student/${ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include'
          }
        );

        const enrollRes = await enrollResponse.json();
        console.log("Enrollment response:", enrollRes);
        
        if (enrollRes.statusCode === 200) {
          await updateEnrolledCourses();
          alert("Đăng ký khóa học thành công!");
        } else {
          alert(enrollRes.message || "Đăng ký khóa học thất bại");
        }
      } else {
        alert(verifyRes.message || "Không thể đăng ký khóa học này");
      }
    } catch (error) {
      console.error("Error in handleEnroll:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="search mb-4">
        <img
          src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
          width={30}
          alt=""
        />
        <input
          type="text"
          placeholder="VD: Math ..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="w-32" onClick={() => SearchTeacher(data)}>
          Tìm
        </button>
      </div>
      <div className="overflow-auto">
        {course &&
          course.map((Data) => (
            <div
              key={Data._id}
              className="relative bg-blue-600 p-4 gap-6 mb-3 flex  rounded-sm max-w-4xl h-20 items-start"
            >
              <div className="h-fit font-bold text-blue-900">
                {Data.coursename.toUpperCase()}
              </div>
              <div onClick={()=>openTeacherDec(Data.enrolledteacher.Teacherdetails, Data.enrolledteacher.Firstname, Data.enrolledteacher.Lastname, Data.coursename)} className="text-gray-300 cursor-pointer font-bold">
                {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
              </div>
              <div className="text-gray-900">
                <span className="text-black">Mô tả :</span> {Data.description}
              </div>
              <div>{Data.enrolledStudent.length}/20</div>
              { idArray.includes(Data._id) ? (
                <div onClick={()=> alert("Bạn đã đăng kí lớp học này!")}
                  className="text-white bg-green-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Đã đăng kí
                </div>
              ) : Data.enrolledStudent.length < 20 ? (
                <div
                  onClick={() => handleEnroll(Data.coursename, Data._id)}
                  className="text-white bg-blue-900 py-2 px-3 absolute right-4 cursor-pointer"
                >
                  Đăng kí
                </div>
              ) : (
                <div onClick={()=> alert("Lớp học đã đầy!")}
                  className="text-white bg-red-900 py-2 px-3 absolute right-4 cursor-not-allowed">
                  Hết chỗ
                </div>
              )}
              <div className="absolute bottom-2">
                <span className='mt-2 font-bold'>Thời gian : </span>
                {'[ '}
                {Data.schedule.map(daytime => {
                  return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                }).join(', ')}
                {' ]'}
              </div>
            </div>
          ))}
      </div>

      {openTM && (
          <div key='1' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
              <div className='bg-[#008280] w-96 h-[21rem] rounded-md'>
                  <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={()=>setOpenTM(false)}>✖️</div>
                  <div className='flex flex-col justify-center p-5 text-1xl gap-4'>
                  <p className='text-center text-2xl bg-blue-900 rounded-sm py-1 text-white mb-5'>{tname.sub.toUpperCase()}</p>
                  <p>Tên giáo viên : <span className='text-white'>{tname.fname} {tname.lname}</span></p>
                  <p>Học vấn : <span className='text-white'>Tốt nghiệp <b className='text-gray-200'>{Tdec.PGcollege}</b> với GPA {Tdec.PGmarks}</span></p>
                  <p>Kinh nghiệm : <span className='text-white'>{Tdec.Experience} năm</span></p>
                  <p>Khoá học : <span className='text-white'>{tname.sub.toUpperCase()}</span></p>
                  </div>
              </div>
          </div>
      )}
    </>
  );
}

export default Search;
