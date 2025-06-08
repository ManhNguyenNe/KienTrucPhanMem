import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes, format } from 'date-fns';

const DateTime = ({setDate, allowedDays}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
    console.log("Allowed Days:", allowedDays);
  }, [allowedDays]);

  const isAllowedDate = (date) => {
    if (!allowedDays || !Array.isArray(allowedDays) || allowedDays.length === 0) {
      console.log("No allowed days configured");
      return true; // Cho phép chọn tất cả các ngày nếu chưa có cấu hình
    }
    // Check if the date's day is in the allowedDays array
    const isAllowed = allowedDays.some((allowedDay) => allowedDay.day === date.getDay());
    console.log("Date check:", date, "Is allowed:", isAllowed);
    return isAllowed;
  };

  const isAllowedTime = (date) => {
    if (!allowedDays || !Array.isArray(allowedDays) || allowedDays.length === 0) {
      console.log("No schedule configured, allowing all times");
      return true;
    }

    const allowedDay = allowedDays.find((day) => day.day === date.getDay());
    if (!allowedDay) {
      console.log("No schedule for day:", date.getDay());
      return false;
    }

    const minutes = date.getHours() * 60 + date.getMinutes();
    const isAllowed = minutes >= allowedDay.starttime && minutes <= allowedDay.endtime;
    
    console.log("Time check details:", {
      selectedTime: `${date.getHours()}:${date.getMinutes()}`,
      selectedMinutes: minutes,
      allowedStart: `${Math.floor(allowedDay.starttime/60)}:${allowedDay.starttime%60}`,
      allowedEnd: `${Math.floor(allowedDay.endtime/60)}:${allowedDay.endtime%60}`,
      isAllowed
    });
    
    return isAllowed;
  };

  const filterTime = (time) => {
    return isAllowedTime(time);
  };

  useEffect(() => {
    if (selectedDate) {
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
        const finalDate = formattedDate.slice(0,19)+'Z';
        console.log('Setting date:', {
          selectedDate,
          formattedDate,
          finalDate
        });
        setDate(finalDate);
      } catch (error) {
        console.error("Error formatting date:", error);
      }
    }
  }, [selectedDate, setDate]);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          console.log("DatePicker onChange:", {
            date,
            hours: date.getHours(),
            minutes: date.getMinutes()
          });
          setSelectedDate(date);
        }}
        filterDate={isAllowedDate}
        showTimeSelect
        timeIntervals={15}
        timeFormat="HH:mm"
        minTime={setHours(setMinutes(new Date(), 0), 0)}
        maxTime={setHours(setMinutes(new Date(), 0), 23)}
        filterTime={filterTime}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Chọn ngày và giờ"
        className="text-gray-900 py-1 px-3 rounded-sm"
      />
    </>
  );
};

export default DateTime;
