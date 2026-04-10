import { createBrowserRouter } from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../pages/Home/Home";
import Availablefoods from "../pages/Availablefoods/Availablefoods";
import Login from "../pages/AcessSetup/Login/Login";
import ErrorPage from "./ErrorPage";
import Register from "../pages/AcessSetup/Register/Register";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import Profile from "../pages/Dashoard/Profile/Profile";
import AddFood from "../pages/Dashoard/AddFood/AddFood";

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
                path: "profile",
                element:
                    <PrivateRoute>
                        <Profile></Profile>
                    </PrivateRoute>

            },
            {
                path : "addfood",
                element:
                <PrivateRoute>
                    <AddFood></AddFood>
                </PrivateRoute>

            },
            {
                path: "*", // Catch-all for any undefined routes
                element: <ErrorPage></ErrorPage>,
            },

        ]

    }
]);

export default Routerpath;