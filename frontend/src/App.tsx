import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import VisitorLayout from "./Layout/VisitorLayout";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { ProtectedRoute } from "./protected/protectedRouter";
import UserLayout from "./Layout/UserLayout";


import ModeratorLayout from "./Layout/ModeratorLayout";
import AdminLayout from "./Layout/AdminLayout";
import UsersCard from "./component/UsersTable";
import Home from "./pages/Home";
import {  GoogleOAuthProvider } from "@react-oauth/google";
import MypostPage from "./pages/MypostPage";
import ExplorePage from "./pages/ExplorePage";
import PageNotFound from "./pages/PageNotFound";

function App() {

const Router =createBrowserRouter([
  {
    path:'/',
    element:<VisitorLayout/>,
    children:[
      {
        path:'',
        element:<Login/>
      },
      {
        path:'signup',
        element:<Signup/>
      }
    ]
  },
  {
    path:'/user',
    element:<ProtectedRoute allowedRoles={['user','admin','moderatora']} children={<UserLayout/>}/>,
    children:[{
      path:'dashboard',
      element:<Home/>
    },
    {
      path:'myPost',
      element:<MypostPage/>
    },
    {
      path:'explore',
      element:<ExplorePage/>
    }
  ]
  },
  {
    path:'/moderatora/',
    element:<ProtectedRoute allowedRoles={['user','admin','moderatora']} children={<ModeratorLayout/>}/>,
    children:[{
      path:'dashboard',
      element:<Home/>
    },
    {
      path:'myPost',
      element:<MypostPage/>
    },
    {
      path:'users-post',
      element:<ExplorePage/>
    }
  ]
  },
  {
    path:'/admin/',
    element:<ProtectedRoute allowedRoles={['user','admin','moderatora']} children={<AdminLayout/>}/>,
    children:[{
      path:'dashboard',
      element:<Home/>
    },
    {
      path:'active-users',
      element:<UsersCard/>
    },
    {
      path:'myPost',
      element:<MypostPage/>
    },
    {
      path:'explore-users',
      element:<ExplorePage/>
    },
  ]
},
{
  path:'*',
  element:<PageNotFound/>
}

])

const queryClient = new QueryClient()
  return (
    <>
    <GoogleOAuthProvider clientId="188177420369-4euf5cq0dhcc8pl18t8ghe284rka9b6f.apps.googleusercontent.com">

    <QueryClientProvider client={queryClient}>

    <ToastContainer/>
  <RouterProvider router={Router}/>
    </QueryClientProvider>
   
    </GoogleOAuthProvider>
      
    </>
  )
}

export default App
