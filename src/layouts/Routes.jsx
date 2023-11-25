import Layout from "./Layout.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import Home from "../components/web/home/Home.jsx";
import DashBoardLayout from "./DashBoardLayout.jsx";
import HomeDashboard from "../components/dashboard/home/Home.jsx"
import CategoriesDashboard from "../components/dashboard/categories/Categories.jsx"
import { createBrowserRouter ,} from "react-router-dom";
import Register from "../components/web/register/Register.jsx";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path:'register',
                element:<Register/>
            },
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'categories',
                element: <Categories />
            }
        ]
    },

    {
        path: '/dashboard',
        element: <DashBoardLayout />,
        children: [
            {
                path: 'home',
                element: <HomeDashboard />
            },
            {
                path: 'categories',
                element: <CategoriesDashboard />
            }
        ]
    }



]);