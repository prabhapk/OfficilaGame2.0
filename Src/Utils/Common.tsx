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