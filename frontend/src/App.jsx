import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";


const App = () => {
  return (
    <>
      <Routes>
         <Route path="*" element={<NotFoundPage />} />
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegistrationPage />} />
         <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;