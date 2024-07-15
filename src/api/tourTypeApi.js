const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1/";

export const getTourTypes = async () => {
  try {
    const res = await fetch(`${FETCH_URL}type`);
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.log("Error at get tour types", error.message);
  }
};
