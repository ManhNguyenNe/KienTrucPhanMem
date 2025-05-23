import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      setAdminId(admin._id);
      fetchPendingApprovals(admin._id);
    }
  }, []);

  const fetchPendingApprovals = async (adminId) => {
    try {
      const response = await fetch(`/api/admin/${adminId}/approve`);
      const data = await response.json();
      if (data.success) {
        setPendingTeachers(data.data.teachersforApproval || []);
        setPendingStudents(data.data.studentsforApproval || []);
      }
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };

  const handleTeacherClick = async (teacherId) => {
    try {
      const response = await fetch(`/api/admin/${adminId}/teacher/${teacherId}/documents`);
      const data = await response.json();
      if (data.success) {
        setSelectedTeacher(data.data.theTeacher);
        setShowTeacherModal(true);
      }
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const handleStudentClick = async (studentId) => {
    try {
      const response = await fetch(`/api/admin/${adminId}/student/${studentId}/documents`);
      const data = await response.json();
      if (data.success) {
        setSelectedStudent(data.data.theStudent);
        setShowStudentModal(true);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleApprove = async (type, id, status) => {
    try {
      const endpoint = type === "teacher" 
        ? `/api/admin/${adminId}/teacher/${id}/approve`
        : `/api/admin/${adminId}/student/${id}/approve`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Isapproved: status,
          remarks: remarks,
          email: type === "teacher" ? selectedTeacher?.Email : selectedStudent?.Email
        }),
      });

      const data = await response.json();
      if (data.success) {
        setShowTeacherModal(false);
        setShowStudentModal(false);
        setRemarks("");
        fetchPendingApprovals(adminId);
      }
    } catch (error) {
      console.error("Error approving/rejecting:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2 ${
              activeTab === "dashboard" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`w-full text-left px-4 py-2 ${
              activeTab === "teachers" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`w-full text-left px-4 py-2 ${
              activeTab === "students" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full text-left px-4 py-2 ${
              activeTab === "courses" ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            Courses
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            {/* Pending Approvals Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pending Teachers */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Pending Teacher Approvals</h2>
                <div className="space-y-4">
                  {pendingTeachers.length > 0 ? (
                    pendingTeachers.map((teacher) => (
                      <div
                        key={teacher._id}
                        onClick={() => handleTeacherClick(teacher._id)}
                        className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="font-medium">{teacher.Firstname} {teacher.Lastname}</h3>
                        <p className="text-sm text-gray-600">{teacher.Email}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No pending teacher approvals</p>
                  )}
                </div>
              </div>

              {/* Pending Students */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Pending Student Approvals</h2>
                <div className="space-y-4">
                  {pendingStudents.length > 0 ? (
                    pendingStudents.map((student) => (
                      <div
                        key={student._id}
                        onClick={() => handleStudentClick(student._id)}
                        className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="font-medium">{student.Firstname} {student.Lastname}</h3>
                        <p className="text-sm text-gray-600">{student.Email}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No pending student approvals</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teacher Modal */}
        {showTeacherModal && selectedTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Teacher Details</h2>
              <div className="mb-4">
                <p><strong>Name:</strong> {selectedTeacher.Firstname} {selectedTeacher.Lastname}</p>
                <p><strong>Email:</strong> {selectedTeacher.Email}</p>
                <p><strong>Phone:</strong> {selectedTeacher.Phone}</p>
              </div>
              <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleApprove("teacher", selectedTeacher._id, "approved")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApprove("teacher", selectedTeacher._id, "rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowTeacherModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Student Modal */}
        {showStudentModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Student Details</h2>
              <div className="mb-4">
                <p><strong>Name:</strong> {selectedStudent.Firstname} {selectedStudent.Lastname}</p>
                <p><strong>Email:</strong> {selectedStudent.Email}</p>
                <p><strong>Phone:</strong> {selectedStudent.Phone}</p>
              </div>
              <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleApprove("student", selectedStudent._id, "approved")}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApprove("student", selectedStudent._id, "rejected")}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 