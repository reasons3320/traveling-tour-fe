export const changeFormatDate = (dateString) => {
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Format the date as "dd-mm-yyyy"
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
