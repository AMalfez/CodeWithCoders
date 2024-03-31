"use client"
import { useState } from "react";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [templeData,setTempleData] = useState([])

  return (
    <AuthContext.Provider value={{ user, setUser,templeData,setTempleData }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider