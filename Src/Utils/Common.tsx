export const goBack = ({navigation}: any) => {
    navigation.goBack();
  };

  export const formatToDecimal = (value: number | string, decimals: number = 2): string => {
    const num = Number(value);
    if (isNaN(num)) return "0.00"; // fallback for invalid values
    return num.toFixed(decimals);
  };
  // export const formatToTime = (dateString: string): string => {
  //   if (!dateString) return '';
  
  //   const date = new Date(dateString);
  
  //   // Convert to local time
  //   const options: Intl.DateTimeFormatOptions = {
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     hour12: true,
  //   };
  
  //   // Example: "11:30 PM"
  //   const formatted = date.toLocaleTimeString([], options);
  
  //   // Replace ":" with "." => "11.30 PM"
  //   return formatted.replace(':', '.').toLowerCase();
  // };

  export const formatToTime = (dateString: string): string => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata', // Force India timezone
    };

    const formatted = date.toLocaleTimeString('en-IN', options);
  

    return formatted.replace(':', '.').toLowerCase();
  };
  export const formatToTimeIST = (dateString: string): string => {
    if (!dateString) return '';
  
    // Parse without shifting (drop the Z)
    const localDate = new Date(dateString.replace('Z', ''));
  
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    return localDate
      .toLocaleTimeString('en-IN', options)
      .replace(':', '.')
      .toLowerCase();
  };
  

  export const formatTime24to12 =(time: string)=> {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
}
export const generateOptions = (startTime: string, endTime: string, intervalTime: string) => {
  const parseTime = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 60 + minutes; // total minutes
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')} ${ampm}`;
  };

  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  const intervalMinutes = parseTime(intervalTime);

  const options: { id: number; name: string; isSelected: boolean }[] = [];

  // ✅ If interval is zero, only return start & end times
  if (intervalMinutes === 0) {
    options.push({ id: 1, name: formatTime(startMinutes), isSelected: true });
    options.push({ id: 2, name: formatTime(endMinutes), isSelected: false });
    return options;
  }

  // Normal case: generate slots
  let id = 1;
  for (let time = startMinutes; time <= endMinutes; time += intervalMinutes) {
    options.push({
      id: id++,
      name: formatTime(time),
      isSelected: time === startMinutes,
    });
  }

  return options;
}

export const getVisiblePages = (current: number, total: number) => {
  if (total <= 5) {
    // Few pages → show all
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    // At the start → show first 3, then ellipsis, then last
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 2) {
    // At the end → show first, ellipsis, then last 3
    return [1, "...", total - 2, total - 1, total];
  }

  // Middle → keep compact with 5 slots only
  return [1, "...", current, "...", total];
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  // ✅ Format date as DD-MM-YY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const year = String(date.getFullYear()).slice(-2); // last 2 digits

  const formattedDate = `${day}-${month}-${year}`;

  // ✅ Format time as 12-hour format
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 → 12

  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return  formattedDate + '\n' + formattedTime;
};

export const convertToISO =(dateStr: string, timeStr: string): string =>{
  // Parse hours and minutes from time string
  const timeRegex = /(\d{1,2}):(\d{2})\s*(am|pm)/i;
  const match = timeStr.match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Use something like '10:30 am'");
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridian = match[3].toLowerCase();

  if (meridian === "pm" && hours < 12) {
    hours += 12;
  }
  if (meridian === "am" && hours === 12) {
    hours = 0;
  }

  // Split the date (YYYY-MM-DD)
  const [year, month, day] = dateStr.split("-").map(Number);

  // Construct a Date in local timezone
  const localDate = new Date(year, month - 1, day, hours, minutes);

  // Return ISO string (UTC)
  return localDate.toISOString();
}
