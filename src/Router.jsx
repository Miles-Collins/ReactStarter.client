import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { App } from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import HousePage from "./pages/HousePage.jsx";
import JobPage from "./pages/JobPage.jsx";
import { accountService } from './services/AccountService.js';
import AuthGuard from './utils/AuthGuard.jsx';


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "house",
        element: <HousePage />,
      },
      {
        path:"job",
        element: <JobPage />,
      },
      {
        path: "account",
        loader: accountService.getAccount,
        element:
          <AuthGuard>
            <AccountPage />
          </AuthGuard>,
      },

    ],
  },
]);