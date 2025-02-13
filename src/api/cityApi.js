import { convertToStandardQueryParams } from "../utils/convertArrayParams";

const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1/";
export const getCities = async (params) => {
  try {
    // const response = await fetch(`${FETCH_URL}/api/v1/tours?page=${page}`);
    // https://traveling-tour-be.onrender.com/api/v1/tours?page=0
    const response = await fetch(`${FETCH_URL}city`,{
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    console.log(error.message);
  }
};