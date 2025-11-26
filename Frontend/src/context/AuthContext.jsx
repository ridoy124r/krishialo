import React, { createContext, useState, useEffect } from "react";
// ✅ CORRECT IMPORT:
import { authAPI } from "../api/apiServices"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Example of where the error likely is (Line ~19):
  useEffect(() => {
    const checkUser = async () => {
      try {
        // ✅ CORRECT USAGE:
        // Make sure you are using 'authAPI', not 'api' or something else
        const res = await authAPI.getProfile(); 
        setUser(res.data);
      } catch (err) {
        console.log("Not logged in");
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};