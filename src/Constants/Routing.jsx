import {createBrowserRouter} from 'react-router-dom';
import AppLayout from '../Components/AppLayout';
import Home from '../Components/Home';
import ProductDetails from '../Components/ProductDetails';
import Error from '../Components/Error';
import NotFound from '../Components/NotFound';
import Welcome from '../Components/Welcome';
import Cart from '../Components/Cart';

const appRoute = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children : [
            {
                path: '/',
                element: <Welcome />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/home/productdetails/:id',
                element: <ProductDetails />
            },
            {
                path: '/notfound',
                element: <NotFound />
            },
            {
                path: '/home/cart',
                element: <Cart />
            }
        ]
    }
]);


export default appRoute;