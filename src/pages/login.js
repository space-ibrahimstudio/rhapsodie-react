import React, { Fragment, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, facebook, google } from "../lib/firebaseConfig";
import { useAuth } from "../lib/auth";
import { SEO } from "../lib/seo";
import { inputValidator } from "../lib/controller";
import PageLayout from "../components/frames/pages";
import PortalSection from "../sections/portal-section";
import Image from "../components/contents/image";
import PortalForm, { FormFieldset } from "../components/inputs/portal-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const { log } = useDevmode();
  const { isLoggedin, login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsLogin(true);
      log("user oauth data:", result);
      const resfbdata = {
        user: {
          uid: "92JaSPFTW2YHa1P6ZUtG4l83V8A3",
          email: "ibrahimcpersonal@gmail.com",
          emailVerified: false,
          displayName: "Maulana Malik Ibrahim",
          isAnonymous: false,
          photoURL: "https://graph.facebook.com/501863505571139/picture",
          providerData: [
            {
              providerId: "facebook.com",
              uid: "501863505571139",
              displayName: "Maulana Malik Ibrahim",
              email: "ibrahimcpersonal@gmail.com",
              phoneNumber: null,
              photoURL: "https://graph.facebook.com/501863505571139/picture",
            },
          ],
          stsTokenManager: {
            refreshToken: "AMf-vBz8uZ4Z9Aa0TOFXHBdRMTqKCzB0jWjfN7Vb3wqOYsmEneHv8LP3y08-0_KosHzYSuMC3WpcV9QHx8HazyVtaUMyaAn4OvZDakQHzFA47qLylWAM63rURmaqisqoP9s1HERzYh46st87BjWCzGcIliyKekkylbovAdAdPnSeBLx5jia5SMcwWNx6zmqB6IS_HkNJ2UqI2srJarQBvx9YTD4nyQe9ZFiQxdZLIEzgwwlmkKyXHlmlQw9-ozMdFGVL7wNba03TilVjFRVhD8qGBrkDlqRQFUG0A1HRUHdH61ai_NksRecKKAc3eJdlGmPzTVGaXwkU7LWznk-4h0yUWyJyWo7tSWlHsyX0N7eVqToIJi8ouv78obMFNt3D7FnD7pl0mQ6E",
            accessToken:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF1bGFuYSBNYWxpayBJYnJhaGltIiwicGljdHVyZSI6Imh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLzUwMTg2MzUwNTU3MTEzOS9waWN0dXJlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JoYXBzb2RpZS1yZWFjdCIsImF1ZCI6InJoYXBzb2RpZS1yZWFjdCIsImF1dGhfdGltZSI6MTcyMjA3NjIyMSwidXNlcl9pZCI6IjkySmFTUEZUVzJZSGExUDZaVXRHNGw4M1Y4QTMiLCJzdWIiOiI5MkphU1BGVFcyWUhhMVA2WlV0RzRsODNWOEEzIiwiaWF0IjoxNzIyMDc2MjIxLCJleHAiOjE3MjIwNzk4MjEsImVtYWlsIjoiaWJyYWhpbWNwZXJzb25hbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjUwMTg2MzUwNTU3MTEzOSJdLCJlbWFpbCI6WyJpYnJhaGltY3BlcnNvbmFsQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.Ib4-FMQ8VY3dT9n0PxgL1IJaGMJyRLPOEb0xf7WlvfLYkYKOisTr4i1A-RQwWTC-j3kA9Qg6jIpUGntWgZ4Qf9vNYRWcn5hRrSrVJq9kIGb3YkcXNTr4py-bVwguowFlNkJvqMqQkoAM-BZHgyTBXiH7RoiPjpYFWBJkDmcuEPvFrEkd3-t_uZT76VtGzuCmFECPhtzh7aakNnZM1CRTin4PVRsJ4o9Ga1IRQOgYz-er5MTsUry06OTlMrgNAW69MNt3nzCS-9bKm4rFoVQ6P49v2HKkYMDHbl0mpXShGgL5IRJ3FUvxIMYZ-cGT_Z9X-8w7Q7XgEG2VwgiCvlBgvQ",
            expirationTime: 1722079821952,
          },
          createdAt: "1722076221561",
          lastLoginAt: "1722076221561",
          apiKey: "AIzaSyDaEoS1jAe5hk2dU9URv_zZBHqt5eCclvU",
          appName: "[DEFAULT]",
        },
        providerId: "facebook.com",
        _tokenResponse: {
          federatedId: "http://facebook.com/501863505571139",
          providerId: "facebook.com",
          email: "ibrahimcpersonal@gmail.com",
          emailVerified: false,
          firstName: "Maulana",
          fullName: "Maulana Malik Ibrahim",
          lastName: "Ibrahim",
          photoUrl: "https://graph.facebook.com/501863505571139/picture",
          localId: "92JaSPFTW2YHa1P6ZUtG4l83V8A3",
          displayName: "Maulana Malik Ibrahim",
          idToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF1bGFuYSBNYWxpayBJYnJhaGltIiwicGljdHVyZSI6Imh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLzUwMTg2MzUwNTU3MTEzOS9waWN0dXJlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JoYXBzb2RpZS1yZWFjdCIsImF1ZCI6InJoYXBzb2RpZS1yZWFjdCIsImF1dGhfdGltZSI6MTcyMjA3NjIyMSwidXNlcl9pZCI6IjkySmFTUEZUVzJZSGExUDZaVXRHNGw4M1Y4QTMiLCJzdWIiOiI5MkphU1BGVFcyWUhhMVA2WlV0RzRsODNWOEEzIiwiaWF0IjoxNzIyMDc2MjIxLCJleHAiOjE3MjIwNzk4MjEsImVtYWlsIjoiaWJyYWhpbWNwZXJzb25hbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZmFjZWJvb2suY29tIjpbIjUwMTg2MzUwNTU3MTEzOSJdLCJlbWFpbCI6WyJpYnJhaGltY3BlcnNvbmFsQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.Ib4-FMQ8VY3dT9n0PxgL1IJaGMJyRLPOEb0xf7WlvfLYkYKOisTr4i1A-RQwWTC-j3kA9Qg6jIpUGntWgZ4Qf9vNYRWcn5hRrSrVJq9kIGb3YkcXNTr4py-bVwguowFlNkJvqMqQkoAM-BZHgyTBXiH7RoiPjpYFWBJkDmcuEPvFrEkd3-t_uZT76VtGzuCmFECPhtzh7aakNnZM1CRTin4PVRsJ4o9Ga1IRQOgYz-er5MTsUry06OTlMrgNAW69MNt3nzCS-9bKm4rFoVQ6P49v2HKkYMDHbl0mpXShGgL5IRJ3FUvxIMYZ-cGT_Z9X-8w7Q7XgEG2VwgiCvlBgvQ",
          context: "",
          oauthAccessToken: "EAAgTQrYHIU4BOze0s2VZAzSiARtI4ZCyN9gAcgc6wmnfbJHu5ztrqEKbgJhHZAYa4EHxGRFUScznTuty5SWPl2vDg1ZCPrXcLctlXMJzsyczuT3ePbJSmviJdMpOiqr6gxWMloDsiQTK4clzCKZAHQ9NdUvYZBg3Fj9QInyDsDjJbCdZAGBoLsNObZCbWZBjkhO4U9gyOY6RlqEOBI8ZBxSde1eBxW5n73qVJBBqqcjq8Ky6QUfhFEZCs6ZC",
          oauthExpireIn: 5183998,
          refreshToken: "AMf-vBz8uZ4Z9Aa0TOFXHBdRMTqKCzB0jWjfN7Vb3wqOYsmEneHv8LP3y08-0_KosHzYSuMC3WpcV9QHx8HazyVtaUMyaAn4OvZDakQHzFA47qLylWAM63rURmaqisqoP9s1HERzYh46st87BjWCzGcIliyKekkylbovAdAdPnSeBLx5jia5SMcwWNx6zmqB6IS_HkNJ2UqI2srJarQBvx9YTD4nyQe9ZFiQxdZLIEzgwwlmkKyXHlmlQw9-ozMdFGVL7wNba03TilVjFRVhD8qGBrkDlqRQFUG0A1HRUHdH61ai_NksRecKKAc3eJdlGmPzTVGaXwkU7LWznk-4h0yUWyJyWo7tSWlHsyX0N7eVqToIJi8ouv78obMFNt3D7FnD7pl0mQ6E",
          expiresIn: "3600",
          rawUserInfo: '{"name":"Maulana Malik Ibrahim","last_name":"Ibrahim","granted_scopes":["email","public_profile"],"id":"501863505571139","middle_name":"Malik","first_name":"Maulana","email":"ibrahimcpersonal@gmail.com","picture":{"data":{"is_silhouette":false,"width":100,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=501863505571139&height=100&width=100&ext=1724668221&hash=Aba0WylpaC9FMNKXTvXqsT8A","height":100}}}',
          isNewUser: true,
          kind: "identitytoolkit#VerifyAssertionResponse",
        },
        operationType: "signIn",
      };
      const resgldata = {
        user: {
          uid: "FIHkvaebaZX8kThE7jTGDu2tk5y1",
          email: "space.ibrahimstudio@gmail.com",
          emailVerified: true,
          displayName: "Ibrahim Space Studio",
          isAnonymous: false,
          photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLhwXQRxc31o0Uvg1odmYaVpfuxpMJt9U-61ueIOTcVCQVs0Ls=s96-c",
          providerData: [
            {
              providerId: "google.com",
              uid: "114546895393447171351",
              displayName: "Ibrahim Space Studio",
              email: "space.ibrahimstudio@gmail.com",
              phoneNumber: null,
              photoURL: "https://lh3.googleusercontent.com/a/ACg8ocLhwXQRxc31o0Uvg1odmYaVpfuxpMJt9U-61ueIOTcVCQVs0Ls=s96-c",
            },
          ],
          stsTokenManager: {
            refreshToken:
              "AMf-vBwvKYiPSOu4hbiUQe6bwV6r33r3JL5wtVdp5qbKGSaPVQYDxE7aEOHK0rCVRrpKfzt7QyOEVIuT3lT2-Wlsritqd6kzIFcyOv91Un-f_0EuHjE28Lc2hSWGC_uo1rLu3tTNg16F6Xopv3ZZtcOkEjuHRpN2QSOz2jDbet-xWxFk7gkg4LAs-5P40XdBQL_EvmBdzP85NVXIF46r194Lzce4iYsJXqH32lyjLpwNiKEi4-O21w9UDtner_7_g-K3MEeWK1oWeu6QDCcgBXkY_bVbAwou-L7cD8c1b21scFa5diteWPLiAxJD9PEZHiyvPK8hZ8Mc5_IjMkDTs5hdDNoqx_16nd8DW41QrsvKO0MXXp6IYmvTJW1zUBdCGW45CCCSrncLlK631lFbtOlxT2U3vzqcnXqjGwdlfJpoploOm3McDl1AVqrSgDCKWlaE4Y_INVyDiuSz_So_5lQcYT6sjfd3YQ",
            accessToken:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSWJyYWhpbSBTcGFjZSBTdHVkaW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGh3WFFSeGMzMW8wVXZnMW9kbVlhVnBmdXhwTUp0OVUtNjF1ZUlPVGNWQ1FWczBMcz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yaGFwc29kaWUtcmVhY3QiLCJhdWQiOiJyaGFwc29kaWUtcmVhY3QiLCJhdXRoX3RpbWUiOjE3MjIwNzY2MTcsInVzZXJfaWQiOiJGSUhrdmFlYmFaWDhrVGhFN2pUR0R1MnRrNXkxIiwic3ViIjoiRklIa3ZhZWJhWlg4a1RoRTdqVEdEdTJ0azV5MSIsImlhdCI6MTcyMjA3NjYxNywiZXhwIjoxNzIyMDgwMjE3LCJlbWFpbCI6InNwYWNlLmlicmFoaW1zdHVkaW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ1NDY4OTUzOTM0NDcxNzEzNTEiXSwiZW1haWwiOlsic3BhY2UuaWJyYWhpbXN0dWRpb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.PzNor4JIP0xyJXqK5tgxWXGiehT6U13zVNOP0rsXH__9eeSALRbUfpkJVo2hE7r4wL-q6X6XQMnVwhBd1IkNVoHOgyifjykx_mvmW1gfR7yv1UykFNvXVV7sCYz2xTbCC5sdYObEgkOyF49QXcfao_r2Eq3kKOUSZHBEuFivGmrf9Oz4hpUGxYlHfSnDcIOotTJ2TzNn23lQPpjQQK-8qgdesNQFQ5eLDuBlAGWbkHM0cGMsYcGCgocL8DhnKPzwTLVIGhGrTsC6SNwbwuEfXRDm0YIEAfMLdF8xJyBi-uOM5aWJ40VQPzhWj92oSOAya1UtiJjeCdiunZCxcLLL_w",
            expirationTime: 1722080217941,
          },
          createdAt: "1722076617641",
          lastLoginAt: "1722076617641",
          apiKey: "AIzaSyDaEoS1jAe5hk2dU9URv_zZBHqt5eCclvU",
          appName: "[DEFAULT]",
        },
        providerId: "google.com",
        _tokenResponse: {
          federatedId: "https://accounts.google.com/114546895393447171351",
          providerId: "google.com",
          email: "space.ibrahimstudio@gmail.com",
          emailVerified: true,
          firstName: "Ibrahim Space Studio",
          fullName: "Ibrahim Space Studio",
          photoUrl: "https://lh3.googleusercontent.com/a/ACg8ocLhwXQRxc31o0Uvg1odmYaVpfuxpMJt9U-61ueIOTcVCQVs0Ls=s96-c",
          localId: "FIHkvaebaZX8kThE7jTGDu2tk5y1",
          displayName: "Ibrahim Space Studio",
          idToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSWJyYWhpbSBTcGFjZSBTdHVkaW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGh3WFFSeGMzMW8wVXZnMW9kbVlhVnBmdXhwTUp0OVUtNjF1ZUlPVGNWQ1FWczBMcz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yaGFwc29kaWUtcmVhY3QiLCJhdWQiOiJyaGFwc29kaWUtcmVhY3QiLCJhdXRoX3RpbWUiOjE3MjIwNzY2MTcsInVzZXJfaWQiOiJGSUhrdmFlYmFaWDhrVGhFN2pUR0R1MnRrNXkxIiwic3ViIjoiRklIa3ZhZWJhWlg4a1RoRTdqVEdEdTJ0azV5MSIsImlhdCI6MTcyMjA3NjYxNywiZXhwIjoxNzIyMDgwMjE3LCJlbWFpbCI6InNwYWNlLmlicmFoaW1zdHVkaW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ1NDY4OTUzOTM0NDcxNzEzNTEiXSwiZW1haWwiOlsic3BhY2UuaWJyYWhpbXN0dWRpb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.PzNor4JIP0xyJXqK5tgxWXGiehT6U13zVNOP0rsXH__9eeSALRbUfpkJVo2hE7r4wL-q6X6XQMnVwhBd1IkNVoHOgyifjykx_mvmW1gfR7yv1UykFNvXVV7sCYz2xTbCC5sdYObEgkOyF49QXcfao_r2Eq3kKOUSZHBEuFivGmrf9Oz4hpUGxYlHfSnDcIOotTJ2TzNn23lQPpjQQK-8qgdesNQFQ5eLDuBlAGWbkHM0cGMsYcGCgocL8DhnKPzwTLVIGhGrTsC6SNwbwuEfXRDm0YIEAfMLdF8xJyBi-uOM5aWJ40VQPzhWj92oSOAya1UtiJjeCdiunZCxcLLL_w",
          context: "",
          oauthAccessToken: "ya29.a0AXooCguM0VMsZ_Sh33pysbNjLwwTE26Cy3JDrCaPT52hQb3WUCbH8oDmEJ-FxrRBw31YM4u6LScKhPVoi1EgAG2Vibup4UiPgqXfEcSwuMJypXI2KjGeEoYFnahQkLw5kxcMpbhon3oiVYgoVaFKIMUFHvGf-svhibr5aCgYKAZISARISFQHGX2MiLvQwgq2GE1FLIRrSavXS1w0171",
          oauthExpireIn: 3599,
          refreshToken:
            "AMf-vBwvKYiPSOu4hbiUQe6bwV6r33r3JL5wtVdp5qbKGSaPVQYDxE7aEOHK0rCVRrpKfzt7QyOEVIuT3lT2-Wlsritqd6kzIFcyOv91Un-f_0EuHjE28Lc2hSWGC_uo1rLu3tTNg16F6Xopv3ZZtcOkEjuHRpN2QSOz2jDbet-xWxFk7gkg4LAs-5P40XdBQL_EvmBdzP85NVXIF46r194Lzce4iYsJXqH32lyjLpwNiKEi4-O21w9UDtner_7_g-K3MEeWK1oWeu6QDCcgBXkY_bVbAwou-L7cD8c1b21scFa5diteWPLiAxJD9PEZHiyvPK8hZ8Mc5_IjMkDTs5hdDNoqx_16nd8DW41QrsvKO0MXXp6IYmvTJW1zUBdCGW45CCCSrncLlK631lFbtOlxT2U3vzqcnXqjGwdlfJpoploOm3McDl1AVqrSgDCKWlaE4Y_INVyDiuSz_So_5lQcYT6sjfd3YQ",
          expiresIn: "3600",
          oauthIdToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTExOTg2MjgyZGU5M2YyN2IyNjRmZDJhNGRlMTkyOTkzZGNiOGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDkyNTMwNjM3MjI3LWw1c2kyNG1lbjB2MzVpNzF0OTg1amRsMnQ1Y3BpZ3E4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDkyNTMwNjM3MjI3LWw1c2kyNG1lbjB2MzVpNzF0OTg1amRsMnQ1Y3BpZ3E4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0NTQ2ODk1MzkzNDQ3MTcxMzUxIiwiZW1haWwiOiJzcGFjZS5pYnJhaGltc3R1ZGlvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoick1lRThzVktDazRkSEQ5X1hJVUhsUSIsImlhdCI6MTcyMjA3NjYxNywiZXhwIjoxNzIyMDgwMjE3fQ.oNtNyh5vU6DyNeePM-dKQgCXMLQmiFS44hEEGyUsyE78vNz2c4Tr3a03w4VFFNdp7PZHtTB458aMQknz4hbaWCIoidu-j-lhO2_p9jY_wla5WgEDFyWql_cDoK4wM3jfPsXQo9PRx2MTd_4Yjxx1Q-DEEFySE4VZSP-zvgupVCiXn_RMQ9g5xTVi1Jlp0f6qOKpSZuf48MHUJ0DliUpMNVfDk9cFWD4CZy1Qz5O0H5B4HL5tj3b_v_9J0nWrn-8vXPvNnSa5vo71xjNOhfmudvLl1Mxe3rPO-NaWQcaEnA3i7jQK1DGifP5WMgDg5TDN2JTDAKmO1i8t7mnQEvMj0Q",
          rawUserInfo: '{"name":"Ibrahim Space Studio","granted_scopes":"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid","id":"114546895393447171351","verified_email":true,"given_name":"Ibrahim Space Studio","email":"space.ibrahimstudio@gmail.com","picture":"https://lh3.googleusercontent.com/a/ACg8ocLhwXQRxc31o0Uvg1odmYaVpfuxpMJt9U-61ueIOTcVCQVs0Ls=s96-c"}',
          isNewUser: true,
          kind: "identitytoolkit#VerifyAssertionResponse",
        },
        operationType: "signIn",
      };
    } catch (e) {
      console.log(`login error ${e}`);
      setIsLogin(false);
    }
  };

  const handleOAuthLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLogin(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const requiredFields = ["username", "password"];
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await login(inputData, "origin");
    } catch (error) {
      console.error("error when trying to login:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedin) {
    return <Navigate to="/profil" />;
  }

  return (
    <Fragment>
      <SEO title="Login" route="/login" />
      <PageLayout type="sub" as="child">
        <PortalSection>
          <PortalForm onSubmit={handleLogin}>
            <FormFieldset>
              <Input isLabeled={false} type="text" radius="full" name="username" value={inputData.username} placeholder="Telepon atau Email" isRequired onChange={handleInputChange} errorContent={errors.username} />
              <Input isLabeled={false} type="password" radius="full" name="password" value={inputData.password} placeholder="Password" isRequired onChange={handleInputChange} errorContent={errors.password} />
            </FormFieldset>
            <FormFieldset>
              <Button type="submit" isFullwidth radius="full" buttonText="Masuk" isLoading={loading} />
              <Button isFullwidth variant="hollow" radius="full" color="var(--color-primary)" buttonText="Lupa Password?" />
            </FormFieldset>
            <FormFieldset>
              <Button isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Masuk dengan Facebook" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/fb-auth.svg" />} onClick={() => handleOAuthLogin(facebook)} />
              <Button isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Masuk dengan Google" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/gm-auth.svg" />} onClick={() => handleOAuthLogin(google)} />
            </FormFieldset>
            <FormFieldset startAlt="Belum Punya Akun?">
              <Button isFullwidth variant="line" radius="full" color="var(--color-primary)" buttonText="Daftar Sekarang" onClick={() => navigate("/signup")} />
            </FormFieldset>
          </PortalForm>
        </PortalSection>
      </PageLayout>
    </Fragment>
  );
};

export default LoginPage;
