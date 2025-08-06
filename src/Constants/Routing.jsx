import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Components/AppLayout";
import Home from "../Components/Home";
import ProductDetails from "../Components/ProductDetails";
import Error from "../Components/Error";
import NotFound from "../Components/NotFound";
import Welcome from "../Components/Welcome";
import Cart from "../Components/Cart";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import ProtectedRoute from "../Components/ProtectedRoute";
import Admin from "../Components/Admin";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home/productdetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/notfound",
        element: <NotFound />,
      },
      {
        path: "/home/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default appRoute;
