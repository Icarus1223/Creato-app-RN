import React, { createContext, useContext, useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { storage } from "./storage";
import { SET_USER } from "../redux/actionTypes";
import { GoogleLogin, getUserByEmail } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (isNewUser, accessToken) => {
    const firebaseUser = auth().currentUser;
    const authUser = await GoogleLogin(isNewUser, firebaseUser);

    if(authUser) {
      dispatch({ type: SET_USER, payload: authUser });
      setIsAuthenticated(true);
      await storage.setItem("accessToken", accessToken);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await storage.getItem("accessToken");
      if(token) {
        const firebaseUser = auth().currentUser;
        const authUser = await getUserByEmail(firebaseUser.email);
        if(authUser) {
          dispatch({ type: SET_USER, payload: authUser });
          setIsAuthenticated(true);
        }
      }
    }
    getToken()
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);