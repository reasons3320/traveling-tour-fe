import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBooking,
  createReviewMassage,
  getBookingsByUserId,
} from "../api/bookingApi";

export const useBookingTourMutation = () => {
  return useMutation({
    mutationFn: (booking) => {
    return  createBooking(booking);
    },
    onSuccess:(data)=>{
      console.log("Booking success !");
    }
    ,onError:(error)=>{
      console.log("Booking failure !")
    },
  });
};
export const useCreateReviewMessageQuery = () => {
  return useMutation({
    mutationFn: createReviewMassage,
  });
};
export const useGetBookingsByUserId = (userId) => {
  return useQuery({
    queryKey: ["bookings", userId],
    queryFn: () => getBookingsByUserId(userId),
  });
};
