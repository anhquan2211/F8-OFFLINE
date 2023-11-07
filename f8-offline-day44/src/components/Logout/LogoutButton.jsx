import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Slide, ToastContainer } from "react-toastify";

import Loading from "../Loading/Loading";
import notify from "../../helpers/toastify";
import "./Logout.css";

/**
 * LogoutButton component provides a button for users to sign out.
 * It handles the sign-out process and displays a loading spinner during the operation.
 */
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const notifyIdRef = useRef(null);

  /**
   * Handles the user sign-out process. It sets a loading state, performs the sign-out, and
   * redirects the user back to the application home page.
   */
  const handleLogout = () => {
    setIsLoggingOut(true);
    notifyIdRef.current = setTimeout(() => {
      notify("Đăng xuất thành công!", "success");
    }, 500);

    setTimeout(() => {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (notifyIdRef.current) {
        clearTimeout(notifyIdRef.current);
      }
    };
  }, []);

  return (
    <>
      {isLoggingOut && <Loading />}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="btn-logout"
          disabled={isLoggingOut}
        >
          Sign Out
        </button>
      )}
      {isLoggingOut && <ToastContainer transition={Slide} />}
    </>
  );
};

export default LogoutButton;
