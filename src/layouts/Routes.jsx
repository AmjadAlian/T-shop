import Cart from "../components/web/cart/Cart.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import CategoryDetails from "../components/web/categories/CategoryDetails.jsx";
import Home from "../components/web/home/Home.jsx";
import Login from "../components/web/login/Login.jsx";
import Product from "../components/web/product/Product.jsx";
import Register from "../components/web/register/Register.jsx";
import DashBoardLayout from "./DashBoardLayout.jsx";
import Layout from "./Layout.jsx";
import HomeDashboard from '../components/dashboard/home/Home.jsx';
import CategoriesDashboard from '../components/dashboard/categories/Categories.jsx'
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import SendCode from "../components/web/authForgot/SendCode.jsx";
import ForgotPassword from "../components/web/authForgot/ForgotPassword.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import Order from "../components/web/profile/Order.jsx";
import CreateOrder from "../components/web/profile/createOrder.jsx";
import Products from "../components/web/products/Products.jsx";
import GetProducts from "../components/web/products/GetProducts.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sendcode',
                element: <SendCode />
            },
            {
                path: 'forgotpassword',
                element: <ForgotPassword />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path:'products',
                element:<Products/>,
                children:[
                    {
                        index:true,
                        element:<GetProducts/>
                    },
                   
                ]
                
            },
            {
                path: "products/category/:categoryId",
                element: <CategoryDetails />
            },
            {
                path: 'product/:productId',
                element: <Product />
            },
            {
                path: 'cart',

                element:
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
            },
            {
                path: 'createOrder',
                element: 
                <ProtectedRoute>
                    <CreateOrder />
                </ProtectedRoute>
            },
            {
                path: 'profile',
                element:
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <UserInfo />
                    },
                    {
                        path: 'contact',
                        element: <UserContact />
                    },
                    {
                        path: 'orders',
                        element: <Order />
                    },

                ]
            },
            {
                path: '*',
                element: <h2>page not found --- web</h2>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout />,
        children: [{
            path: 'home',
            element: <HomeDashboard />
        }
            , {
            path: 'categories',
            element: <CategoriesDashboard />
        },
        {
            path: '*',
            element: <h2>page not found --- dashboard</h2>
        }
        ]
    }
]);