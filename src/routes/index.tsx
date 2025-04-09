import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from '../pages/Home'
import App from '../App'
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signin from "../pages/Signin";
import Admin from "../pages/Admin";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

const routes: RouteObject[] = [
    {
        path : '/',
        element : <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'forgot_password',
                element: <ForgotPassword/>
            },
            {
                path: 'signin',
                element: <Signin/>
            },
            {
                path: 'product-category/:categoryName',
                element: <CategoryProduct/>
            },
            {
                path: 'product/:id',
                element: <ProductDetails/>
            },
            {
                path: 'cart',
                element: <Cart/>
            },
            {
                path: 'search',
                element: <SearchProduct/>
            },
            {
                path: 'admin',
                element: <Admin/>,
                children: [
                    {
                        path: 'all-users',
                        element: <AllUsers/>
                    },
                    {
                        path: 'all-products',
                        element: <AllProducts/>
                    }
                ]
            }
        ]
    }
]

const router = createBrowserRouter(routes)

export default router;