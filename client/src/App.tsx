import { Outlet } from 'react-router'
import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import SomethingWrong from './components/errors/SomethingWrong'
import { useDispatch } from 'react-redux'
import { toggleTheme as changeTheme } from './store/themeSlice'
import Logo from "./assets/Logo.png"

function App() {
  const dispatch = useDispatch()
  const toggleTheme = () => {
    dispatch(changeTheme())
  }
  return (
    <ErrorBoundary FallbackComponent={SomethingWrong}>
      {/* <h1 className='text-3xl bg-primary dark:bg-dark-bg dark:text-dark-text'>Health Sphere</h1> */}
      {/* <button onClick={toggleTheme}>Theme</button> */}
      <div>
        <img src={Logo} alt="" />
      </div>
      <Outlet />
    </ ErrorBoundary>
  )
}

export default App
