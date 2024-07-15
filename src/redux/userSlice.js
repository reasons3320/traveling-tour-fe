import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");
const initialState = {
  user: user !== "undefined" ? JSON.parse(user) : null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLoginSuccess: (state, action) => {
      const user = action.payload;
      // console.log("trong state", user);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
      }
    },
  },
});
export const { handleLoginSuccess } = userSlice.actions;
export default userSlice.reducer;
