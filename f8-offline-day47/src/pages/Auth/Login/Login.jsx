import { useState } from 'react'
import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'

import { emailRegex } from '~/utils/regex'
import getApiKey from '~/utils/getApiKey'
import notify from '~/utils/toastify'
import Loading from '~/components/Loading/Loading'
import './Login.css'

/**
 * Login component to allow users to log in with their email.
 *
 * @param {object} props - React component props.
 * @param {function} props.onLoginSuccess - Callback function when login is successful.
 */
function Login({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false)

  /**
   * Handles form submission for user login.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmitLogin = (e) => {
    e.preventDefault()

    const emailUser = e.target.email.value
    if (emailRegex(emailUser)) {
      setLoading(true)
      getApiKey(emailUser).then((responseData) => {
        setLoading(false)
        const { apiKey, email, response } = responseData
        if (apiKey && email && response.ok) {
          onLoginSuccess(apiKey, email)
        } else {
          notify(`${responseData.message}`, 'error')
          localStorage.removeItem('apiKey')
          localStorage.removeItem('email')
        }
      })
    } else {
      notify('Vui lòng nhập đúng định dạng Email!', 'error')
    }
  }

  return (
    <div className="login-container">
      <div className="overlay"></div>

      <div className="login-content">
        <img
          alt="Trello"
          className="trello-main-logo"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
        ></img>
        <div className="content-container">
          <h1 className="title">Đăng nhập vào Trello</h1>
          <p className="description">
            Vui lòng nhập địa chỉ email đã đăng ký F8
          </p>
          <form className="login-form" onSubmit={handleSubmitLogin}>
            <input type="text" placeholder="Email của bạn..." name="email" />

            <button className="btn-login" type="submit">
              Login
            </button>
          </form>
          <span className="or">HOẶC</span>
          <a href="#!" className="btn ">
            <span className="icon icon-google"></span>
            <span className="label">Tiếp tục với Google</span>
          </a>

          <a href="#!" className="btn ">
            <span className="icon icon-microsoft"></span>
            <span className="label">Tiếp tục với Microsoft</span>
          </a>

          <a href="#!" className="btn ">
            <span className="icon icon-apple"></span>
            <span className="label">Tiếp tục với Apple</span>
          </a>

          <a href="#!" className="btn ">
            <span className="icon icon-slack"></span>
            <span className="label">Tiếp tục với Slack</span>
          </a>
        </div>
      </div>
      {loading && <Loading />}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Login

Login.propTypes = {
  onLoginSuccess: PropTypes.func,
}
