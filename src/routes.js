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
import Commission from "views/admin/Commission";
// import TableList from "views/admin/TableList.js";
// import Typography from "views/admin/Typography.js";
// import UserProfile from "views/admin/UserProfile.js";
import ConsultantDashboard from "views/user/ConsultantDashboard.js";
import ConsultantLiners from "views/user/ConsultantLiners";
import Client from "views/user/Client";
import Messaging from "views/admin/Messaging";
import Deals from "views/admin/Deals";

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
    path: "/commission",
    name: "Commission",
    icon: "tim-icons icon-bell-55",
    component: Commission,
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
  {
    path: "/deals",
    name: "Deals",
    icon: "tim-icons icon-bell-55",
    component: Deals,
    layout: "/admin",
  },
  {
    path: "/messaging",
    name: "Messaging",
    icon: "tim-icons icon-bell-55",
    component: Messaging,
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
  {
    path: "/upliners",
    name: "Upliners",
    icon: "tim-icons icon-chart-pie-36",
    component: ConsultantLiners,
    layout: "/user",
  },
  {
    path: "/downliners",
    name: "Downliners",
    icon: "tim-icons icon-chart-pie-36",
    component: ConsultantLiners,
    layout: "/user",
  },
  {
    path: "/client",
    name: "Client",
    icon: "tim-icons icon-chart-pie-36",
    component: Client,
    layout: "/user",
  },
];

export const publicRoutes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register/:ref?",
  REGISTER2: "/register",
  FORGOT_PASSWORD: "/forgot_password",
  RESET_PASSWORD: "/reset_password",
  VERIFY_ACCOUNT: "/verify_account",
};

export const backendRoutes = {
  login_user: "/login",
  create_account: "/register",
  verify_account: "/verify",
  resend_verify: "/resend",
  forgot_password: "/password/forgot",
  reset_password: "/password/reset",
  get_user: "/user",
  // admin routes
  admin_dashboard: "/admin/dashboard",
  admin_categories: "/admin/categories",
  admin_properties: "/admin/properties",
  admin_consultants: "/admin/consultants",
  admin_commission: "/admin/commissions",
  admin_deals: "/admin/deals",
  admin_sms: "/admin/send-messages/bulksms",
  admin_email: "/admin/send-messages/bulkemail",

  // consultant routes
  user_dashboard: "/consultant/dashboard",
  user: "/consultant",
  user_client: "/consultant/clients",
};
export default routes;
