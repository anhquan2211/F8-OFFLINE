import { useState } from "react";
import LoginButton from "./components/Login/LoginButton";
import Profile from "./components/Profiles/Profile";

const App = () => {
  return (
    <main>
      <LoginButton />
      <Profile />
    </main>
  );
};

export default App;
