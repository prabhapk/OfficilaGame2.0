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