export const createBooking = async (booking, toast) => {
  console.log("Booking la", booking);
  try {
    const res = await fetch("http://localhost:4000/api/v1/booking", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(booking),
    });
    const result = await res.json();
    return result;
    // if (!res.ok) {
    //   toast.error("Your account is not authorize");
    //   return;
    // }
    // toast.success("Create booking successfully.");
    // result = await res.json();
    // return result;
  } catch (error) {
    toast.error("Failed to create booking. Please try again later.");
    throw new Error("Failed to create booking. Please try again later.");
  }
};
export const createReviewMassage = async ({ tourId, reviewObj }) => {
  try {
    // console.log("review nhận đc bên api là", tourId, reviewObj);
    const res = await fetch(`http://localhost:4000/api/v1/review/${tourId}`, {
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
  // console.log("userID ben bookings API", userId);
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/booking/findByUser/${userId}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log("bookings by user id", result.data);
    return result.data || [];
  } catch (error) {
    console.log(error.message);
  }
};
