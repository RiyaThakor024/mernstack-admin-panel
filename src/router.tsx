import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./login";
import { Dashboard } from "./layouts/Dashboard";
import { NonAuth } from "./layouts/NonAuth";
import { Catagories } from "../src/pages/Catagories";

export const router = createBrowserRouter([
{
    path:'/',
    element:<Dashboard />,
    children:[
    {
        path:'',
        element:<HomePage/>,
    },
    {   
        path:'/categories',
        element:<Catagories />,

    }    
    ]
},
{
    path:'/auth',
    element:<NonAuth />,
    children:[
    {
        path:'login',
        element:<LoginPage />
    },
    
    ],
},
]);