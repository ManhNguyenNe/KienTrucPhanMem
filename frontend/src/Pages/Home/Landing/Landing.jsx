import React, { useState } from "react";
import "./Landing.css";
import Classroom from "../../Images/Classroom.svg";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Contact from "../Contact/Contact.jsx";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { NavLink , useNavigate} from "react-router-dom";

function Landing() {
  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);
  const [subject, setSubject] = useState('');
  
  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const handleSearch = ()=>{
    // console.log('working')
    navigate(`/Search/${subject}`)
  }

  const AA = ()=>{
    setEMentor(true);
    setLClass(false);
  }

  const BB = ()=>{
    setEMentor(false);
    setLClass(true);
  }

  const teachersList = async(sub)=>{
    setLoading(true);

    const response = await fetch(`/api/course/${sub}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    setFacList(data.data);
    console.log(data.data);
    setLoading(false);
  }


  return (
    <>
    <Header/>
    {/* Top Section */}
      <div className="top">
        <div className="left">
          <h1>
          Trao quyền tri thức, thắp sáng tương lai: <br />Cổng thông tin trung tâm luyện thi <span className="font-semibold text-amber-400 font-serif text-5xl">ABC</span>
          </h1>
          {/*  Search  */}

          <div className="search mb-10">
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
            <input type="text" placeholder='Ex: Math ...' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            <button className='w-32' onClick={handleSearch}>Tìm kiếm</button>
          </div>

        </div>
        <div className="right">
          <img src={Classroom} width={500} alt="" />
        </div>
      </div>

      {/* Features */}
      <div className="features ">
        <p>Vì sao nên học tại ABC</p>
        {/* <hr className="underLine"/> */}
        <div className="fets2">
          <div className="fet cursor-pointer mb-5" onClick={AA}>
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/622a85ea75414daadf6055613c074c5280b95444"
              alt=""
            />
            <h4>Đội ngũ chuyên nghiệp</h4>
            <p>
            Đội ngũ giáo viên tận tâm là trọng tâm trong cách chúng tôi giảng dạy tri thức,
            luôn song hành cùng học viên phát triển.
            </p>
          </div>

          <div className="fet cursor-pointer mb-5" onClick={BB}>
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/1478ee1b2a35123ded761b65c3ed2ceaece0d20f"
              alt=""
            />
            <h4>Chất lượng khoá học tốt</h4>
            <p>
            Tổ chức các lớp học online tinh tuý,
            mang tới trải nghiệm học tập sinh động và tương tác cùng các giảng viên tận tâm.{" "}
            </p>
          </div>

          <NavLink to='/contact'>
            <div className="fet cursor-pointer">
              <img
                src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c412120e39b2095486c76978d4cd0bea88fd883b"
                alt=""
              />
              <h4>Hỗ trợ 24/7</h4>
              <p>
              Luôn sẵn sàng hỗ trợ học viên 24/7. 
              Đội ngũ giảng viên tận tâm luôn ở đây để hướng dẫn và giúp đỡ bạn.
              </p>
            </div>
          </NavLink>
        </div>
        {LClass && (
          <div className="flex items-center justify-center">
            <div className="flex gap-5 items-center my-5">
              <img src="https://lh3.googleusercontent.com/kq1PrZ8Kh1Pomlbfq4JM1Gx4z-oVr3HG9TEKzwZfqPLP3TdVYrx0QrIbpR-NmMwgDzhNTgi3FzuzseMpjzkfNrdHK5AzWGZl_RtKB80S-GZmWOQciR9s=w1296-v1-e30" alt="" width={300}/>
              <div className="text-white flex flex-col items-center">
                <h1>Chất lượng khoá học tốt</h1>
                <p>Tổ chức các lớp học online tinh tuý,<br /> mang tới trải nghiệm học tập sinh động <br /> và tương tác cùng các giảng viên tận tâm.</p>
              </div>
            </div>
          </div>
        )}

        {EMentor && (
          <div className="flex items-center justify-center mt-7 gap-5">
            <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
              <img className=" rounded-full" src="https://media.istockphoto.com/id/1310210662/photo/portrait-of-indian-woman-as-a-teacher-in-sari-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=EMI42nCFpak1c4JSFvwfN0Qllyxt19dlihYEXAdnCXY=" alt="" width={200}/>

              <div className="flex items-center justify-start">
                <CgProfile/>
                <p>Bùi Gia Huy</p>
              </div>
              <div className="flex items-center">
                <FaSchool />
                <p>Học viện Ngân hàng</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp />
                <p>Thợ code</p>
              </div>
            </div>
            <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
              <img className=" rounded-full" src="https://media.istockphoto.com/id/1324558913/photo/confident-young-man-in-casual-green-shirt-looking-away-standing-with-crossed-arms-isolated-on.jpg?s=612x612&w=0&k=20&c=NOrKRrUuxvePKijL9sFBHlDwHESv7Van68-hoS-_4hQ=" alt="" width={200}/>

              <div className="flex items-center justify-start">
                <CgProfile/>
                <p>Nguyễn Đức Mạnh</p>
              </div>
              <div className="flex items-center">
                <FaSchool />
                <p>Học viện Ngân hàng</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp />
                <p>Giáo sư CNTT</p>
              </div>
            </div>
            <div className="bg-[#0E3A59] m-2 p-5 rounded-3xl overflow-hidden flex flex-col items-center justify-center">
              <img className=" rounded-full" src="https://media.istockphoto.com/id/1663458254/photo/portrait-of-beautiful-indian-woman-in-sari.jpg?s=612x612&w=0&k=20&c=raeTJOEyA4sFX_GwrgboXt9ZxtAZ8RkFuljPJnL9sCU=" alt="" width={200}/>

              <div className="flex items-center justify-start">
                <CgProfile/>
                <p>Nguyễn Văn A</p>
              </div>
              <div className="flex items-center">
                <FaSchool />
                <p>Học viện Ngân hàng</p>
              </div>
              <div className="flex items-center">
                <IoSchoolSharp />
                <p>Chủ tịch nước</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="courses">
      <p>Danh sách khoá học</p>
      <hr className="underLine"/>
      <div className="subjects">
        <div className="subject" onClick={()=>teachersList("physics")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
          <p>Physics</p>
        </div>
        <div className="subject" onClick={()=>teachersList("chemistry")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
          <p>Chemistry</p>
        </div>
        <div className="subject" onClick={()=>teachersList("biology")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
          <p>Biology</p>
        </div>
        <div className="subject" onClick={()=>teachersList("math")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
          <p>Math</p>
        </div>
        <div className="subject" onClick={()=>teachersList("computer")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
          <p>Computer</p>
        </div>
        
      </div>

      <div className="flex items-center justify-center gap-10">
        {!loading && facList && (
          facList.map(fac => (
          <div key={fac._id} className="bg-[#99afbc] p-5 rounded-md ">
            <div className="flex gap-3 items-center mb-2 ">
            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
            <div className="flex flex-col justify-center items-start pl-3">
            <p>{fac.enrolledteacher.Firstname} {fac.enrolledteacher.Lastname}</p>
            <h4 className="text-blue-900">{fac.enrolledteacher.Email}</h4>
            </div>
            </div>
            { fac.enrolledteacher.Email === "urttsg@gmail.com" ?
              <h4><span className="font-bold text-brown-800">Học vấn :</span> Học viện Ngân hàng</h4> 
              : 
              <h4><span className="font-bold text-brown-800">Học vấn :</span> Học viện Ngân hàng</h4>
            }
            { fac.enrolledteacher.Email === "urttsg@gmail.com" ? <h4>1 năm kinh nghiệm</h4> : <h4>2 năm kinh nghiệm</h4>}
          </div>
        )))}
      </div>

      </div>

      {/* About Us */}
      <div className="about" style={{backgroundColor: "#042439"}}>
        <h4>Về chúng tôi</h4>
        <hr className="underLine"/>
        <div className="content">
          <div className="left-svg">
            <img src={Plant2} width={300} alt="" />
          </div>
          <p>
          Tại ABC, chúng tôi tin tưởng vào sức mạnh của giáo dục để thay đổi cuộc sống. Nền tảng của chúng tôi được xây dựng như một cánh cổng dẫn đến tri thức, mang đến đa dạng khóa học và trải nghiệm học tập phong phú cho mọi học viên.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Câu chuyện của chúng tôi</h1>
            ABC ra đời từ niềm đam mê học hỏi và khát khao mang nền giáo dục chất lượng đến với tất cả mọi người. Chúng tôi thấu hiểu những thử thách mà người học hiện đại đang đối mặt, và không ngừng nỗ lực tạo ra một giải pháp vừa tiện lợi, vừa hiệu quả.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Sứ mệnh của chúng tôi</h1>
            Sứ mệnh của ABC thật đơn giản nhưng đầy ý nghĩa: trao quyền cho mỗi cá nhân thông qua giáo dục. Chúng tôi hướng đến xây dựng một cộng đồng học tập toàn cầu, nơi mỗi học viên có thể khám phá đam mê mới, nâng cao kỹ năng và hiện thực hóa mục tiêu học tập cũng như nghề nghiệp. Bằng cách ứng dụng công nghệ và phương pháp giảng dạy đổi mới, chúng tôi cam kết mang đến một trải nghiệm học tập sinh động, tương tác và tràn đầy cảm hứng.
          </p>
          <div className="right-svg">
            <img src={Plant} width={400} alt="" />
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="contact-us">
        <Contact/>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  );
}

export default Landing;
