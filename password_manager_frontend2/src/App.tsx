import React, { Children, useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Signin from '../../password_manager_frontend2/src/components/signin';
import Signup from '../../password_manager_frontend2/src/components/signup';
import Home from '../../password_manager_frontend2/src/components/homePage';
import Landing from '../../password_manager_frontend2/src/components/Landing';
import Appbar from '../../password_manager_frontend2/src/components/appbar';
import Layout from '../../password_manager_frontend2/src/components/Layout';


function App() {
  const[appbarRefresh,setAppbarRefresh] = useState(0);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout appbarRefresh ={appbarRefresh} setAppbarRefresh = {setAppbarRefresh}/>,
      children:[
        {path: '/',
          element:<Landing/>
        },
        { path: '/signin',
          element: <Signin appbarRefresh ={appbarRefresh} setAppbarRefresh = {setAppbarRefresh}/>
        },
        {
          path: '/signup',
          element: <Signup appbarRefresh ={appbarRefresh} setAppbarRefresh = {setAppbarRefresh}/>
        },
        {
          path: '/home',
          element: <Home appbarRefresh ={appbarRefresh} setAppbarRefresh = {setAppbarRefresh}/>
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
