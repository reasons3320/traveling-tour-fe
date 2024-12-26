const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1/";

export const createBooking = async (booking, toast) => {
  console.log(booking);
  try {
    const res = await fetch(`${FETCH_URL}booking`, {
      // const res = await fetch(`http://localhost:4000/api/v1/booking`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(booking),
    });
    if(!res.ok) {
      const errorResponse = await res.json();
      console.log(errorResponse);
      throw new Error(errorResponse.message || "Failed to create booking. Please try again later.");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
export const createReviewMassage = async ({ tourId, reviewObj }) => {
  try {
    // console.log("review nhận đc bên api là", tourId, reviewObj);
    const res = await fetch(`${FETCH_URL}review/${tourId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reviewObj),
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getBookingsByUserId = async (userId) => {
  try {
    const response = await fetch(`${FETCH_URL}booking/findByUser/${userId}`, {
      // const response = await fetch(
      //   `http://localhost:4000/api/v1/booking/findByUser/${userId}`,
      //   {
      method: "get",
      credentials: "include",
    });
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.log(error.message);
  }
};
