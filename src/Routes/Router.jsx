import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Components/Main/Main";
import Home from "../Components/Pages/Home/Home";
const router = createBrowserRouter([
    {
        path: "/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            }
        ]
    },
]);



export default router;