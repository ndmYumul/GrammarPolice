import "./App.css";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { useState } from "react";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  return (
    <div className="App">
      {currentScreen === "login" ? (
        <LoginScreen
          onNavigateToRegister={() => setCurrentScreen("register")}
        />
      ) : (
        <RegisterScreen onNavigateToLogin={() => setCurrentScreen("login")} />
      )}
    </div>
  );
}

export default App;
