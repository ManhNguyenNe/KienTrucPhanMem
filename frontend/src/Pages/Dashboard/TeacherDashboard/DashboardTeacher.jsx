import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbMessage2Star } from "react-icons/tb";

function DashboardTeacher() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [notification, setNotification] = useState(false);
  const [subjectForm, setsubjectForm] = useState('Math');
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);

  const [formPopup, setFormPopup] = useState(false);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  // const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Teacher/TeacherDocument/${ID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  useEffect(()=>{
    const getData = async()=>{
      const Data = await fetch('/api/teacher/teacherdocuments',{
        method: 'POST',
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({teacherID : data.Teacherdetails}),
      })
      const res = await Data.json();
      setTeacherDetails(res.data);
    }

    getData();
  },[courses])

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        setCourses(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, []);

  return (
    <>
      <div className="m-5 ml-60 text-white flex flex-col gap-7">
        <div className="text-[1.1rem] w-[30rem] flex gap-60 items-center">
        </div>
        <hr />
        <div className="flex gap-32">
          <div className="flex flex-col gap-5">
            <p>Họ tên: <span className="text-black">{data.Firstname} {data.Lastname}</span></p>
            <p>Email: <span className="text-black">{data.Email}</span></p>
            <p>Số điện thoại: <span className="text-black">{Tdec?.Phone}</span></p>
            <p>Địa chỉ: <span className="text-black">{Tdec?.Address}</span></p>
            <p>Kinh nghiệm: <span className="text-black">{Tdec?.Experience} years</span></p>
          </div>
          <div>
            <div className="flex gap-3 flex-col">
              <p className="bg-[#1671D8] py-1 px-2 w-fit">Khoá học</p>
              {courses &&
                courses.filter((course) => course.isapproved)
                .map((course) => (
                  <p
                    key={course._id}
                    className="py-1 px-2 rounded-xl w-fit"
                  >
                    {course.coursename} :{" "}
                    <span className="text-black">
                      {" [ "}{course.schedule.map(days => `${daysOfWeek[days.day]} ${Math.floor(days.starttime/60)}:${(days.starttime%60 === 0 ? "00":days.starttime%60)} - ${Math.floor(days.endtime/60)}:${(days.endtime%60 === 0 ? "00" : days.endtime%60)}`).join(', ')}{" ] "}
                    </span>
                    <span className="text-black font-bold">
                      {" => "}
                      {price[course.coursename]}.000đ học sinh/tháng
                    </span>
                  </p>
                ))}
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default DashboardTeacher;
