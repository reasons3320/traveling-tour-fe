import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewTour,
  deleteTour,
  getSingleTour,
  getTourCount,
  getTours,
  getToursByUserId,
  getToursForSearch,
  updateTour,
} from "../api/tourApi";
import { createReviewMassage } from "../api/bookingApi";

export const useToursQuery = (params) => {
  return useQuery({
    queryKey: ["tours", params || []],
    queryFn: () => getTours(params),
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
     return createNewTour(tour);
    },
  });
};
export const useUpdateTourQuery = () => {
  return useMutation({
    mutationFn: (tour) => {
     return updateTour(tour);
    },
  });
};
export const useDeleteTourQuery = () => {
  return useMutation({
    mutationFn: (tourId) => deleteTour(tourId),
  });
};
