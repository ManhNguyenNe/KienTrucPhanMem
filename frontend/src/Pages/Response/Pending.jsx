import React from "react";
import pending from "../Images/pending.svg";
import { NavLink } from "react-router-dom";

function Pending() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center py-5">
        <img src={pending} width={350} alt="" />
        <h1 className="text-[#EDF051] text-4xl font-bold">Đang chờ phản hồi</h1>
        <p className="text-[#fadcb6] text-xl w-[35rem] text-center">
        Chúng tôi đã nhận được phản hồi của bạn, vui lòng chờ. Chúng tôi sẽ thông báo cho bạn qua email.
        </p>
        <NavLink to="/">
          <p className="text-[#6DD15D] text-xl">◀ Quay về trang chủ</p>
        </NavLink>
      </div>
    </>
  );
}

export default Pending;
