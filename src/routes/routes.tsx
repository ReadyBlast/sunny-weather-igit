import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Navigate, Outlet } from "react-router";
import { ErrorPage } from "~pages/ErrorPage";
import { Registration } from "~pages/Registration";
import { Home } from "~pages/Home";
import { Login } from "~pages/Login";

export const routes = [
  {
    path: "/",
    element: <ProtectedRoute component={Home} />,
  },
  {
    path: "/login/*",
    element: <Outlet />,
    children: [
      {
        index: true, 
        element: <Navigate to="auth" replace />,
      },
      {
        path: "auth",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage statusCode={404} />,
  },
];
