import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";

import Loading from "../Loading/Loading";
import LogoutButton from "../Logout/LogoutButton";
import notify from "../../helpers/toastify";

import "./Profile.css";

/**
 * Profile component displays user information and provides a form to send an email.
 * It handles email sending and loading state while notifying the user about the status.
 */
const Profile = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the form submission and sends an email using the emailjs library.
   * Displays loading state and notifies the user about the email sending status.
   *
   * @param {object} e - The form submission event.
   */
  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ehf6gcn",
        "template_c6cu5mq",
        e.target,
        "UFfk9o2ZwuCjjRv3-"
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          notify(
            "F8 đã nhận được câu hỏi của bạn. Vui lòng chờ phản hồi từ F8!",
            "success"
          );
        },
        (error) => {
          console.log(error.text);
          notify("Gửi email không thành công. Vui lòng thử lại!", "error");
        }
      );
  };

  return (
    <>
      {isAuthenticated && (
        <section>
          {user?.picture && <img src={user.picture} alt={user.name} />}
          <h2>Xin chào: {user?.name}</h2>
          <p>Vị trí: {user?.locale === "vi" ? "Tiếng Việt" : user.locale}</p>
          <p>
            Email: <a href={`mailto:${user?.email}`}>{user?.email}</a>
          </p>

          <form action="" className="form-container" onSubmit={sendEmail}>
            <label htmlFor="name">Tên của bạn: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tên của bạn"
              defaultValue={user.name}
            />
            <label htmlFor="email">Email của bạn: </label>
            <input
              type="email"
              name="user_email"
              id="email"
              placeholder="Nhập email của bạn"
              defaultValue={user.email}
            />
            <label htmlFor="message">Tin nhắn: </label>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Nhập tin nhắn của bạn"
              defaultValue="Tôi cần trợ giúp bài tập về nhà!"
            />
            <button type="submit" className="btn-support">
              Yêu cầu hỗ trợ!
            </button>
          </form>
          <LogoutButton />
        </section>
      )}
      {(isLoading || loading) && <Loading />}
      <ToastContainer />
    </>
  );
};

export default Profile;
