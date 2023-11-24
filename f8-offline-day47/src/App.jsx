import { useEffect, useState } from 'react'

import Login from '~/pages/Auth/Login/Login'
import notify from '~/utils/toastify'
import BoardDetail from './pages/Boards/BoardDetail'

import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from './components/Loading/Loading'

function App() {
  const [apiKey, setApiKey] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let storedApiKey = localStorage.getItem('apiKey')
    if (storedApiKey) {
      setApiKey(storedApiKey)
      // Simulating a 1-second loading delay
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } else {
      notify('Vui lòng đăng nhập để tiếp tục', 'warning')
      setIsLoading(false)
    }
  }, [])

  /**
   * Function to handle a successful login operation.
   *
   * @param {string} apiKey - The API key received upon successful login.
   * @param {string} email - The user's email address.
   */
  const handleLoginSuccess = (apiKey, email) => {
    notify('Chào bạn ' + email.slice(0, email.indexOf('@')), 'success')
    localStorage.setItem('apiKey', apiKey)
    localStorage.setItem('email', email)
    // Simulating a 1-second loading delay
    setIsLoading(true)
    setTimeout(() => {
      setApiKey(apiKey)
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!apiKey) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return <BoardDetail />
}

// return (
//   <>
//     {isLoading && <Loading />}
//     {!isLoading && <BoardDetail />}
//     {!apiKey && <Login onLoginSuccess={handleLoginSuccess} />}
//   </>
// )
// }

export default App
