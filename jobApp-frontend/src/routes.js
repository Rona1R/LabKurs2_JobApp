import UserLayout from "./pages/User/UserLayout";
import Index from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Dashboard/Administrator/Categories/Categories";
import Register from "./pages/Authentication/Register/Register";
import LogIn from "./pages/Authentication/LogIn/LogIn";
import Users from "./pages/Dashboard/Administrator/Users/Users";
import Companies from "./pages/Dashboard/Administrator/Companies/Companies";
import Employers from "./pages/Dashboard/Administrator/Employers/Employers";
import ProfilePage from "./pages/User/ProfilePage";
import JobPostings from "./pages/Dashboard/Employer/Jobs/JobPostings";
import AccountSettings from "./pages/User/AccountSettings";
import Postings from "./pages/Jobs/Postings";
import Departments from "./pages/Dashboard/Administrator/Departments/Departments";
//import Languages from "./components/user/Languages/Languages";
import LanguagesAdmin from "./pages/Dashboard/Administrator/Languages/LanguagesAdmin";
import SomethingWentWrong from "./pages/Error/SomethingWentWrong";
import AlreadyLoggedIn from "./pages/Error/AlreadyLoggedIn";
import ServerNotResponding from "./pages/Error/ServerNotResponding";
import NotFound from "./pages/Error/NotFound";
import Institutions from "./pages/Dashboard/Administrator/Institutions/Institutions";
import MyCompanies from "./pages/Dashboard/Employer/Companies/MyCompanies";
import Tags from "./pages/Dashboard/Administrator/Tags/Tags";
import PostingsByCategory from "./pages/Jobs/PostingsByCategory";

const routes = [,
  {
    path:"/",
    element:Index
  },
  {
    path:"/error",
    element:SomethingWentWrong
  },
  {
    path:"/loggedIn",
    element: AlreadyLoggedIn
  },
  {
    path:"/serverError",
    element:ServerNotResponding
  },
  {
    path:"/notFound",
    element:NotFound
  },
  {
    path: "/",
    layout: UserLayout,
    children: [
      { path: "/profile/:id", element: ProfilePage , private: true,},
      { path: "/account", element: AccountSettings, private: true, },
      { path:"/jobPostings",element:Postings},
      { path:"/jobPostings/category/:categoryId",element:PostingsByCategory}
    ],
  },
  {
    path: "/dashboard",
    layout: Dashboard,
    protected : true,
    roles: ["Admin","Employer"],
    children: [
      {
        path: "/dashboard/departments",
        element: Departments,
        protected : true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/languages",
        element: LanguagesAdmin,
        protected : true,
        roles: ["Admin"],
      },
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
      },{
        path: "/dashboard/myCompanies",
        protected : true,
        element: MyCompanies,
        roles: ["Employer"],
      },{
        path: "/dashboard/institutions",
        element: Institutions,
        protected : true,
        roles: ["Admin"],
      },{
        path: "/dashboard/tags",
        element: Tags,
        protected : true,
        roles: ["Admin"],
      }
    ],
  },
  { path: "/register", element: Register },
  { path: "/logIn", element: LogIn },
];

export default routes;
