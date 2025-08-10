import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import MainLayOut from "./layouts/MainLayOut.jsx";
import Login from "./pages/Login.jsx";

import ErrorPage from "./pages/ErrorPage.jsx";
import NotFound from "./pages/NotFound.jsx";

import PrivateRoute from "./providers/PrivateRoute.jsx";
import MyProfile from "./pages/MyProfile.jsx";

import AllArtifacts from "./pages/AllArtifacts.jsx";
import MyArtifacts from "./pages/MyArtifacts.jsx";
import AddArtifact from "./pages/AddArtifact.jsx";
import ArtifactDetails from "./pages/ArtifactDetails.jsx";
import UpdateArtifacts from "./pages/UpdateArtifacts.jsx";
import MyLikedArtifacts from "./pages/MyLikedArtifacts.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch("https://artifacts-tracker-server-eta.vercel.app/artifacts"),
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/all-artifacts",
        loader: () => fetch("https://artifacts-tracker-server-eta.vercel.app/artifacts"),
        element: <AllArtifacts></AllArtifacts>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/my-artifacts",
        loader: () => fetch("https://artifacts-tracker-server-eta.vercel.app/artifacts"),
        element: (
          <PrivateRoute>
            <MyArtifacts></MyArtifacts>
          </PrivateRoute>
        ),
      },
      {
        path: "/like-artifacts",
        element: (
          <PrivateRoute>
            <MyLikedArtifacts></MyLikedArtifacts>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-artifact",
        element: (
          <PrivateRoute>
            {" "}
            <AddArtifact></AddArtifact>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/artifact-details/:id",
        loader: ({ params }) =>
          fetch(`https://artifacts-tracker-server-eta.vercel.app/artifacts/${params.id}`),
        element: (
          <PrivateRoute>
            <ArtifactDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateArtifacts/:id",
        loader: ({ params }) =>
          fetch(`https://artifacts-tracker-server-eta.vercel.app/artifacts/${params.id}`),
        element: (
          <PrivateRoute>
            <UpdateArtifacts></UpdateArtifacts>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
