import { createBrowserRouter } from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../pages/Home/Home";
import Availablefoods from "../pages/Availablefoods/Availablefoods";
import Login from "../pages/AcessSetup/Login/Login";
import ErrorPage from "./ErrorPage";
import Register from "../pages/AcessSetup/Register/Register";

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
                path: "register",
                element: <Register></Register>,
            },
            {

            },
            {
                path: "*", // Catch-all for any undefined routes
                element: <ErrorPage></ErrorPage>,
            },

        ]

    }
]);

export default Routerpath;