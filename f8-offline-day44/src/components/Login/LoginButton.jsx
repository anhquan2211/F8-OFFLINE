import { useAuth0 } from "@auth0/auth0-react";

import Loading from "../Loading/Loading";
import "./Login.css";

/**
 * LoginButton component provides a button for users to sign in or sign out. It checks the user's
 * authentication status and shows the appropriate UI. If the user is not authenticated, they are
 * encouraged to sign in and access the services.
 */
const LoginButton = () => {
  const { isLoading, loginWithPopup, isAuthenticated } = useAuth0();

  return (
    <>
      {isLoading && <Loading />}
      {!isAuthenticated && (
        <div className="container">
          <p>Cảm ơn bạn đã sử dụng dịch vụ của F8</p>
          <p>
            Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy <b>đăng nhập</b> và đặt
            câu hỏi tại đây!
          </p>
          <button onClick={() => loginWithPopup()}>Sign In || Sign Out</button>
        </div>
      )}
    </>
  );
};

export default LoginButton;
