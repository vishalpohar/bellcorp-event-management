const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();
  const weekday = d.toLocaleString("default", { weekday: "long" });

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 to 12 for 12-hour format

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return n + "th";
    switch (n % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
      default:
        return n + "th";
    }
  };

  const datetime = {
    formattedDate: `${getOrdinal(day)} ${month} ${year} (${weekday})`,
    time: `${hours}:${minutes} ${ampm}`,
  };

  return datetime;
};

export default formatDate;