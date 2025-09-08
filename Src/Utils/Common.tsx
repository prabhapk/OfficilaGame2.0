export const goBack = ({navigation}: any) => {
    navigation.goBack();
  };

  export const formatToDecimal = (value: number | string, decimals: number = 2): string => {
    const num = Number(value);
    if (isNaN(num)) return "0.00"; // fallback for invalid values
    return num.toFixed(decimals);
  };
  export const formatToTime = (dateString: string): string => {
    if (!dateString) return '';
  
    const date = new Date(dateString);
  
    // Convert to local time
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    // Example: "11:30 PM"
    const formatted = date.toLocaleTimeString([], options);
  
    // Replace ":" with "." => "11.30 PM"
    return formatted.replace(':', '.').toLowerCase();
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