export const formatDate = (isoDate?: string | Date): string => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (isoDate?: string | Date): string => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatHour = (isoDate?: string | Date): number | "N/A" => {
  if (!isoDate) return "N/A";

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "N/A"; // invalid date

  let hour = date.getHours(); // 0 - 23
  hour = hour % 12; // convert 13 -> 1, 20 -> 8, 0 -> 0
  return hour === 0 ? 12 : hour; // replace 0 with 12
};

export const getDayFromISODate = (dateInput: string | Date): string | null => {
  // Convert Date to ISO string if needed
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getUTCDay()]; // use getUTCDay() for UTC or getDay() for local
};
