import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import Home from './pages/Home.tsx'
import Error404 from './components/errors/Error404.tsx'
import Login from './pages/account/Login.tsx'
import Signup from './pages/account/Signup.tsx'
import BloodBridge from './pages/BloodBridge.tsx'
import Discussions from './pages/Discussions.tsx'
import DiscussionPost from './components/discussion/DiscussionPost.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import Layout from './pages/organisation/Layout.tsx'
import OrganizationSignup from './pages/organisation/auth/OrganizationSignup.tsx'
import OrganizationLogin from './pages/organisation/auth/OrganisationLogin.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: '*', element: <Error404 /> },
      {
        path: 'bloodbridge',
        element: <BloodBridge />
      },
      { 
        path: 'discussions', 
        element: <Discussions />,
        children: [
        ]
      },
      { path: 'discussions/:id', element: <DiscussionPost /> }
    ]
  },
  {
    path: 'organisation',
    element: <Layout />,
    children: [
      
    ]
  },
  { path: 'register', element: <OrganizationSignup /> },
  { path: 'signin', element: <OrganizationLogin /> },
  { 
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <Signup />
  }, 
])

let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
