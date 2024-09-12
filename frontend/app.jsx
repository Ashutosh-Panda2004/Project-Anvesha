import React from "react";
import HomePage from "./Components/homePage/homepage";
import LoginSignup from "./Components/login_signup/login_signup";
import TextEditor from "./Components/login_signup/text_editor";

function App() {
  return (
    <div>
      <HomePage />
      <LoginSignup/>
      <TextEditor/>
    </div>
  );
}

export default App;
