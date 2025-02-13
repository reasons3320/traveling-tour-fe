import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/cityApi";

export const useCitiesQuery = () => {
    return useQuery({
      queryKey: ["cities"],
      queryFn: () => getCities(),
    });
  };