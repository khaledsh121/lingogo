import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Wellcome from "../screens/Wellcome/Wellcome";
import Login from "../screens/LogIn/Login";
import Signup from "../screens/Signup/Signup";
import Dashboard from "../screens/Dashboard/Dashboard";
import PresentationPage from "../screens/Presentation/PresentationPage";
import CreatePresentationPage from "../screens/CreatePresentationPage/CreatePresentationPage";
import SubmitPresentationPage from "../screens/SubmitPresentationPage/SubmitPresentationPage";
import ProfilePage from "../screens/ProfilePage/ProfilePage";
import AiChatPage from "../screens/AiChatPage/AiChatPage";
import ChatPage from "../screens/ChatPage/ChatPage";
import RealScenarioSelectLevelPage from "../screens/RealScenarioSelectLevelPage/RealScenarioSelectLevelPage";
import LevelPage from "../screens/LevelPage/LevelPage";
import ShowPresentationPage from "../screens/ShowPresentationPage/ShowPresentationPage";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Wellcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ShowPresentation" element={<ShowPresentationPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Presentation" element={<PresentationPage />} />
          <Route
            path="/CreatePresentation"
            element={<CreatePresentationPage />}
          />
          <Route
            path="/SubmitPresentation"
            element={<SubmitPresentationPage />}
          />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Chat" element={<ChatPage />} />
          <Route path="/AiChat" element={<AiChatPage />} />
          <Route
            path="/realScenario"
            element={<RealScenarioSelectLevelPage />}
          />
          <Route path="/level" element={<LevelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
