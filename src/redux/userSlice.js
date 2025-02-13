import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
let user = storedUser ? JSON.parse(storedUser) : null;
const initialState = {
  user,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginSuccess: (state, action) => {
      const user = action.payload;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
      }
    },
    logout: (state, action) => {
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});
export const { handleLoginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
