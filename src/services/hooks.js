import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../redux/actions/types";
import { url } from "./helpers";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";
import { backendRoutes } from "routes";
import { publicRoutes } from "routes";
import { message } from "antd";

export const frontendUrl = "https://demo-re.netlify.app";

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
    referral_code: "",
    callback_url: "",
  });
  useEffect(() => {
    if (
      (!content.isAuthenticated &&
        window.location.pathname.includes("/admin")) ||
      (!content.isAuthenticated && window.location.pathname.includes("/user"))
    ) {
      dispatch({ type: LOGOUT_SUCCESS });
      setTimeout(() => localStorage.removeItem("token"), 1000);
      window.location.pathname = publicRoutes.LOGIN;
    } else if (
      content.isAuthenticated &&
      window.location.pathname.includes("/admin")
    ) {
      axios
        .get(url(backendRoutes.admin_dashboard))
        .then(() => {})
        .catch((err) => {
          if (err.response.data.message === "Unauthenticated") {
            dispatch({ type: LOGOUT_SUCCESS });
            setTimeout(() => localStorage.removeItem("token"), 1000);
            window.location.pathname = publicRoutes.LOGIN;
          }
        });
    } else if (
      content.isAuthenticated &&
      window.location.pathname.includes("/user")
    ) {
      axios
        .get(url(backendRoutes.user_dashboard))
        .then(() => {})
        .catch((err) => {
          if (err.response.data.message === "Unauthenticated") {
            dispatch({ type: LOGOUT_SUCCESS });
            setTimeout(() => localStorage.removeItem("token"), 1000);
            window.location.pathname = publicRoutes.LOGIN;
          }
        });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (window.location.pathname === publicRoutes.VERIFY_ACCOUNT) {
      const query = new URLSearchParams(window.location.search);
      const email = query.get("email");
      const token = query.get("token");
      setAuthLoading(true);
      axios
        .post(url(backendRoutes.verify_account), { email, token })
        .then((res) => {
          if (res.data.status === "success") {
            toast("Account Verified, Login to continue", { type: "success" });
          } else {
            toast(res.data.message, { type: "error" });
          }
          setTimeout(() => {
            history.push(publicRoutes.LOGIN);
          }, 2000);
        })
        .catch((err) => {
          err.response?.data?.message
            ? toast(err.response.data.message, { type: "error" })
            : toast("Unable to verify account", { type: "error" });
          setAuthLoading(false);
          setTimeout(() => {
            history.push(publicRoutes.LOGIN);
          }, 2000);
        });
    }
    // eslint-disable-next-line
  }, []);
  const { ref } = useParams();
  useEffect(() => {
    if (window.location.pathname.includes("register")) {
      setForm({ ...form, referral_code: ref });
    } // eslint-disable-next-line
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
        .post(url(backendRoutes.create_account), {
          ...form,
          phone: value,
          callback_url: `${frontendUrl}${publicRoutes.VERIFY_ACCOUNT}`,
        })
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
            : toast("Unable to register at the moment", { type: "error" });
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
        setAuthLoading(false);
      })
      .catch((err) => {
        err.response?.data?.message
          ? toast(err.response.data.emessage, { type: "error" })
          : toast("Unable to process this request", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleVerifyAccount(e) {
    e.preventDefault();
    const query = new URLSearchParams(window.location.search);
    const email = query.get("email");
    const token = query.get("token");
    setAuthLoading(true);
    axios
      .post(url(backendRoutes.reset_password), {
        callback_url: `${frontendUrl}${publicRoutes.RESET_PASSWORD}`,
        email: email,
        token: token,
      })
      .then((res) => {
        toast(res.data.message, { type: "success" });
        setAuthLoading(false);
      })
      .catch((err) => {
        err.response?.data?.message
          ? toast(err.response.data.emessage, { type: "error" })
          : toast("Unable to verify aacount at the moment", { type: "error" });
        setAuthLoading(false);
      });
  }
  function handleResetpassword(e) {
    e.preventDefault();
    const query = new URLSearchParams(window.location.search);
    const email = query.get("email");
    const token = query.get("token");
    if (form.password === form.password2) {
      setAuthLoading(true);
      axios
        .put(url(backendRoutes.reset_password), {
          password: form.password,
          email: email,
          token: token,
        })
        .then((res) => {
          setForm({ password2: "", password: "" });
          toast(res.data.message, { type: "success" });
          setAuthLoading(false);
        })
        .catch((err) => {
          err.response?.data?.message
            ? toast(err.response.data.emessage, { type: "error" })
            : toast("Unable to reset password at the moment", {
                type: "error",
              });
          setAuthLoading(false);
        });
    } else {
      toast("Password Mismatch", { type: "error" });
    }
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
    handleResetpassword,
    handleVerifyAccount,
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
          getPropertyCategory();
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
    setPropLoading(false);
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
  function registerConsultant(values, cb) {
    setConsLoading(true);
    axios
      .post(url(backendRoutes.create_account), {
        ...values,
        phone_country: "NG",
        callback_url: `${frontendUrl}${publicRoutes.VERIFY_ACCOUNT}`,
      })
      .then((res) => {
        getConsultants();
        toast(res.data.message, { type: "success" });
        cb();
      })
      .catch((err) => {
        err.response?.data?.message
          ? toast(err.response.data.message, { type: "error" })
          : toast("Unable to register user at the moment", { type: "error" });
        setConsLoading(false);
      });
  }
  useEffect(() => {
    getConsultants();
  }, []);
  return {
    getConsultants,
    consLoading,
    consultants,
    registerConsultant,
  };
};
export const useCommission = () => {
  const [commLoading, setCommLoading] = useState(false);
  const [commissions, setCommissions] = useState([]);
  function getCommission(cb) {
    setCommLoading(true);
    axios
      .get(url(backendRoutes.admin_commission))
      .then((res) => {
        if (res.data.status === "success") {
          setCommissions(res.data.data);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setCommLoading(false);
      })
      .catch((err) => {
        message.error("Unable to get commission");
        setCommLoading(false);
        cb && cb();
      });
  }

  function addCommission(params, cb) {
    setCommLoading(true);
    axios
      .post(url(backendRoutes.admin_commission), params)
      .then((res) => {
        if (res.data.status === "success") {
          getCommission();
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setCommLoading(false);
      })
      .catch((err) => {
        message.error("Unable to create commission");
        setCommLoading(false);
        cb && cb();
      });
  }
  function deleteCommission(params, cb) {
    setCommLoading(true);
    axios
      .delete(url(`${backendRoutes.admin_commission}/${params}/delete`))
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          getCommission();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setCommLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setCommLoading(false);
        cb && cb();
      });
  }
  function editCommission(reqBody, id, cb) {
    setCommLoading(true);
    axios
      .put(url(`${backendRoutes.admin_commission}/${id}/update`), reqBody)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          getCommission();
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setCommLoading(false);
      })
      .catch((err) => {
        message.error(err.response?.data?.message);
        setCommLoading(false);
        cb && cb();
      });
  }

  useEffect(() => {
    getCommission();
  }, []);
  return {
    addCommission,
    commLoading,
    commissions,
    deleteCommission,
    editCommission,
  };
};
export const useLiners = () => {
  const [linersLoading, setLinersLoading] = useState(false);
  const [liners, setLiners] = useState([]);
  let { id, liner } = useParams();
  useEffect(() => {
    setLinersLoading(true);
    if (window.location.pathname.includes("admin")) {
      axios
        .get(url(`${backendRoutes.admin_consultants}/${id}/${liner}`))
        .then((res) => {
          if (res.data.status === "success") {
            setLiners(res.data.data);
          } else {
            message.error(res.data.message);
          }
          setLinersLoading(false);
        })
        .catch((err) => {
          message.error("Unable to get commission");
          setLinersLoading(false);
        });
    } else {
      const newLiner = window.location.pathname.split("/")[2];
      axios
        .get(url(`${backendRoutes.user}/${newLiner}`))
        .then((res) => {
          if (res.data.status === "success") {
            setLiners(res.data.data);
          } else {
            message.error(res.data.message);
          }
          setLinersLoading(false);
        })
        .catch((err) => {
          message.error("Unable to get commission");
          setLinersLoading(false);
        });
    }
  }, [id, liner]);
  return { linersLoading, liners };
};
export const useClient = () => {
  const [clientLoading, setClientLoading] = useState(false);
  const [client, setClient] = useState([]);
  function getClient(cb) {
    setClientLoading(true);
    axios
      .get(url(backendRoutes.user_client))
      .then((res) => {
        if (res.data.status === "success") {
          setClient(res.data.data);
        } else {
          message.error(res.data.message);
        }
        cb && cb();
        setClientLoading(false);
      })
      .catch((err) => {
        err.response?.data?.message &&
          message.error(err.response?.data?.message);
        setClientLoading(false);
        cb && cb();
      });
    setClientLoading(false);
  }

  function addClient(params, cb) {
    setClientLoading(true);
    axios
      .post(url(backendRoutes.user_client), params)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          cb && cb();
          getClient();
        } else {
          message.error(res.data.message);
        }
        setClientLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setClientLoading(false);
      });
  }
  function assignProperty(params, id, cb) {
    setClientLoading(true);
    if (params.user_id) {
      axios
        .post(url(`${backendRoutes.user_client}/assign-property`), params)
        .then((res) => {
          if (res.data.status === "success") {
            message.success(res.data.message);
            cb && cb();
            getClient();
          } else {
            message.error(res.data.message);
          }
          setClientLoading(false);
        })
        .catch((err) => {
          message.error(err.response.data.message);
          setClientLoading(false);
          cb && cb();
        });
    } else {
      axios
        .put(url(`${backendRoutes.user_client}/${id}/update`), params)
        .then((res) => {
          if (res.data.status === "success") {
            message.success(res.data.message);
            cb && cb();
            getClient();
          } else {
            message.error(res.data.message);
          }
          setClientLoading(false);
        })
        .catch((err) => {
          message.error(err.response.data.message);
          setClientLoading(false);
          cb && cb();
        });
    }
  }

  useEffect(() => {
    getClient();
  }, []);
  return {
    addClient,
    clientLoading,
    client,
    assignProperty,
  };
};
export const useMessaging = () => {
  const [messagingLoading, setMessagingLoading] = useState(false);
  function sendSms(params, cb) {
    setMessagingLoading(true);
    axios
      .post(url(backendRoutes.admin_sms), params)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          cb && cb();
        } else {
          message.error(res.data.message);
        }
        setMessagingLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setMessagingLoading(false);
        cb && cb();
      });
  }
  function sendEmail(params, cb) {
    setMessagingLoading(true);
    axios
      .post(url(backendRoutes.admin_email), params)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          cb && cb();
        } else {
          message.error(res.data.message);
        }
        setMessagingLoading(false);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setMessagingLoading(false);
        cb && cb();
      });
  }

  return {
    messagingLoading,
    sendSms,
    sendEmail,
  };
};
export const useDeals = () => {
  const [dealsLoading, setDealsLoading] = useState(false);
  const [deals, setDeals] = useState({
    all: [],
    ongoing: [],
    closed: [],
    history: [],
  });
  function getDeals(type) {
    setDealsLoading(true);
    axios
      .get(url(`${backendRoutes.admin_deals}/${type}`))
      .then((res) => {
        if (res.data.status === "success") {
          const tempDeal = { ...deals };
          tempDeal[type] = res.data.data;
          setDeals(tempDeal);
        } else {
          message.error(res.data.message);
        }
        setDealsLoading(false);
      })
      .catch((err) => {
        message.error("Unable to get deals");
        setDealsLoading(false);
      });
  }
  function getDealHistory(id) {
    setDealsLoading(true);
    axios
      .get(url(`${backendRoutes.admin_deals}/${id}/show`))
      .then((res) => {
        if (res.data.status === "success") {
          setDeals({
            ...deals,
            history: res.data.data.client_transaction_history,
          });
        } else {
          message.error(res.data.message);
        }
        setDealsLoading(false);
      })
      .catch((err) => {
        message.error("Unable to get history");
        setDealsLoading(false);
      });
  }

  return {
    getDealHistory,
    getDeals,
    deals,
    dealsLoading,
  };
};
export const useDashboardData = () => {
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const role = useSelector((state) => state.auth.user.data.roles[0].name);
  const user = useSelector((state) => state.auth.user);
  function getData() {
    setDataLoading(true);
    axios
      .get(
        url(
          role === "admin"
            ? backendRoutes.admin_dashboard
            : backendRoutes.user_dashboard
        )
      )
      .then((res) => {
        if (res.data.status === "success") {
          setDashboardData(res.data.data[0]);
        } else {
          message.error(res.data.message);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        message.error("Unable to get deals");
        setDataLoading(false);
      });
  }
  function updateProfile(data) {
    setDataLoading(true);
    axios
      .post(url(backendRoutes.get_user), data)
      .then((res) => {
        if (res.data.status === "success") {
          message.success(res.data.message);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              ...user,
              data: { ...res.data.data, roles: user.data.roles },
            },
          });
        } else {
          message.error(res.data.message);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        message.error("Unable to update data");
        setDataLoading(false);
      });
  }
  useEffect(() => {
    window.location.pathname === backendRoutes.user_dashboard && getData();
    window.location.pathname === backendRoutes.admin_dashboard && getData();
    // eslint-disable-next-line
  }, []);
  return {
    dataLoading,
    dashboardData,
    updateProfile,
  };
};
