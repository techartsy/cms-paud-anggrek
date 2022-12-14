import React from "react";

const Guests = React.lazy(() => import("./views/base/tables/Students"));
const Payment = React.lazy(() => import("./views/base/tables/Payment"));
const Certificate = React.lazy(() => import("./views/base/tables/Certificate"));
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/invitation/guests", name: "Tables", component: Guests },
  { path: "/invitation/Payment", name: "Tables", component: Payment },
  { path: "/invitation/certificate", name: "Tables", component: Certificate },
  { path: "/detail/transaction/:id", name: "Tables", component: Guests },
];

export default routes;
