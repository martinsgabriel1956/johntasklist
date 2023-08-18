import { RouteObject } from "react-router-dom";
import { Home, Login, Register } from "../pages";
import { FormLayout } from "../layout/FormLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    element: <FormLayout />,

    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]
  }
];