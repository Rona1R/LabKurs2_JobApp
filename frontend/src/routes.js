import UserLayout from "pages/User/UserLayout";
import Index from "pages/Home";
import Dashboard from "pages/Dashboard/Dashboard";

const routes = [
  {
    path: "/",
    layout: UserLayout,
    children: [
      { path: "/", element: Index },
    ],
  },
  {
    path: "/dashboard",
    layout: Dashboard,
    protected : true,
    roles: ["Admin","Employer"],
    children: [
    ],
  },
];

export default routes;
