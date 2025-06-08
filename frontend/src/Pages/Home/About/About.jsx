import React from 'react'
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import '../Landing/Landing.css'
import Footer from "../../Footer/Footer.jsx"
import Header from '../Header/Header.jsx';

function About({backgroundC}) {
  return (
    <>
    <Header/>
    <div className="about" style={{backgroundColor: backgroundC}}>
        <h4>Về chúng tôi</h4>
        <hr className="underLine"/>
        <div className="content">
          <div className="left-svg">
            <img src={Plant2} className="w-[22rem]" alt="" />
          </div>
          <p>
          Tại ABC, chúng tôi tin tưởng vào sức mạnh của giáo dục để thay đổi cuộc sống. Nền tảng của chúng tôi được xây dựng như một cánh cổng dẫn đến tri thức, mang đến đa dạng khóa học và trải nghiệm học tập phong phú cho mọi học viên.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Câu chuyện của chúng tôi</h1>
            ABC ra đời từ niềm đam mê học hỏi và khát khao mang nền giáo dục chất lượng đến với tất cả mọi người. Chúng tôi thấu hiểu những thử thách mà người học hiện đại đang đối mặt, và không ngừng nỗ lực tạo ra một giải pháp vừa tiện lợi, vừa hiệu quả.
            <h1 className=" bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Sứ mệnh của chúng tô</h1>
            Sứ mệnh của ABC thật đơn giản nhưng đầy ý nghĩa: trao quyền cho mỗi cá nhân thông qua giáo dục. Chúng tôi hướng đến xây dựng một cộng đồng học tập toàn cầu, nơi mỗi học viên có thể khám phá đam mê mới, nâng cao kỹ năng và hiện thực hóa mục tiêu học tập cũng như nghề nghiệp. Bằng cách ứng dụng công nghệ và phương pháp giảng dạy đổi mới, chúng tôi cam kết mang đến một trải nghiệm học tập sinh động, tương tác và tràn đầy cảm hứng.
          </p>
          <div className="right-svg">
            <img src={Plant} className="w-[30rem]" alt="" />
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default About