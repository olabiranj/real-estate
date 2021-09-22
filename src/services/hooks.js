import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../redux/actions/types";
import { url } from "./helpers";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { backendRoutes } from "routes";
import { publicRoutes } from "routes";
import { message } from "antd";

export const useAuth = () => {
  const [value, setValue] = useState();
  const content = useSelector((root) => root.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  let [authloading, setAuthLoading] = useState(false);
  let frontendUrl = "https://demo-re.netlify.app";
  const [form, setForm] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
    phone_country: "NG",
    password: "",
    password2: "",
    callback_url: "",
  });
  useEffect(() => {
    if (
      !content.isAuthenticated &&
      window.location.pathname.includes("/admin")
    ) {
      dispatch({ type: LOGOUT_SUCCESS });
      setTimeout(() => localStorage.removeItem("token"), 1000);
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
        localStorage.setItem("token", res.data.access_token);
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { ...res.data },
        });
        setForm({ email: "", password: "" });
        res.data.data.roles[0].name === "admin"
          ? history.push("/admin")
          : history.push("/user");
      })
      .catch((err) => {
        console.log(err);
        err.response?.data?.message
          ? toast(err.response.data.message, { type: "error" })
          : toast("Unable to Login at the moment", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleRegister(e) {
    console.log(value);
    e.preventDefault();
    if (form.password === form.password2) {
      axios
        .post(url(backendRoutes.create_account), { ...form, phone: value })
        .then((res) => {
          setForm({
            name: "",
            lname: "",
            email: "",
            phone: "",
            phone_country: "NG",
            password: "",
            password2: "",
            callback_url: "https://demo-re.netlify.app/",
          });
          toast(res.data.message, { type: "success" });
        })
        .catch((err) => {
          err.response?.data?.message
            ? toast(err.response.data.message, { type: "error" })
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
      .post(url(backendRoutes.forgot_password), {
        callback_url: `${frontendUrl}${publicRoutes.RESET_PASSWORD}`,
        email: form.email,
      })
      .then((res) => {
        setForm({ email: "", password: "" });
        toast(res.data.message, { type: "success" });
      })
      .catch((err) => {
        err.response?.data?.message
          ? toast(err.response.data.emessage, { type: "error" })
          : toast("Unable to register at the moment", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function logout() {
    dispatch({ type: LOGOUT_SUCCESS });
    setTimeout(() => localStorage.removeItem("token"), 1000);
    window.location.pathname = publicRoutes.LOGIN;
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
    logout,
  };
};

export const usePropertyCategories = () => {
  const [propLoading, setPropLoading] = useState(false);
  const [propertyCategories, setPropCategories] = useState([]);
  function getPropertyCategory(cb) {
    setPropLoading(true);
    axios
      .get(url(backendRoutes.admin_categories))
      .then((res) => {
        if (res.data.status === "success") {
          setPropCategories(res.data.data);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error("Unable to get category");
        setPropLoading(false);
        cb && cb();
      });
  }

  function addPropertyCategory(params, cb) {
    setPropLoading(true);
    axios
      .post(url(backendRoutes.admin_categories), params)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error("Unable to create category");
        setPropLoading(false);
        cb && cb();
      });
  }
  function deletePropertyCategory(params, cb) {
    setPropLoading(true);
    axios
      .delete(url(`${backendRoutes.admin_categories}/${params}/delete`))
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          getPropertyCategory();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setPropLoading(false);
        cb && cb();
      });
  }
  function editPropertyCategory(reqBody, id, cb) {
    setPropLoading(true);
    axios
      .put(url(`${backendRoutes.admin_categories}/${id}/update`), reqBody)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          setTimeout(() => window.location.reload(), 2000);
          getPropertyCategory();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error(err.response?.data?.message);
        setPropLoading(false);
        cb && cb();
      });
  }

  useEffect(() => {
    getPropertyCategory();
  }, []);
  return {
    addPropertyCategory,
    propLoading,
    propertyCategories,
    deletePropertyCategory,
    editPropertyCategory,
  };
};
export const useProperties = () => {
  const [propLoading, setPropLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  function getProperties(cb) {
    setPropLoading(true);
    axios
      .get(url(backendRoutes.admin_properties))
      .then((res) => {
        if (res.data.status === "success") {
          setProperties(res.data.data);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        err.response?.data?.message &&
          message.error(err.response?.data?.message);

        setPropLoading(false);
        cb && cb();
      });
    setProperties(false);
  }

  function addProperty(params, cb) {
    setPropLoading(true);
    axios
      .post(url(backendRoutes.admin_properties), params)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          getProperties();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setPropLoading(false);
        cb && cb();
      });
  }
  function editProperty(reqBody, id, cb) {
    setPropLoading(true);
    axios
      .put(url(`${backendRoutes.admin_properties}/${id}/update`), reqBody)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          setTimeout(() => window.location.reload(), 2000);
          getProperties();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setPropLoading(false);
        cb && cb();
      });
  }
  function deleteProperty(params, cb) {
    setPropLoading(true);
    axios
      .delete(url(`${backendRoutes.admin_properties}/${params}/delete`))
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          getProperties();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setPropLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setPropLoading(false);
        cb && cb();
      });
  }

  useEffect(() => {
    getProperties();
  }, []);
  return {
    deleteProperty,
    addProperty,
    propLoading,
    properties,
    editProperty,
  };
};
export const useConsultants = () => {
  const [consLoading, setConsLoading] = useState(false);
  const [consultants, setConsultants] = useState([]);
  function getConsultants(cb) {
    setConsLoading(true);
    axios
      .get(url(backendRoutes.admin_consultants))
      .then((res) => {
        if (res.data.status === "success") {
          setConsultants(res.data.data);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setConsLoading(false);
      })
      .catch((err) => {
        err.response?.data?.message &&
          message.error(err.response?.data?.message);

        setConsLoading(false);
        cb && cb();
      });
  }

  useEffect(() => {
    getConsultants();
  }, []);
  return {
    getConsultants,
    consLoading,
    consultants,
  };
};
