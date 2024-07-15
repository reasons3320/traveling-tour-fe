import { useQuery } from "@tanstack/react-query";
import { getTourTypes } from "../api/tourTypeApi";

export const getTourTypesQuery = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getTourTypes,
  });
};
