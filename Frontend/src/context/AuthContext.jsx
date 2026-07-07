import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);

  const data = {
    user,
    setUser,
    loading,
    setLoading,
    isLogedin,
    setIsLogedin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
