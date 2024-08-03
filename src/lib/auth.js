import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";

const AuthContext = createContext();
const apiURL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const { log } = useDevmode();
  const [isLoggedin, setIsLoggedin] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (reqdata) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ name: reqdata.name, phone: reqdata.phone, email: reqdata.email, password: reqdata.password }));
      const url = `${apiURL}/main/signup`;
      const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const signupresponse = response.data;
      if (!signupresponse.error) {
        log("successfully signed up:", signupresponse);
      } else if (!signupresponse.status) {
        log("invalid username or password!");
        return;
      } else {
        log("please check your internet connection and try again.");
        return;
      }
    } catch (error) {
      console.error("error occurred during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (reqdata, provider) => {
    try {
      const formData = new FormData();
      formData.append("username", reqdata.username);
      formData.append("password", reqdata.password);
      formData.append("provider", provider);
      const url = `${apiURL}/authapi/login`;
      const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const loginresponse = response.data;
      if (loginresponse.status) {
        const userdata = loginresponse.data[0];
        const { email } = userdata;
        const userDataString = JSON.stringify(userdata);
        sessionStorage.setItem("userdata", userDataString);
        sessionStorage.setItem("logged-in", "true");
        sessionStorage.setItem("username", email);
        setIsLoggedin(true);
        alert(`Kamu berhasil login. Selamat datang kembali, ${userdata.name}!`);
        log("login credential:", userdata);
        console.log("successfully logged in.");
      } else if (!loginresponse.status) {
        setIsLoggedin(false);
        alert("Username atau Password yang kamu masukkan salah.");
        log("login response:", loginresponse);
        console.log("invalid username or password!");
      } else {
        setIsLoggedin(false);
        alert("Ada kesalahan saat login. Periksa koneksi internet dan coba lagi.");
        log("login response:", loginresponse);
        console.log("please check your internet connection and try again.");
      }
    } catch (error) {
      setIsLoggedin(false);
      alert("Permintaan tidak dapat di proses. Mohon coba sesaat lagi.");
      console.error("error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("userdata");
      sessionStorage.removeItem("logged-in");
      sessionStorage.removeItem("username");
      setIsLoggedin(false);
      alert("Kamu berhasil logout. Mohon login ulang untuk mengakses Dashboard.");
      log("successfully logged out");
    } catch (error) {
      alert("danger", "Permintaan tidak dapat di proses. Mohon coba sesaat lagi.");
      console.error("error occurred during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const auth = async () => {
    try {
      const loggedin = sessionStorage.getItem("logged-in");
      const username = sessionStorage.getItem("username");
      if (loggedin === "true" && username) {
        setIsLoggedin(true);
        log("user logged in and ip-address matched");
      } else {
        sessionStorage.removeItem("userdata");
        sessionStorage.removeItem("logged-in");
        sessionStorage.removeItem("username");
        setIsLoggedin(false);
        log("user is not logged in");
      }
    } catch (error) {
      console.error("error occurred during authentication check:", error);
    } finally {
      setLoading(false);
    }
  };

  const username = sessionStorage.getItem("username");
  const userDataString = sessionStorage.getItem("userdata");
  const userData = JSON.parse(userDataString);

  useEffect(() => {
    auth();
  }, [location.pathname]);

  if (isLoggedin === null || loading) {
    return <div>Authenticating ...</div>;
  }

  return <AuthContext.Provider value={{ loading, isLoggedin, signup, login, logout, username, userData }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
