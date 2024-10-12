import React, { Children } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import Home from './components/homePage';
import Landing from './components/Landing';
import Appbar from './components/appbar';
import Layout from './components/Layout';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {path: '/',
          element:<Landing/>
        },
        { path: '/signin',
          element: <Signin/>
        },
        {
          path: '/signup',
          element: <Signup/>
        },
        {
          path: '/home',
          element: <Home/>
        }
      ]}
  ])
  return (
    <div style={{
      backgroundColor: "#ecf7eb",
      width: "100%",
      height: "100vh"
    }}>
      <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
