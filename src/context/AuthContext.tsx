import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    isActive: boolean;
}

interface AuthContextProps {
    isLoggedIn: boolean;
    user: User | null;
    login: (access_token: string, name: string, surname:string, email:string, id:string) => void;
    logout: () => void;
    isLoading: boolean;
    setIsLoggedIn?: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUser(data.user);
                        setIsLoggedIn(true);
                    } else {
                        logout();
                    }
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setIsLoggedIn(false);
        }
    }, []);


    const login = (access_token: string, name: string, surname: string, email: string, id:string) => {
        setUser({name, surname, email, id, isActive: true});
        setIsLoggedIn(true);
        localStorage.setItem("access_token", access_token);
        navigate("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
