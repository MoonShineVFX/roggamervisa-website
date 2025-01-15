import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// 導入頁面組件
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import CharacterPage from "./pages/CharacterPage";
import CameraPage from "./pages/CameraPage";
import FinalPage from "./pages/FinalPage";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePage>
              <HomePage />
            </AnimatePage>
          }
        />
        <Route
          path="/team"
          element={
            <AnimatePage>
              <TeamPage />
            </AnimatePage>
          }
        />
        <Route
          path="/character"
          element={
            <AnimatePage>
              <CharacterPage />
            </AnimatePage>
          }
        />
        <Route
          path="/camera"
          element={
            <AnimatePage>
              <CameraPage />
            </AnimatePage>
          }
        />
        <Route
          path="/final"
          element={
            <AnimatePage>
              <FinalPage />
            </AnimatePage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const AnimatePage = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>{children}</motion.div>
    </AnimatePresence>
  );
};

export default App;
