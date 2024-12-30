// // ** Icon imports
// import { LayoutGrid, Link, Pencil, MonitorSmartphone, FilePlus, Settings, Users, HomeIcon,LogOutIcon } from "lucide-react"

// const Navigation = [
//   {
//     title: "Home",
//     icon: <HomeIcon />,
//     path: "/home",
//     children: [],
//   },
//   {
//     title: "Advertise",
//     icon: <LayoutGrid />,
//     path: "/about",
//     children: [
//       {
//         title: "create ad",
//         icon: <FilePlus />,
//         path: `/createAd`,
//       },
//       {
//         title: "Connect Platforms",
//         icon: <Link />,
//         path: `/connectPlatforms`,
//       },
//       {
//         title: "Create Brand",
//         icon: <Pencil />,
//         path: `/brands`,
//       },
//       {
//         title: "Utility Suit",
//         icon: <MonitorSmartphone />,
//         path: `/utilitySuit`,
//       },
//     ],
//   },
//   {
//     title: "CRM",
//     icon: <Users />,
//     path: "/",
//     children: [],
//   },
//   {
//     title: "Settings",
//     icon: <Settings />,
//     path: "/settings",
//     children: [],
//   },
//   {
//     title: "Log Out",
//     icon: <LogOutIcon />,
//     path: `/signup`,
//   },
// ];

// export default Navigation;

"use client";

import {
  LayoutGrid,
  Link,
  Pencil,
  MonitorSmartphone,
  FilePlus,
  Settings,
  Users,
  HomeIcon,
  LogOutIcon,
  User,
  StickyNote,
  UserPen,
  HandCoins,
  FileInput,
  UsersRound,
  UserRoundPlus,
  UserRoundPen,
  LayoutDashboard,
  SquarePen,
  UserRound,
  UserRoundCog,
  CalendarDays,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

// Admin Navigation
const adminNavigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
    children: [],
  },
  {
    title: "Advertise",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor"><path d="M5.506 15.992L8.03 9.029c.46-.967 1.162-1.766 1.967.151c.743 1.77 1.85 5.01 2.505 6.815m-5.85-2.993h4.669"></path><path d="M3.464 4.318C2 5.636 2 7.758 2 12s0 6.364 1.464 7.682C4.93 21 7.286 21 12 21s7.071 0 8.535-1.318S22 16.242 22 12s0-6.364-1.465-7.682C19.072 3 16.714 3 12 3S4.929 3 3.464 4.318"></path><path d="M18.484 8.987v2.995m0 0v3.943m0-3.943h-2.018c-.24 0-.478.044-.702.131c-1.693.657-1.693 3.1 0 3.757c.225.087.462.131.702.131h2.018"></path></g></svg>,
    children: [
      {
        title: "Create Ad",
        icon: <FilePlus />,
        path: `/createAd`,
      },
      {
        title: "Connect Platforms",
        icon: <Link />,
        path: `/connectPlatforms`,
      },
      {
        title: "Create Brand",
        icon: <SquarePen />,
        path: `/brands`,
      },
      {
        title: "Utility Suit",
        icon: <MonitorSmartphone />,
        path: `/utilitySuit`,
      },
    ],
  },
  {
    title: "CRM",
    icon: <LayoutDashboard />,
    path: "/crm/dashboard",
    children: [],
  },
  {
    title: "Settings",
    icon: <Settings />,
    path: "/settings",
    children: [],
  },
  {
    title: "Log Out",
    icon: <LogOutIcon />,
    path: `/logout`,
  },
];

// Superadmin Navigation
const superAdminNavigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/superAdmin/dashboard",
    children: [],
  },
  {
    title: "Users",
    icon: <UserRound />,
    path: "/users",
    children: [],
  },
  {
    title: "Salesman",
    icon: <UserRoundCog />,
    path: "/salesman",
    children: [],
  },
  {
    title: "Subscription",
    icon: <SquarePen />,
    path: "/subscription",
    children: [],
  },
  {
    title: "Demo Account",
    icon: <MonitorSmartphone />,
    path: "/demoAccount",
    children: [],
  },
  {
    title: "Custom Subscription",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 19.5c0-1.178 0-1.768.44-2.134C2.878 17 3.585 17 5 17s2.121 0 2.56.366s.44.956.44 2.134s0 1.768-.44 2.134C7.122 22 6.415 22 5 22s-2.121 0-2.56-.366S2 20.678 2 19.5m14 0c0-1.178 0-1.768.44-2.134C16.878 17 17.585 17 19 17s2.121 0 2.56.366s.44.956.44 2.134s0 1.768-.44 2.134C21.122 22 20.415 22 19 22s-2.121 0-2.56-.366S16 20.678 16 19.5m3-2.5c0-2.482-.744-3-4.308-3H9.308C5.744 14 5 14.518 5 17m7-10.5L13 5m3.5 1.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0" color="currentColor"></path></svg>,
    path: "/customSubscription",
    children: [],
  },
  {
    title: "Log Out",
    icon: <LogOutIcon />,
    path: `/logout`,
  },
];

// Superadmin Navigation
const salesmanNavigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/salesmanDashboard",
    children: [],
  },
  {
    title: "Clients",
    icon: <UserRound />,
    path: "/clients_",
    children: [],
  },
  {
    title: "Onboard User",
    icon: <UserRoundPlus />,
    path: "/onBoardUser",
    children: [],
  },
  {
    title: "Log Out",
    icon: <LogOutIcon />,
    path: `/logout`,
  },
];

// CRM Navigation
const crmNavigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/crm/dashboard",
    children: [],
  },
  {
    title: "Employee",
    icon: <UserRoundPlus />,
    children: [
      {
        title: "Employees",
        icon: <UserRoundPlus />,
        path: "/crm/employee",
      },
      {
        title: "Employee Attendance",
        icon: <UserRoundPlus />,
        path: "/crm/employee",
      },
      {
        title: "Leaves List",
        icon: <User />,
        path: "/crm/employee",
      },
      {
        title: "Leaves Request",
        icon: <User />,
        path: "/crm/employee",
      },
    ]
  },
  {
    title: "Staff",
    icon: <UserRoundPlus />,
    children: [
      {
        title: "Staff Attendance",
        icon: <UserRoundPlus />,
        path: "/crm/staffAttendance",
      },
      {
        title: "Leaves",
        icon: <User />,
        children: [
          {
            title: "Leaves List",
            icon: <User />,
            path: "/crm/staffLeaves",
          },
          {
            title: "Leaves Request",
            icon: <User />,
            path: "/crm/staffLeavesRequest",
          },
        ]
      },
    ]
  },
  {
    title: "Budget",
    icon: <HandCoins />,
    path: "/crm/budget",
    children: [],
  },
  {
    title: "Document",
    icon: <FileInput />,
    path: "/crm/documents_",
    children: [],
  },
  {
    title: "Order",
    icon: <UserPen />,
    path: "/crm/order",
    children: [],
  },
  {
    title: "Calendar",
    icon: <CalendarDays />,
    path: "/crm/calendar",
    children: [],
  },
  {
    title: "Log Out",
    icon: <LogOutIcon />,
    path: `/logout`,
  },
];

const getNavigationArray = () => {
  const route = usePathname();

  const paths = [
    "/crm/dashboard",
    "/crm/employee",
    "/crm/department",
    "/crm/budget",
    "/crm/documents_",
    "/crm/order",
     "/crm/calendar"
  ];
  let { user } = useSelector((store: any) => store.user);
  const isValidRoute = paths.includes(route);
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const userType = user?.role ;
    return userType === "Super Admin" ? superAdminNavigation : userType === "salesman" ? salesmanNavigation : userType === "Customer" && isValidRoute ? crmNavigation : adminNavigation;
  }
  return adminNavigation;
};

// const getNavigationArray = () => {
//   const userType = localStorage.getItem("type");
//   console.log("userType", userType);
//   return  userType === "superadmin" ? superAdminNavigation : userType === "salesman"? salesmanNavigation :adminNavigation;
// };

export default getNavigationArray;
