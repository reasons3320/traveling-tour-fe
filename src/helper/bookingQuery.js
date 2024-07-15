import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBooking,
  createReviewMassage,
  getBookingsByUserId,
} from "../api/bookingApi";

export const useBookingTourQuery = () => {
  return useMutation({
    mutationFn: (booking) => {
      createBooking(booking);
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
