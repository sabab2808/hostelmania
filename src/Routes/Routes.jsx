import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Menu from "../pages/Home/Menu/Menu";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminRoute from "./AdminRoute";
import Users from "../pages/Dashboard/Users/Users";
import AddItems from './../pages/Dashboard/AddItems/AddItems';
import AllMeals from "../pages/Dashboard/AllMeals/AllMeals";
import Update from "../pages/Dashboard/AllMeals/Update/Update";
import MealDetails from "../pages/MealDetails/MealDetails";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../pages/Dashboard/ServeMeals/ServeMeals";
import UserRequests from "../pages/Dashboard/UserRequests/UserRequests";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/Dashboard/UpcomingMeals/UpcomingMeals";
import UpcomingMealsPage from "../pages/UpcomingMealsPage/UpcomingMealsPage";
import CheckOut from "../pages/CheckOut/CheckOut";
import Payments from "../pages/Dashboard/Payments/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "menu/:category",
        element: <Menu></Menu>,
      },
      {
        path: 'meal/:id',
        element: <MealDetails></MealDetails>,
        // loader: ({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>
      },
      {
        path: "upcomingMeals",
        element: <UpcomingMealsPage></UpcomingMealsPage>
      },
      {
        path: "checkout/:name",
        element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
      }
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: 'requestedMeals',
        element: <UserRequests></UserRequests>
      },
      {
        path: 'myreviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'payments',
        element: <Payments></Payments>
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'users',
        element: <AdminRoute><Users></Users></AdminRoute>
      },
      {
        path: 'allMeals',
        element: <AllMeals><AllMeals></AllMeals></AllMeals>
      },
      {
        path: 'update/:id',
        element: <AdminRoute><Update></Update></AdminRoute>,
        // loader: ({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: 'allReviews',
        element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
      },
      {
        path: 'serveMeals',
        element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
      },
      {
        path: 'upcomingMeals',
        element: <AdminRoute><UpcomingMeals></UpcomingMeals></AdminRoute>
      }
    ],
  },
]);

export default router;
