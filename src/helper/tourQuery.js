import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewTour,
  deleteTour,
  getSingleTour,
  getTourCount,
  getTours,
  getToursByUserId,
  getToursForSearch,
} from "../api/tourApi";
import { createReviewMassage } from "../api/bookingApi";

export const useToursQuery = (page) => {
  return useQuery({
    queryKey: ["tours", page || 0],
    queryFn: () => getTours(page),
  });
};
export const useGetToursByUserIdQuery = (userId) => {
  return useQuery({
    queryKey: ["toursByUserId", userId],
    queryFn: () => getToursByUserId(userId),
  });
};
export const useToursForSearchQuery = (search, filterList) => {
  return useQuery({
    queryKey: ["searchTours", search, filterList],
    queryFn: () => getToursForSearch(search, filterList),
  });
};
export const useGetSingleTourQuery = (tourId) => {
  return useQuery({
    queryKey: ["singleTour"],
    queryFn: () => getSingleTour(tourId),
  });
};
export const useSubmitReviewForTourQuery = () => {
  return useMutation({
    mutationFn: ({ tourId, reviewObj }) => {
      createReviewMassage(tourId, reviewObj);
    },
  });
};
export const useCreateTourQuery = () => {
  return useMutation({
    mutationFn: (tour) => {
      createNewTour(tour);
    },
  });
};
export const useDeleteTourQuery = () => {
  return useMutation({
    mutationFn: (tourId) => {
      deleteTour(tourId);
    },
  });
};
