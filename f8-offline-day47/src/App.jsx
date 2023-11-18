import { useEffect, useState } from 'react'

import Login from '~/pages/Auth/Login/Login'
import notify from '~/utils/toastify'
import BoardDetail from './pages/Boards/BoardDetail'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [apiKey, setApiKey] = useState(null)

  useEffect(() => {
    let apiKey = localStorage.getItem('apiKey')
    if (apiKey) {
      setApiKey(apiKey)
    } else {
      notify('Vui lòng đăng nhập để đặt hàng', 'warning')
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
    setApiKey(apiKey)
  }
  return (
    <>
      <BoardDetail />
      {!apiKey && <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  )
}

export default App
