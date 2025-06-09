import React from "react";
import rejected from "../Images/rejected.svg";
import { NavLink, useParams } from "react-router-dom";

function Rejected() {
  const { ID, user } = useParams();
  let type = '';
  if(user === 'student'){
    type = 'StudentDocument';
  }else{
    type = 'TeacherDocument';
  }

  return (
    <>
      <div className="flex flex-col gap-6 items-center py-5">
        <img src={rejected} width={350} alt="" />
        <h1 className="text-[#F37070] text-4xl font-bold">Từ chối</h1>
        <p className="text-[#fadcb6] text-xl w-[35rem] text-center">
        Chúng tôi đã nhận được phản hồi của bạn, tuy nhiên thông tin chưa được rõ ràng. Vui lòng gửi lại một lần nữa.
        </p>
        <NavLink to={`/${type}/${ID}`}>
          <p className="text-[#6DD15D] text-xl">◀ Quay về trang nộp thông tin </p>
        </NavLink>
      </div>
    </>
  );
}

export default Rejected;
