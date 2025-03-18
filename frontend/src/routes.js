import UserLayout from "pages/User/UserLayout";
import Index from "pages/Home";
import Dashboard from "pages/Dashboard/Dashboard";
import Categories from "pages/Dashboard/Administrator/Categories/Categories";
import Register from "pages/Authentication/Register/Register";

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
      {
        path: "/dashboard/categories",
        element: Categories,
        protected : true,
        roles: ["Admin"],
      },
    ],
  },
  { path: "/register", element: Register }
];

export default routes;
