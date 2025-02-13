import { useQuery } from "@tanstack/react-query";
import { getLocations, getTourTypes } from "../api/tourTypeApi";

export const getTourTypesQuery = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getTourTypes,
  });
};
export const getLocationsQuery = ()=>{
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });
}
