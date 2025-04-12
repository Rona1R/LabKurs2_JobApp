import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn,setLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const user = JSON.parse(localStorage.getItem("user")) || null
  const accessToken = localStorage.getItem("accessToken") || null
  
  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    setLoggedIn(true);
    // setUser(JSON.parse(localStorage.getItem("user")));
    // setAccessToken(localStorage.getItem("accessToken"));
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setLoggedIn(false);
    // setUser(null);
    // setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn,user, accessToken, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
