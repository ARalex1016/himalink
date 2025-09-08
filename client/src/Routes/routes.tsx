import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import MyEvents from "../Pages/MyEvents/MyEvents";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import MyBookings from "../Pages/MyBookings/MyBookings";
import Coordinator from "../Pages/Coordinator/Coordinator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myevents",
    element: <MyEvents />,
  },
  {
    path: "/events/create",
    element: <CreateEvent />,
  },
  {
    path: "/mybookings",
    element: <MyBookings />,
  },
  {
    path: "/coordinators",
    element: <Coordinator />,
  },
]);

export default router;
