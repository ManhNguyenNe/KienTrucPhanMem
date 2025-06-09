import React, { useState, useEffect } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const TeacherDocument = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/teacher/TeacherDocument/${Data}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setData(user.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Experience: data.Experience || "",
    SecondarySchool: data.SecondarySchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherSchool: data.HigherSchool || "",
    HigherMarks: data.HigherMarks || "",
    UGcollege: data.UGcollege || "",
    UGmarks: data.UGmarks || "",
    PGcollege: data.PGcollege || "",
    PGmarks: data.PGmarks || "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
    UG: null,
    PG: null,
  });

  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(`/api/teacher/verification/${Data}`, {
        method: "POST",
        body: formDataObj,
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
          <span className="text-white text-xl ml-1">Uploading ...</span>
        </div>
      )}
      <div className="flex items-center gap-[20rem] px-32 py-2 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="" />
          <h1 className="text-2xl text-[#4E84C1] font-bold">Trung Tâm Luyện Thi ABC</h1>
        </div>
        <h2 className="text-white text-xl">Thông Tin Giáo Viên </h2>
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
            label={"Kinh nghiệm giảng dạy"}
            placeholder={"Điền số năm kinh nghiệm"}
            value={formData.Experience}
            onChange={(e) => handleInputChange("Experience", e.target.value)}
          />
          {/* <InputUpload
            label={"Upload Aadhar Card"}
            placeholder={"Upload Aadhar Card"}
            value={formData.Aadhaar}
            onChange={(e) => handleFileChange("Aadhaar", e)}
          /> */}
        </div>

        <p className="text-[#4E84C1] p-5 px-10 pt-10">
          Thông tin bằng cấp
        </p>
        <div className="border h-full mx-36 relative">
          <div className="flex flex-row gap-7 ">
            <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
              <p className=" text-white text-sm">Trung học cơ sở</p>
            </div>
            <Input
              placeholder={"Tên trường"}
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
            {/* <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 10th Result"}
                value={formData.Secondary}
                onChange={(e) => handleFileChange("Secondary", e)}
              />
            </div> */}
          </div>
          <hr />

          <div className="flex flex-row gap-7 items-center">
            <div className=" bg-[#0D286F] p-[1rem] m-1 rounded-sm">
              <p className=" text-white text-sm">Trung học phổ thông</p>
            </div>
            <Input
              placeholder={"Tên trường"}
              value={formData.HigherSchool}
              onChange={(e) =>
                handleInputChange("HigherSchool", e.target.value)
              }
            />
            <Input
              placeholder={"Điểm trung bình"}
              value={formData.HigherMarks}
              onChange={(e) => handleInputChange("HigherMarks", e.target.value)}
            />
            {/* <div className=" mt-[-1.5rem]">
              <InputUpload
                placeholder={"Upload 12th Result"}
                value={formData.Higher}
                onChange={(e) => handleFileChange("Higher", e)}
              />
            </div> */}
          </div>
          <hr />

            <div className="flex flex-row gap-7">
              <div className=" bg-[#0D286F] p-[1rem] m-3 rounded-sm">
                <p className=" text-white text-sm">Đại học</p>
              </div>
              <Input
                placeholder={"Tên trường"}
                value={formData.UGcollege}
                onChange={(e) => handleInputChange("UGcollege", e.target.value)}
              />
              <Input
                placeholder={"GPA"}
                value={formData.UGmarks}
                onChange={(e) => handleInputChange("UGmarks", e.target.value)}
              />
              {/* <div className=" mt-[-1.5rem]">
                <InputUpload
                  placeholder={"Upload Graduation .."}
                  value={formData.UG}
                  onChange={(e) => handleFileChange("UG", e)}
                />
              </div> */}
            </div>
          
          <hr />
            <div className="flex flex-row gap-7">
              <div className=" bg-[#0D286F] p-[1rem] m-1 rounded-sm px-4">
                <p className=" text-white text-sm">Sau đại học</p>
              </div>
              <Input
                placeholder={"Tên trường"}
                value={formData.PGcollege}
                onChange={(e) => handleInputChange("PGcollege", e.target.value)}
              />
              <Input
                placeholder={"GPA"}
                value={formData.PGmarks}
                onChange={(e) => handleInputChange("PGmarks", e.target.value)}
              />
            </div>
        </div>

        {error && <p className=" text-white text-xl m-5 text-center">!! {error}</p>}
        <div className=" bg-[#0D286F] p-3 m-6 rounded-md w-[7rem] ml-[85%] cursor-pointer">
          <button className=" text-white text-sm" type="submit">
            Gửi ▶️
          </button>
        </div>
      </form>
    </>
  );
};

export default TeacherDocument;
