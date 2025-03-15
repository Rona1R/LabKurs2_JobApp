import UserLayout from "pages/User/UserLayout";
import Index from "pages/Home";

const routes = [
  {
    path: "/",
    layout: UserLayout,
    children: [
      { path: "/", element: Index },
    ],
  },
];

export default routes;
