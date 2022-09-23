const getFutureDay = (number) => {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + number);
  return currentDate;
};
const getWeekDay = (number) => {
    var weekDay = getFutureDay(number).getDay();
  if (weekDay === 0) {
    weekDay = 7;
  }
  return weekDay;
};
const getWeekDayString = (number) => {
    var weekDay = getWeekDay(number);
    switch (weekDay) {
        case 1: return "Thứ hai";
        case 2: return "Thứ ba";
        case 3: return "Thứ tư";
        case 4: return "Thứ năm";
        case 5: return "Thứ sáu";
        case 6: return "Thứ bảy";
        case 7: return "Chủ nhật";
        default: return "";
    }
}
const getWeekDayStyle = (number) => {
  var weekDay = getWeekDay(number);
  switch (weekDay) {
      case 6: return {backgroundColor: "#9ff1d1"};
      case 7: return {backgroundColor: "#f7b2b8"};
      default: return {backgroundColor: "#b6ddfd"};
  }
}

export const timetable = [
  {
    name: "today",
    date: getFutureDay(0).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(0),    
    weekDayString: getWeekDayString(0),
    weekDayStyle: getWeekDayStyle(0),
  },
  {
    name: "tomorrow",
    date: getFutureDay(1).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(1),    
    weekDayString: getWeekDayString(1),
    weekDayStyle: getWeekDayStyle(1),
  },
  {
    name: "next2day",
    date: getFutureDay(2).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(2),    
    weekDayString: getWeekDayString(2),
    weekDayStyle: getWeekDayStyle(2),
  },
  {
    name: "next3day",
    date: getFutureDay(3).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(3),    
    weekDayString: getWeekDayString(3),
    weekDayStyle: getWeekDayStyle(3),
  },
  {
    name: "next4day",
    date: getFutureDay(4).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(4),    
    weekDayString: getWeekDayString(4),
    weekDayStyle: getWeekDayStyle(4),
  },
  {
    name: "next5day",
    date: getFutureDay(5).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(5),    
    weekDayString: getWeekDayString(5),
    weekDayStyle: getWeekDayStyle(5),
  },
  {
    name: "next6day",
    date: getFutureDay(6).toLocaleDateString("en-GB"),
    weekDay: getWeekDay(6),    
    weekDayString: getWeekDayString(6),
    weekDayStyle: getWeekDayStyle(6),
  },
];

export default timetable;
