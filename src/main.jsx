import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersPage } from "./pages/UsersPgae";
import { BlogPostPages } from "./pages/BlogPostsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App
        usersData={[
          {
            id: 1,
            username: "John",
            email: "john@gmail.com",
          },
          {
            id: 2,
            username: "Michael",
            email: "michael@gmail.com",
          },
        ]}
      />
    ),
    children: [
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/blog-post",
        element: <BlogPostPages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
