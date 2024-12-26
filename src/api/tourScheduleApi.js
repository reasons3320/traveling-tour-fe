const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1/";

export const getTourSchedules = async () => {
  try {
    const res = await fetch(`${FETCH_URL}type`);
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.log("Error at get tour types", error.message);
  }
};
export const getTourSchedulesByTourId = async (tourId) => {
  try {
    const res = await fetch(`${FETCH_URL}tourSchedules/${tourId}`);
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.log("Error at get tour types", error.message);
  }
};