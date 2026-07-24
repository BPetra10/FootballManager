import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LeaguePage from "./pages/LeaguePage";
import LeagueDetailsPage from "./pages/LeagueDetailsPage/LeagueDetailsPage";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/Admin/AdminPage";
import MyTeamPage from "./pages/Manager/MyTeamPage";
import ProtectedRoute from "./routes/ProtectedRoute";

import Header from "./components/layout/Header";

import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Routes>

                    <Route path="/" element={<HomePage />} />

                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/leagues" element={<LeaguePage />} />

                    <Route
                        path="/league/:id"
                        element={<LeagueDetailsPage />}
                    />

                    <Route path="/team/:id" element={<TeamPage />} />

                    <Route path="/player/:id" element={<PlayerPage />} />

                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute role="Admin">
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/my-team"
                        element={
                            <ProtectedRoute role="TeamManager">
                                <MyTeamPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;