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
import OrgPost from './pages/organisation/OrgPost.tsx'
import OrgProfile from './pages/organisation/OrgProfile.tsx'
import OrgPostView from './pages/organisation/OrgPostView.tsx'
import OrgHome from './pages/organisation/OrgHome.tsx'
import NotificationPage from './pages/account/NotificationPage.tsx'
import MedicalChatbot from './pages/Chatbot.tsx'
import Protected from './components/layouts/Protected.tsx'
import PublicRoutes from './components/layouts/PublicRoutes.tsx'
import PostForm from './components/organisation/post/PostForm.tsx'
import BloodBridgeRequest from './pages/BloodBridgeRequest.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: '*', element: <Error404 /> },
      {
        path: 'bloodbridge',
        element: <Protected role="user"><BloodBridge /></Protected>
      },
      {
        path: 'bloodbridge/request/:id',
        element: <Protected role="user"><BloodBridgeRequest /></Protected>
      },
      {
        path: 'chatbot',
        element: <Protected role="user"><MedicalChatbot /></Protected>
      },
      { path: 'posts', element: <Protected role="user"><OrgPost /></Protected> },
      { path: 'org-profile/:id', element: <OrgProfile /> },
      { path: 'post/:id', element: <OrgPostView /> },
      { path: 'notifications', element: <Protected role="user"><NotificationPage /></Protected> },
      { 
        path: 'discussions', 
        element: <Protected role="user"><Discussions /></Protected>,
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
      { path: '', element: <OrgHome /> },
      { path: '*' , element: <Error404 /> },
      { path: 'posts', element: <Protected role="organization"><OrgPost /></Protected> },
      { path: 'org-profile/:id', element: <OrgProfile /> },
      { path: 'post/:id', element: <OrgPostView /> },
      { path: 'create', element: <Protected role="organization"><PostForm /></Protected> },
      { path: 'edit/:id', element: <Protected role="organization"><PostForm /></Protected> }
    ]
  },
  { path: 'register', element: <PublicRoutes role="organization"><OrganizationSignup /></PublicRoutes> },
  { path: 'signin', element: <PublicRoutes role="organization"><OrganizationLogin /></PublicRoutes> },
  { 
    path: 'login',
    element: <PublicRoutes role="user"><Login /></PublicRoutes>
  },
  {
    path: 'signup',
    element: <PublicRoutes role="user"><Signup /></PublicRoutes>
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
