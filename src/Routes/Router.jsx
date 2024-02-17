import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Components/Main/Main";
import Home from "../Components/Pages/Home/Home";
import Details from "../Components/Pages/AllBooks/Details";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/details/:id",
                element: <Details></Details>,
                // loader: ({ params }) => fetch(`http://localhost:5000//details/${params.id}`)
                loader: async ({ params }) => {
                    const response = await fetch(`http://localhost:5000/details/${params.id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch book details for ID ${params.id}`);
                    }
                    return response.json();
                },

            }
        ]
    },
]);



export default router;