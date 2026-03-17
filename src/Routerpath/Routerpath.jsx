import { createBrowserRouter } from "react-router";
import { Children } from "react";
import Homelayout from "../Layout/Homelayout";
import Home from "../pages/Home/Home";
import Availablefoods from "../pages/Availablefoods/Availablefoods";
import Login from "../pages/Auth/Login";

const Routerpath = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout> </Homelayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "home",
                element: <Home></Home>,
            },
            {
                path: "available-foods",
                element: <Availablefoods></Availablefoods>,

            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {

            }
        ]

    }
]);

export default Routerpath;