import React, { useState, useContext, useEffect } from "react";
import URL from "../Json/Url.json";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getAccessToken() {
      let res = await fetch(`${URL.APIURL}/auth/refresh`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const { currentUser } = await res.json();
      if (currentUser) setUser(currentUser)
    }
    console.log({user})
    getAccessToken();
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
