import UserLayout from "pages/User/UserLayout";
import Index from "pages/Home";
import Dashboard from "pages/Dashboard/Dashboard";
import Categories from "pages/Dashboard/Administrator/Categories/Categories";
import Register from "pages/Authentication/Register/Register";
import LogIn from "pages/Authentication/LogIn/LogIn";
import Users from "pages/Dashboard/Administrator/Users/Users";
import Companies from "pages/Dashboard/Administrator/Companies/Companies";

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
      {
        path: "/dashboard/users",
        element: Users,
        protected : true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/companies",
        element: Companies,
        protected : true,
        roles: ["Admin"],
      }
    ],
  },
  { path: "/register", element: Register },
  { path: "/logIn", element: LogIn },
];

export default routes;
