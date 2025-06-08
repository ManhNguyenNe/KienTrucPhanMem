import React, { useState } from 'react'
import "../Landing/Landing.css";
import Mail from "../../Images/Meet-the-team.svg";
import Header from '../Header/Header';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handlemsg = async(e)=>{
    e.preventDefault();
    if(name === '' || email === '' || msg === ''){
      alert("All filds are required!")
    }else if((!/\S+@\S+\.\S+/.test(email))){
      alert("Enter a valid email!")
    }else{
      const data = await fetch('/api/admin/contact-us',{
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, message: msg}),
      })

      const response = await data.json();
      alert(response.message);
      setName('');
      setEmail('');
      setMsg('');
    }
  }

  return (
    <>
    <Header/>
    <div className="contact">
        <h4>Liên hệ</h4>
        <hr className="underLine"/>
        <div className="content">
          <img src={Mail} width={700} alt="" />
          <form  className="form-submit">
            <h4>Gửi Lời Nhắn</h4>
            <input
              type="text"
              placeholder="Họ tên"
              className="input"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Địa chỉ Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <textarea
              placeholder="Lời nhắn"
              className="textArea"
              name="message"
              value={msg}
              onChange={(e)=>setMsg(e.target.value)}
            />
            <button onClick={handlemsg} className="w-[19rem] bg-light-blue-800">Gửi</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact