import React, { useState, useContext, useEffect } from "react";
import URL from "../Json/Url.json";

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState({ currentUser: null });
  useEffect(() => {
    async function getAccessToken() {
      let res = await fetch(`${URL.APIURL}/user/readData`, {
        credentials: "include",
        method: "post"
      });
      if (!res.ok) return;
      const { currentUser } = await res.json();
      if (currentUser) setUser((prev) => ({ ...prev, currentUser }));
    }
    getAccessToken();
  }, []);

  const value = {
    ...user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
