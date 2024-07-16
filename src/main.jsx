import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFoundPage from "./Pages/NotFoundPage";
import AboutUsPage from "./Pages/AboutUs/AboutUsPage";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/Auth/AuthPage";
import TourPage from "./Pages/Tours/TourPage";
import TourDetailPage from "./Pages/Tours/TourDetails/TourDetailsPage";
import Blogs from "./Pages/Blogs/Blogs";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SignIn from "./Pages/SignIn/SignIn";
import ThankYouPage from "./Pages/ThankYouPage";
import { Toaster } from "react-hot-toast";
import CreateNewTourPage from "./Pages/CreateNewTour/CreateNewTourPage";
import Profile from "./Pages/Profile/Profile";
import { Helmet } from "react-helmet";
import BlogDetail from "./Pages/Blogs/BlogDetail";
import SignUp from "./Pages/SignUp/SignUp";
// Import all of Bootstrap's CSS
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/aboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "/tours",
        element: <TourPage />,
      },
      {
        path: "/tours/:tourId",
        element: <TourDetailPage />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/createTour",
        element: <CreateNewTourPage />,
      },
      {
        path: "/updateTour/:tourId",
        element: <CreateNewTourPage />,
      },
      {
        path: "/blogDetail/:blogId",
        element: <BlogDetail />,
      },
      {
        path: "/thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Helmet>
      <meta charSet="utf-8" />
      <title>Mou-Trips</title>
      <link rel="canonical" href="http://localhost:5173" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
