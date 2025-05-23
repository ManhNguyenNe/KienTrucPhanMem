import React, { useEffect, useState } from 'react';
import Camera from '../Images/Camera.png';
import Clock from '../Images/Clock.png';
import { NavLink, useParams } from 'react-router-dom';

function StudentClasses() {
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`/api/course/classes/student/${ID}`, {
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
                console.log("API Response:", user);

                if (!user.data || !user.data.classes || !Array.isArray(user.data.classes)) {
                    console.error("Invalid data format:", user);
                    setData([]);
                    return;
                }

                // Lấy tất cả liveClasses từ tất cả các khóa học
                const allLiveClasses = user.data.classes.flatMap(course => {
                    if (!course.liveClasses || !Array.isArray(course.liveClasses)) {
                        console.log(`No liveClasses for course ${course.coursename}`);
                        return [];
                    }
                    return course.liveClasses.map(liveClass => ({
                        ...liveClass,
                        coursename: course.coursename || 'Unknown Course'
                    }));
                });

                // Sắp xếp các lớp học theo thời gian
                allLiveClasses.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    if (dateA.getTime() === dateB.getTime()) {
                        return a.timing - b.timing;
                    }
                    return dateA.getTime() - dateB.getTime();
                });

                console.log("Processed live classes:", allLiveClasses);
                setData(allLiveClasses);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            }
        };
        getData();
    }, [ID]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Lọc các lớp học trong tuần tới
    const weeklyClasses = data.filter(clas => {
        const classDate = new Date(clas.date);
        const today = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(today.getDate() + 7);
        return classDate >= today && classDate <= oneWeekFromNow;
    });

    // Lấy lớp học sắp tới nhất
    const nextClass = data.find(clas => {
        const classDate = new Date(clas.date);
        return classDate >= new Date();
    });

    return (
        <div className='ml-60 mt-20 text-white flex justify-between mr-80'>
            <div className='flex flex-col gap-8'>
                <div>
                    <h1 className='text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>
                    <div className='h-[17rem] w-[30rem] overflow-auto'>
                        {weeklyClasses.length > 0 ? (
                            weeklyClasses.map(clas => (
                                <div key={`${clas.date}-${clas.timing}`} className='flex items-center mb-5'>
                                    <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                                    <div className='ml-5 mr-10 font-bold'>
                                        <p className='text-lg'>
                                            {clas.coursename}
                                            <span className='text-black text-sm ml-3'>
                                                {new Date(clas.date).toLocaleDateString()} {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
                                            </span>
                                        </p>
                                        <span className='text-blue-500 text-sm ml-3'>{clas.title}</span>
                                    </div>
                                    <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
                                </div>
                            ))
                        ) : (
                            <p className='text-black text-center'>No classes scheduled for this week</p>
                        )}
                    </div>
                </div>
            </div>

            {nextClass ? (
                <NavLink to={nextClass.link} target='_blank'>
                    <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
                        <div className='flex gap-3 items-center mb-5 mt-2'>
                            <img src={Clock} alt="clock" width={50} />
                            <span className='text-[#4E84C1] text-2xl font-semibold'>
                                {new Date(nextClass.date).toLocaleDateString()}
                            </span> 
                            <span className='text-[#018280] text-2xl ml-2'>
                                {Math.floor(nextClass.timing / 60)}:{nextClass.timing % 60 === 0 ? "00" : nextClass.timing % 60}
                            </span>
                        </div>
                        <div className='flex gap-12 items-center'>
                            <div className='ml-3'>
                                <p>Your next Class</p>
                                <p className='text-[#018280] text-3xl font-semibold'>{nextClass.coursename.toUpperCase()}</p>
                                <p className='text-light-blue-700'>{nextClass.title}</p>
                            </div>
                            <img src={Camera} alt="Camera" width={70} />
                        </div>
                    </div>
                </NavLink>
            ) : (
                <div className='bg-white p-5 h-52 rounded-lg text-black'>
                    <p className='text-center mt-10'>No upcoming classes</p>
                </div>
            )}
        </div>
    );
}

export default StudentClasses;