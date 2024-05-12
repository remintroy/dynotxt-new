import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Error from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <AppLayout />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
