import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Dashboard from 'src/views/Dashboard/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';

import Register from 'src/pages/Register';
import {ViewTrackGrid} from 'src/_components/ViewTrackGrid/ViewTrackGrid'

const routes = (loggedIn) => [
  {
    path: 'app',
    // element: <DashboardLayout />,
    element: loggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'tracks', element: <ViewTrackGrid /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    // element: <MainLayout />,
    element: !loggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      // { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
