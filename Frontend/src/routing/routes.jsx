import { createBrowserRouter } from "react-router-dom"
import { useAuthStatus } from "../auth/useAuthToken"

import ErrorPage from "../error-page"
import Root from "../components/Root"
import HomePage from "../components/HomePage/HomePage"
import Search from "../components/SearchPage/SearchPage"
import CreateListing from "../components/CreateListingPage/CreateListingPage"
import Login from "../components/LoginPage/LoginPage"
import Register from "../components/Register/RegisterPage"
import ViewLocation from "../components/PlaceDetailsPage/PlaceDetailsPage"
import AddReviewPage from "../components/AddReviewPage/AddReviewPage"


export const ROUTES = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/create",
        loader: useAuthStatus,
        element: <CreateListing />
      },
      {
        path: "/login",
        loader: useAuthStatus,
        element: <Login />
      },
      {
        path: "/register",
        loader: useAuthStatus,
        element: <Register />
      },
      {
        path: "/location/:LocationId",
        element: <ViewLocation />
      },
      {
        path: "/write/:LocationId",
        element: <AddReviewPage />
      },
    ],
    },
  ])


export const AppBrowserRouter = ROUTES