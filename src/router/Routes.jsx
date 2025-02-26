import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import AddTask from "../components/todo/AddTask";
import AllTasks from "../pages/allTask/AllTasks";
import ManageTask from "../pages/ManageTask";
import Login from "../share/Login";
import PrivateRoute from "../user/PrivateRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <AllTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-task",
        element: (
          <PrivateRoute>
            <ManageTask />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Routes;
