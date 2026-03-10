import "./App.css";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import { useState } from "react";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login");

  return (
    <div className="App">
      {currentScreen === "login" ? (
        <LoginScreen
          onNavigateToRegister={() => setCurrentScreen("register")}
          onLoginSuccess={() => setCurrentScreen("home")}
        />
      ) : currentScreen === "register" ? (
        <RegisterScreen
          onNavigateToLogin={() => setCurrentScreen("login")}
          onRegisterSuccess={() => setCurrentScreen("home")}
        />
      ) : (
        <HomeScreen onLogout={() => setCurrentScreen("login")} />
      )}
    </div>
  );
}

export default App;
