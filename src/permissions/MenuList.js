import { icons } from "../assets/icons/IconLists";

//for sidebar
export const MenuList = [
    {
        name: "DashBoard",
        type: "item",
        path: "/dashBoard",
        icon: icons.main,
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
            },
            {
                name: "Job Category",
                type: "item",
                path: "/jobs",
                icon: icons.sub,
            }
        ]
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
            },
            {
                name: "Questions Pool",
                type: "item",
                path: "/questionPool",
                icon: icons.sub,
            }
        ]
    },
];