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
import Dashboard from "views/admin/Dashboard.js";
import PropertyCategory from "views/admin/PropertyCategory.js";
import Property from "views/admin/Property";
import Consultants from "views/admin/Consultants";
// import TableList from "views/admin/TableList.js";
// import Typography from "views/admin/Typography.js";
// import UserProfile from "views/admin/UserProfile.js";
import ConsultantDashboard from "views/user/ConsultantDashboard.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/property-category",
    name: "Property Category",
    icon: "tim-icons icon-atom",
    component: PropertyCategory,
    layout: "/admin",
  },
  {
    path: "/property",
    name: "Property",
    icon: "tim-icons icon-pin",
    component: Property,
    layout: "/admin",
  },
  {
    path: "/consultants",
    name: "Consultants",
    icon: "tim-icons icon-bell-55",
    component: Consultants,
    layout: "/admin",
  },
];
export const userRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: ConsultantDashboard,
    layout: "/user",
  },
];

export const publicRoutes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot_password",
  RESET_PASSWORD: "/reset_password",
};

export const backendRoutes = {
  login_user: "/login",
  create_account: "/register",
  verify_account: "/verify",
  resend_verify: "/resend",
  forgot_password: "/forgot",
  reset_password: "/reset",
  get_user: "/user",
  // admin routes
  admin_categories: "/admin/categories",
  admin_properties: "/admin/properties",
  admin_consultants: "/admin/consultants",
};
export default routes;
