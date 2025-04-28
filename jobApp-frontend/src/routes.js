import React from "react"; // make sure you import React if you haven't
const UserLayout = React.lazy(() => import("./pages/User/UserLayout"));
const Index = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Categories = React.lazy(() => import("./pages/Dashboard/Administrator/Categories/Categories"));
const Register = React.lazy(() => import("./pages/Authentication/Register/Register"));
const LogIn = React.lazy(() => import("./pages/Authentication/LogIn/LogIn"));
const Users = React.lazy(() => import("./pages/Dashboard/Administrator/Users/Users"));
const Companies = React.lazy(() => import("./pages/Dashboard/Administrator/Companies/Companies"));
const Employers = React.lazy(() => import("./pages/Dashboard/Administrator/Employers/Employers"));
const ProfilePage = React.lazy(() => import("./pages/User/ProfilePage"));
const JobPostings = React.lazy(() => import("./pages/Dashboard/Employer/Jobs/JobPostings"));
const AccountSettings = React.lazy(() => import("./pages/User/AccountSettings"));
const Postings = React.lazy(() => import("./pages/Jobs/Postings"));
const Departments = React.lazy(() => import("./pages/Dashboard/Administrator/Departments/Departments"));
const LanguagesAdmin = React.lazy(() => import("./pages/Dashboard/Administrator/Languages/LanguagesAdmin"));
const SomethingWentWrong = React.lazy(() => import("./pages/Error/SomethingWentWrong"));
const AlreadyLoggedIn = React.lazy(() => import("./pages/Error/AlreadyLoggedIn"));
const ServerNotResponding = React.lazy(() => import("./pages/Error/ServerNotResponding"));
const NotFound = React.lazy(() => import("./pages/Error/NotFound"));
const Institutions = React.lazy(() => import("./pages/Dashboard/Administrator/Institutions/Institutions"));
const MyCompanies = React.lazy(() => import("./pages/Dashboard/Employer/Companies/MyCompanies"));
const Tags = React.lazy(() => import("./pages/Dashboard/Administrator/Tags/Tags"));
const PostingsByCategory = React.lazy(() => import("./pages/Jobs/PostingsByCategory"));
const PostingsByTag = React.lazy(() => import("./pages/Jobs/PostingsByTag"));
const JobDetails = React.lazy(() => import("./pages/Jobs/JobDetails"));
const SavedJobs = React.lazy(() => import("./pages/User/SavedJobs"));

const routes = [
  ,
  {
    path: "/",
    element: Index,
  },
  {
    path: "/error",
    element: SomethingWentWrong,
  },
  {
    path: "/loggedIn",
    element: AlreadyLoggedIn,
  },
  {
    path: "/serverError",
    element: ServerNotResponding,
  },
  {
    path: "/notFound",
    element: NotFound,
  },
  {
    path: "/",
    layout: UserLayout,
    children: [
      { path: "/profile/:id", element: ProfilePage, private: true },
      { path: "/account", element: AccountSettings, private: true },
      { path: "/jobPostings", element: Postings },
      {
        path: "/jobPostings/category/:categoryId",
        element: PostingsByCategory,
      },
      { path: "/jobPostings/tag/:tagId", element: PostingsByTag },
      {
        path: "/jobPostings/job/:id",
        element: JobDetails,
      },
      {
        path: "/savedJobs",
        element: SavedJobs,
        private: true,
      },
    ],
  },
  {
    path: "/dashboard",
    layout: Dashboard,
    protected: true,
    roles: ["Admin", "Employer"],
    children: [
      {
        path: "/dashboard/departments",
        element: Departments,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/languages",
        element: LanguagesAdmin,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/categories",
        element: Categories,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/users",
        element: Users,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/companies",
        element: Companies,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/employers",
        element: Employers,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/jobPostings",
        protected: true,
        element: JobPostings,
        roles: ["Employer"],
      },
      {
        path: "/dashboard/myCompanies",
        protected: true,
        element: MyCompanies,
        roles: ["Employer"],
      },
      {
        path: "/dashboard/institutions",
        element: Institutions,
        protected: true,
        roles: ["Admin"],
      },
      {
        path: "/dashboard/tags",
        element: Tags,
        protected: true,
        roles: ["Admin"],
      },
    ],
  },
  { path: "/register", element: Register },
  { path: "/logIn", element: LogIn },
];

export default routes;
