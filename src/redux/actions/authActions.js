import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Login User
export const loginFunc =
  ({ username, password }) =>
  (dispatch) => {
    console.log("got here");
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ username, password });

    axios
      .post(`${BASE_URL}/auth`, body, config)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
