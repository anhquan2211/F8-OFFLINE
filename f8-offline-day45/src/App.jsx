import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ToastContainer } from "react-toastify";
import { useLayoutEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Provider from "./Provider/Provider";
import Form from "./components/Form/Form";
import Result from "./components/Result/Result";
import TableResult from "./components/Table/Table";

/**
 * Main application component.
 * Manages theme, rendering components, and displaying notifications.
 * @returns {JSX.Element} The rendered application.
 */
const App = () => {
  const { colorMode, setColorMode } = useColorMode();

  // Set theme from localStorage on initial render
  useLayoutEffect(() => {
    const themeLocal = localStorage.getItem("theme");
    if (themeLocal) {
      setColorMode(themeLocal);
    }
  }, []);

  // Toggle between light and dark theme
  const handleTheme = () => {
    const themeToggle = colorMode === "light" ? "dark" : "light";
    setColorMode(themeToggle);
    localStorage.setItem("theme", themeToggle);
  };

  return (
    <Provider>
      {/* Button to toggle theme */}
      <IconButton
        onClick={handleTheme}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        variant="solid"
        style={{ position: "absolute", top: 30, left: 30 }}
      />
      {/* Components */}
      <Result />
      <Form />
      <TableResult />
      {/* Notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={colorMode === "light" ? "dark" : "light"}
      />
    </Provider>
  );
};

export default App;
