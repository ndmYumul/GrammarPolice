import "./App.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentScreen, setCurrentScreen] = useState("login");

  // If authenticated, show home screen
  if (isAuthenticated) {
    return (
      <div className="App">
        <HomeScreen />
      </div>
    );
  }

  // Otherwise show login/register
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
