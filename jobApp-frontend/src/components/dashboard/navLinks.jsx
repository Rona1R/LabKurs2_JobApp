import {
  faBriefcase,
  faBuilding,
  faChartPie,
  faCircleCheck,
  faClipboard,
  faComputer,
  faFolderOpen,
  faHouse,
  faList,
  faMedal,
  faLaptopFile,
  faTable,
  faUniversity,
  faUser,
  faUserTie,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

export const getNavLinks = (role) => {
  const commonLinks = [
    {
      name: "Home",
      path: "/",
      fontAwesomeIcon: faHouse,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      fontAwesomeIcon: faChartPie,
    },
  ];

  const adminLinks = [
    {
      name: "Users",
      fontAwesomeIcon: faUser,
      children: [
        {
          fontAwesomeIcon: faTable,
          name: "All Users",
          path: "/dashboard/users",
        },
        {
          fontAwesomeIcon: faUserTie,
          name: "Employers",
          path: "/dashboard/employers",
        },
        {
          fontAwesomeIcon: faCircleCheck,
          name: "Roles",
          path: "/",
        },
      ],
    },
    {
      name: "Companies",
      path: "/dashboard/companies",
      fontAwesomeIcon: faBriefcase,
    },
    {
      name: "Departments",
      path: "/dashboard/departments",
      fontAwesomeIcon: faBuilding,
    },
    {
      name: "Languages",
      path: "/dashboard/languages",
      fontAwesomeIcon: faFolderOpen,
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      fontAwesomeIcon: faList,
    },{
      name:"Tags",
      path: "/dashboard/tags",
      fontAwesomeIcon: faTag
    },
    {
      name: "Institutions",
      path: "/dashboard/institutions",
      fontAwesomeIcon: faUniversity,
    },
    {
      name: "Testimonials",
      fontAwesomeIcon: faMedal,
      path: "/",
    },
  ];

  const adminAndEmployerLinks = [
    {
      name: "Jobs",
      fontAwesomeIcon: faBriefcase,
      children: [
        {
          fontAwesomeIcon: faFolderOpen,
          name: "Postings",
          path: "/dashboard/jobPostings",
        },
        {
          fontAwesomeIcon: faClipboard,
          name: "Applications",
          path: "/dashboard/applications",
        },
        {
          fontAwesomeIcon: faComputer,
          name: "Interviews",
          path: "/",
        },
      ],
    },
    {
      name: "My Companies",
      fontAwesomeIcon: faLaptopFile,
      path: "/dashboard/myCompanies",
    },

    ...adminLinks,
  ];

  const employerLinks = [
    {
      name: "Postings",
      fontAwesomeIcon: faFolderOpen,
      path: "/dashboard/jobPostings",
    },
    {
      name: "Applications",
      fontAwesomeIcon: faClipboard,
      path: "/dashboard/applications",
    },
    {
      name: "Interviews",
      fontAwesomeIcon: faComputer,
      path: "/",
    },

    {
      name: "My Companies",
      fontAwesomeIcon: faBuilding,
      path: "/dashboard/myCompanies",
    },
  ];

  const links = [...commonLinks];
  if (role.includes("Admin") && role.includes("Employer")) {
    return [...commonLinks, ...adminAndEmployerLinks];
  } else if (role.includes("Admin")) {
    return [...commonLinks, ...adminLinks];
  } else if (role.includes("Employer")) {
    return [...commonLinks, ...employerLinks];
  }
  return links;
};
