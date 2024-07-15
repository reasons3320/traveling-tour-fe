import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn } from "../api/authApi";
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials) => signIn(credentials),
  });
};
