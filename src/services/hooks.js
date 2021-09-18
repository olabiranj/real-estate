import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../redux/actions/types";
import { url } from "./helpers";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { publicRoutes, backendRoutes } from "routes";

export const useAuth = () => {
  const [value, setValue] = useState();
  const content = useSelector((root) => root.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  let [authloading, setAuthLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
    phone_country: "NG",
    password: "",
    password2: "",
    callback_url: "http://localhost:3000",
  });
  useEffect(() => {
    if (
      !content.isAuthenticated &&
      window.location.pathname.includes("/admin")
    ) {
      dispatch({ type: LOGOUT_SUCCESS });
      window.location.pathname = publicRoutes.LOGIN;
    }
    // eslint-disable-next-line
  }, []);
  function login(e) {
    e.preventDefault();
    setAuthLoading(true);
    axios
      .post(url(backendRoutes.login_user), form)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...res.data.data },
        });
        setForm({ email: "", password: "" });
        history.push("/admin");
      })
      .catch((err) => {
        err.response?.data?.error
          ? toast(err.response.data.error, { type: "error" })
          : toast("Unable to Login at the moment", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleRegister(e) {
    console.log(value);
    e.preventDefault();
    if (form.password === form.password2) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}${backendRoutes.create_account}`,
          { ...form, phone: value }
        )
        .then((res) => {
          console.log(res.data);
          setForm({
            name: "",
            lname: "",
            email: "",
            phone: "",
            phone_country: "NG",
            password: "",
            callback_url: "http://localhost:3000",
          });
        })
        .catch((err) => {
          err.response?.data?.error
            ? toast(err.response.data.error, { type: "error" })
            : toast("Unable to Login at the moment", { type: "error" });
          setAuthLoading(false);
        });
    } else if (form.password.length < 8) {
      toast("Password must have a minimum of 8 characters", { type: "error" });
    } else {
      toast("Password Mismatch", { type: "error" });
    }
  }

  function handleForgotpassword(e) {
    e.preventDefault();
    setAuthLoading(true);
    axios
      .post(url(backendRoutes.forgot_password), form)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...res.data.data },
        });
        setForm({ email: "", password: "" });
        history.push("/user");
      })
      .catch((err) => {
        err.response?.data?.error
          ? toast(err.response.data.error, { type: "error" })
          : toast("Unable to Login at the moment", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return {
    login,
    authloading,
    form,
    setForm,
    handleChange,
    handleRegister,
    value,
    setValue,
    handleForgotpassword,
  };
};
