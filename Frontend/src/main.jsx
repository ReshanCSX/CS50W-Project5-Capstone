import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './components/Root'
import HomePage from './components/HomePage/HomePage'
import Search from './components/SearchPage/SearchPage'

import ErrorPage from './error-page'
import './index.css'

const router = createBrowserRouter([
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
  ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
