import { createBrowserRouter } from "react-router-dom"
import { useAuthStatus } from "../api/auth/useAuthToken"

import ErrorPage from "../error-page"
import Root from "../components/Root"
import HomePage from "../components/HomePage/HomePage"
import Search from "../components/SearchPage/SearchPage"
import CreateListing from "../components/CreateListingPage/CreateListingPage"
import Login from "../components/LoginPage/LoginPage"


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
        element: <Login />
      },
    ],
    },
  ])


export const AppBrowserRouter = ROUTES