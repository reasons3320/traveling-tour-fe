const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1/";
export const getTours = async (page) => {
  // console.log("page la", filters);
  try {
    // const response = await fetch(`${FETCH_URL}/api/v1/tours?page=${page}`);
    // https://traveling-tour-be.onrender.com/api/v1/tours?page=0
    const response = await fetch(`${FETCH_URL}tours?page=0`, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // await new Promise((resolve) => setInterval(resolve, 10000));
    const result = await response.json();
    return result?.data || [];
  } catch (error) {
    console.log(error.message);
  }
};
export const getToursByUserId = async (id) => {
  // console.log("page la", filters);
  try {
    const response = await fetch(
      `${FETCH_URL}tours/search/getToursByUserId/${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // await new Promise((resolve) => setInterval(resolve, 10000));
    const result = await response.json();
    return result?.data || [];
  } catch (error) {
    console.log(error.message);
  }
};
export const getToursForSearch = async (search, filters) => {
  const filterValue = filters?.map((item) => `type=${item}`).join("&");
  // console.log("search", search);
  // filters?.map((item) => {
  //   console.log("filters ben api la", item);
  // });
  try {
    const response = await fetch(
      `${FETCH_URL}tours/search/getTourBySearch?${filterValue}&search=${search}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    // console.log("Tra ve dc cai j", result.data);

    return result?.data || [];
  } catch (error) {
    console.log(error.message);
  }
};
export const getTourCount = async () => {
  try {
    const response = await fetch(`${FETCH_URL}tours/search/getTourCount`);
    const result = await response.json();

    return result?.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getSingleTour = async (tourId) => {
  try {
    const response = await fetch(`${FETCH_URL}tours/${tourId}`);
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const createNewTour = async (tour) => {
  console.log("tour nhan dc khi create la", tour);
  const response = await fetch(`${FETCH_URL}tours`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      userId: tour.userId,
      title: tour.title,
      city: tour.city,
      address: tour.address,
      price: tour.price,
      types: tour.types,
      maxGroupSize: tour.maxGroupSize || 5,
      desc: tour.desc,
      reviews: [],
      photo: tour.photo ? tour.photo : "empty string",
      featured: true,
    }),
  });
  // .then((res) => {
  //   console.log(res);
  //   return res.json();
  // })
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
export const updateTour = async (tour, tourId, toast) => {
  try {
    console.log("tour nhan dc khi upadte la", tour);

    // const response = await fetch(`${FETCH_URL}tours/${tourId}`, {
    // const response = await fetch(
    // `http://localhost:4000/api/v1/tours/${tourId}`,
    // {
    const response = await fetch(`${FETCH_URL}tours/${tourId}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(tour),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          toast.error("Failure to update this tour");
        } else {
          toast.success("Update tour successfully");
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTour = async (tourId) => {
  try {
    console.log("tour nhan dc khi delete la la", tourId);
    const response = await fetch(`${FETCH_URL}tours/${tourId}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
    // if (!response.ok) {
    //   console.log("response cua delete", response);
    //   return toast.error("Can not delete this tour !");
    // }

    // const res = await response.json();
    // toast.success("Delete tour succeed !");
    // return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
