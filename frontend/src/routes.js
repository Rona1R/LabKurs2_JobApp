import UserLayout from "pages/User/UserLayout";
import Index from "pages/Home";
import Dashboard from "pages/Dashboard/Dashboard";
import Categories from "pages/Dashboard/Administrator/Categories/Categories";
import Register from "pages/Authentication/Register/Register";
import LogIn from "pages/Authentication/LogIn/LogIn";
import Users from "pages/Dashboard/Administrator/Users/Users";
import Companies from "pages/Dashboard/Administrator/Companies/Companies";
import Employers from "pages/Dashboard/Administrator/Employers/Employers";
import ProfilePage from "pages/User/ProfilePage";
import JobPostings from "pages/Dashboard/Employer/Jobs/JobPostings";
import Postings from "pages/Jobs/Postings";

const routes = [
  {
    path: "/",
    layout: UserLayout,
    children: [
      { path: "/", element: Index },
      { path: "/profile/:id", element: ProfilePage , private: true,},
      { path:"/jobPostings",element:Postings}
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
      },
      {
        path: "/dashboard/employers",
        element: Employers,
        protected : true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/jobPostings",
        protected : true,
        element: JobPostings,
        roles: ["Employer"],
      }
    ],
  },
  { path: "/register", element: Register },
  { path: "/logIn", element: LogIn },
];

export default routes;
