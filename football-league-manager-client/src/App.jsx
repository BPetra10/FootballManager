import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeaguePage from "./pages/LeaguePage";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/league/:id" element={<LeaguePage />} />

                <Route path="/team/:id" element={<TeamPage />} />

                <Route path="/player/:id" element={<PlayerPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;