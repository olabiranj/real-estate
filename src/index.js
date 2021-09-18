/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { publicRoutes } from "routes";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "views/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "views/Register";
import ForgotPassword from "views/ForgotPassword";
import ResetPassword from "views/ResetPassword";
import "antd/dist/antd.css";

axios.defaults.headers.common["client-id"] = "default";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
              />
              <Route
                path={publicRoutes.LOGIN}
                render={(props) => <Login {...props} />}
              />
              <Route
                path={publicRoutes.REGISTER}
                render={(props) => <Register {...props} />}
              />
              <Route
                path={publicRoutes.FORGOT_PASSWORD}
                render={(props) => <ForgotPassword {...props} />}
              />
              <Route
                path={publicRoutes.RESET_PASSWORD}
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                path={publicRoutes.HOME}
                render={(props) => <h2>Hello Home Page</h2>}
              />
              <Redirect to="/" />
            </Switch>
            <ToastContainer />
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
