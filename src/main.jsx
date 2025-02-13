import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import LanguageContext from "./context/LanguageContext";

import App from "./App";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUs/AboutUsPage";
import TourPage from "./Pages/Tours/TourPage";
import TourDetailPage from "./Pages/Tours/TourDetails/TourDetailsPage";
import Blogs from "./Pages/Blogs/Blogs";
import BlogDetail from "./Pages/Blogs/BlogDetail";
import CreateNewTourPage from "./Pages/CreateNewTour/CreateNewTourPage";
import ThankYouPage from "./Pages/ThankYouPage";
import Profile from "./Pages/Profile/Profile";

import OrganizeLayout from "./Pages/admin/OrganizeLayout";
import Dashboard from "./Pages/admin/dashboard/Dashboard";
import TourManagement from "./Pages/admin/tours/TourManagement";
import ScheduleManagement from "./Pages/admin/schedule/ScheduleManagement";
import BookingManagement from "./Pages/admin/booking/BookingManagement";
import CreateTour from "./Components/CreateTour/CreateTour";

// Function to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Math.floor(Date.now() / 1000);
  } catch (error) {
    return true;
  }
};

// ✅ Organizer Pages (Require Authentication)
const OrganizerRoutes = () => {
  const user = useSelector((state) => state.user.user);

  if (!user || !user.token || isTokenExpired(user.token) || user.role !== "Organizer") {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<OrganizeLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<TourManagement />} />
        <Route path="createtour" element={<CreateTour />} />
        <Route path="schedule" element={<ScheduleManagement />} />
        <Route path="booking" element={<BookingManagement />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

// ✅ Customer Pages (Public - No Authentication Required)
const CustomerRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="aboutUs" element={<AboutUsPage />} />
      <Route path="tours" element={<TourPage />} />
      <Route path="tours/:tourId" element={<TourDetailPage />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="createTour" element={<CreateNewTourPage />} />
      <Route path="updateTour/:tourId" element={<CreateNewTourPage />} />
      <Route path="blogDetail/:blogId" element={<BlogDetail />} />
      <Route path="thank-you" element={<ThankYouPage />} />
      <Route path="profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

// ✅ Main Routing Logic
const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication Pages */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {/* Public Customer Pages */}
      <Route path="/*" element={<CustomerRoutes />} />

      {/* Protected Organizer Pages */}
      <Route path="/organizer/*" element={<OrganizerRoutes />} />
    </Routes>
  );
};

// Initialize React Query Client
const queryClient = new QueryClient();

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Mou-Trips</title>
      <link rel="canonical" href="http://localhost:5173" />
    </Helmet>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <LanguageContext>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LanguageContext>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
