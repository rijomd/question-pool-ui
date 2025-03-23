import { icons } from "../assets/icons/IconLists";

//for sidebar
export const MenuList = [
  {
    name: "DashBoard",
    type: "item",
    path: "/",
    icon: icons.main,
    valueMapWithPage: "Dashboard",
  },
  {
    name: "Home",
    type: "item",
    path: "/",
    icon: icons.main,
    valueMapWithPage: "answerPool",
  },
  {
    name: "Masters",
    type: "group",
    icon: icons.main,
    children: [
      {
        name: "User List",
        type: "item",
        path: "/userList",
        icon: icons.sub,
        valueMapWithPage: "UserList",
      },
      {
        name: "Job Category",
        type: "item",
        path: "/jobs",
        icon: icons.sub,
        valueMapWithPage: "jobList",
      },
    ],
  },
  {
    name: "Questions",
    type: "group",
    icon: icons.main,
    children: [
      {
        name: "Questions List",
        type: "item",
        path: "/questionList",
        icon: icons.sub,
        valueMapWithPage: "questionList",
      },
      {
        name: "Questions Pool",
        type: "item",
        path: "/questionPool",
        icon: icons.sub,
        valueMapWithPage: "questionPool",
      },
    ],
  },
];
