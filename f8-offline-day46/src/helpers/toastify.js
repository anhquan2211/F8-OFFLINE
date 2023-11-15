import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Displays a notification using the toast library.
 *
 * @param {string} msg - The message to be displayed in the notification.
 * @param {string} type - The type of the notification. This can be one of the types supported by the toast library.
 * @param {function} onClick - The function to be executed when the notification is clicked.
 * @param {number} [timing=3000] - The duration for which the notification should be displayed, in milliseconds. Defaults to 3000ms.
 */
const notify = (msg, type, onClick, timing = 2500) => {
  toast[type](msg, {
    position: "top-left",
    autoClose: timing,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    onClick: onClick,
    theme: "dark",
  });
};

export default notify;
