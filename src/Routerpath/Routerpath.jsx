import { createBrowserRouter } from "react-router";
import { Children } from "react";
import Homelayout from "../Layout/Homelayout";
import Home from "../Home/home";
import Login from "../Home/Login";

const Routerpath = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout> </Homelayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "home",
                element: <Home></Home>,
            },
            {
                path: "login",
                element: <Login></Login>,
            }
        ]

    }
]);

export default Routerpath;