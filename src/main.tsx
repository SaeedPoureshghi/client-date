// import React from 'react';
import ReactDOM from 'react-dom/client'
import {createHashRouter,RouterProvider } from 'react-router-dom'
import Home from './screens/Home'
import CreateProfile from './screens/CreateProfile'
import UserProfile from './screens/UserProfile'
import OtherProfile from './screens/OtherProfile'
import Splash from './screens/Splash'




import WebApp from '@twa-dev/sdk'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

WebApp.ready();
WebApp.expand();

 
// const router = createBrowserRouter([
//   {
//   path: "/",
//   element: <Splash />,
//   },
// {
// path: "home",
// element: <Home />,
// },
// {
//   path: "create",
//   element: <CreateProfile/>
// }
// ,
// {
//   path: "profile",
//   element: <UserProfile/>
// },
// {
//   path: "profile/:id",
//   element: <OtherProfile/>
// }
// ],{basename: "/client-date"})

const router = createHashRouter([
  {
  path: "/",
  element: <Splash />,
  },
{
path: "home",
element: <Home />,
},
{
  path: "create",
  element: <CreateProfile/>
}
,
{
  path: "profile",
  element: <UserProfile/>
},
{
  path: "profile/:id",
  element: <OtherProfile/>
}
],{basename: "/client-date"})

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <TonConnectUIProvider manifestUrl='https://saeedpoureshghi.github.io/client-date/tonconnect-manifest.json' 
  actionsConfiguration={
    {
      twaReturnUrl:'https://saeedpoureshghi.github.io/client-date/',
    }
  }
  >
    <RouterProvider  router={router}/>
   </TonConnectUIProvider>
      
  
    
  
)
