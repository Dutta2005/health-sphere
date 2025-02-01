// App.tsx
import { Outlet } from 'react-router'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import SomethingWrong from './components/errors/SomethingWrong'
import Navbar from './components/navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { initializeSocket } from './utils/socket'
import { addNotification } from './store/notificationSlice'

function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.theme);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!userId) return;
    
    const socket = initializeSocket(userId);

    socket.on("bloodRequest", (notification) => {      
      dispatch(addNotification(notification));
    });

    socket.on("comment", (notification) => {
      dispatch(addNotification(notification));
    })

    return () => {
      socket.disconnect();
    };
  }, [userId, dispatch]);

  return (
    <ErrorBoundary FallbackComponent={SomethingWrong}>
      <Navbar />
      <div className='pt-16 bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text min-h-screen'>
        <Outlet />
      </div>
    </ErrorBoundary>
  )
}

export default App