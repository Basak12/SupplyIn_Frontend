import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id?: string;
    name: string;
    surname: string;
    email: string;
}

interface AuthContextProps {
    isLoggedIn: boolean;
    user: User | null;
    login: (token: string, name: string, surname:string, email:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log('1111', token)
        if (token) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
                });
        }
    }, []);

    const login = (token: string, name: string, surname:string, email:string) => {
        localStorage.setItem("access_token", token);
        console.log('login', token)
        // TODO: Implement token verification endpoint in backend
        // todo her refresh yaptığımda logout yapıyor
        setIsLoggedIn(true);
        navigate("/dashboard");
        setUser({
            name: name,
            surname: surname,
            email: email,
        })
/*
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                    setIsLoggedIn(true);
                    navigate("/dashboard");
                }
            });
 */
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
