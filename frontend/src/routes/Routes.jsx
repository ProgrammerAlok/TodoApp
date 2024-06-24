import React from 'react';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import Todo from '../pages/Todo';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Todo />,
    },
    {
        path: '/login',
        element: <SignIn />,
    },
    {
        path: '/register',
        element: <SignUp />,
    },
])

export default routes;