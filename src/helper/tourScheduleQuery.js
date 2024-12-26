import { useQuery } from "@tanstack/react-query";
import { getTourSchedulesByTourId } from "../api/tourScheduleApi";

export const getTourSchedulesByTourIdQuery = (tourId) => {
    return useQuery({
      queryKey: ["tour_schedules",tourId],
      queryFn:()=>getTourSchedulesByTourId(tourId),
    });
  };