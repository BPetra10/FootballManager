import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const login = async (jwtToken) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);

        const currentUser =
            await getCurrentUser();

        setUser(currentUser);

        return currentUser;

    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    };

    useEffect(() => {

        async function loadUser() {

            if (!token) {

                setUser(null);

                setLoading(false);

                return;

            }

            try {

                const currentUser =
                    await getCurrentUser();

                setUser(currentUser);

            }
            catch {

                localStorage.removeItem("token");

                setToken(null);

                setUser(null);

            }

            setLoading(false);

        }

        loadUser();

    }, [token]);

    return (

        <AuthContext.Provider
            value={{

                token,

                user,

                login,

                logout,

                loading,

                isAuthenticated: !!token

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}