import { handleLoginSuccess } from "../redux/userSlice";
const FETCH_URL = "https://traveling-tour-be.onrender.com/api/v1";
export const signIn = async (credentials) => {
  const { email, password } = credentials || {};
  // console.log("object in signIn", email, password);
  try {
    const response = await fetch(`${FETCH_URL}/auth/login`, {
      // const response = await fetch(`http://localhost:4000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();
    return result;
    // re
  } catch (error) {
    console.log(error.message);
  }
};
export const signOut = async (credentials) => {
  const { email, password } = credentials || {};
  // console.log("object in signIn", email, password);
  try {
    const response = await fetch(`${FETCH_URL}/auth/login`, {
      // const response = await fetch(`http://localhost:4000/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    return result.data || {};
  } catch (error) {
    console.log(error.message);
  }
};
export const register = async (credentials) => {
  const { email, password, username, phone } = credentials || {};
  console.log("object in signIn", credentials);
  try {
    const response = await fetch(`${FETCH_URL}/auth/register`, {
      // const response = await fetch(`http://localhost:4000/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        email,
        password,
        phone,
      }),
    });

    const result = await response.json();
    return result;
    // re
  } catch (error) {
    console.log(error);
  }
};
