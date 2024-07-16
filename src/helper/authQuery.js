import { useMutation, useQuery } from "@tanstack/react-query";
import { register, signIn } from "../api/authApi";
import SignUp from "../Pages/SignUp/SignUp";
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials) => signIn(credentials),
  });
};
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (credentials) => register(credentials),
  });
};
