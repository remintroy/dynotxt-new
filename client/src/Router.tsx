import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
