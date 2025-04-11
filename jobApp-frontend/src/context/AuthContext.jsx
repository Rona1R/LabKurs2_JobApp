import React, {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
    // setUser(user);
    // setAccessToken(token);
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // setUser(null);
    // setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
