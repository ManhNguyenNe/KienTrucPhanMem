import React, { useEffect, useState } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const StudentDocument = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/student/StudentDocument/${Data}`, {
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

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Highesteducation: data.Highesteducation || "",
    SecondarySchool: data.SecondarySchool || "",
    HigherSchool: data.HigherSchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherMarks: data.HigherMarks || "",
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await fetch(`/api/student/verification/${Data}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("response", responseData);

      setLoader(false);
      if (!response.ok) {
        setError(responseData.message);
      } else {
        console.log("Form submitted successfully!");
        navigate("/pending");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <>
      {loader && (
        <div className="absolute top-[40%] left-[45%] translate-x-[50%] translate-y-[50%]">
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#0D286F"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />{" "}
          <span className="text-white text-xl ml-1">Submitting ...</span>
        </div>
      )}
      <div className="flex items-center gap-[20rem] px-32 py-2 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="" />
          <h1 className="text-2xl text-[#4E84C1] font-bold">Trung Tâm Luyện Thi ABC</h1>
        </div>
        <h2 className="text-white text-xl">Thông Tin Học Sinh</h2>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <p className="text-[#4E84C1] p-5 px-10">Thông tin cá nhân</p>
        <div className="flex flex-wrap gap-20 px-36 mb-10">
          <Input
            label={"Họ đệm"}
            placeholder={"Điền họ đệm"}
            value={data.Firstname}
            readonly
          />
          <Input
            label={"Tên"}
            placeholder={"Điền tên"}
            value={data.Lastname}
            readonly
          />
          <Input
            label={"Số điện thoại"}
            placeholder={"Điền số điện thoại"}
            value={formData.Phone}
            onChange={(e) => handleInputChange("Phone", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-20 px-36">
          <Input
            label={"Địa chỉ nhà"}
            placeholder={"Điền địa chỉ nhà"}
            value={formData.Address}
            onChange={(e) => handleInputChange("Address", e.target.value)}
          />
          <Input
            label={"Học vấn hiện tại"}
            placeholder={"Điền trình độ học vấn cao nhất"}
            value={formData.Highesteducation}
            onChange={(e) =>
              handleInputChange("Highesteducation", e.target.value)
            }
          />
        </div>

        <p className="text-[#4E84C1] p-5 px-10 pt-10">
          Thông tin học vấn
        </p>
        <div className="border h-full mx-36 ">
          <div className="flex flex-row gap-7 ">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Trung học cơ sở</p>
            </div>
            <Input
              placeholder={"Điền tên trường"}
              value={formData.SecondarySchool}
              onChange={(e) =>
                handleInputChange("SecondarySchool", e.target.value)
              }
            />
            <Input
              placeholder={"Điểm trung bình"}
              value={formData.SecondaryMarks}
              onChange={(e) =>
                handleInputChange("SecondaryMarks", e.target.value)
              }
            />
          </div>
          <hr />
          <div className="flex flex-row gap-7">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Trung học phổ thông</p>
            </div>
            <Input
              placeholder={"Điền tên trường"}
              value={formData.HigherSchool}
              onChange={(e) =>
                handleInputChange("HigherSchool", e.target.value)
              }
            />
            <Input
              placeholder={"Điểm trung bình"}
              value={formData.HigherMarks}
              onChange={(e) =>
                handleInputChange("HigherMarks", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <button
            type="submit"
            className="bg-[#0D286F] text-white px-10 py-2 rounded-md"
          >
            Gửi
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentDocument;
