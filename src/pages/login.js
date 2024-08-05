import React, { Fragment, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { facebook, google } from "../lib/firebaseConfig";
import { useAuth } from "../lib/auth";
import { SEO } from "../lib/seo";
import { inputValidator } from "../lib/controller";
import PageLayout from "../components/frames/pages";
import PortalSection from "../sections/portal-section";
import Image from "../components/contents/image";
import PortalForm, { FormFieldset } from "../components/inputs/portal-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedin, login, oAuthLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    try {
      await oAuthLogin(provider);
    } catch (error) {
      console.error("error when trying to login:", error);
    } finally {
      setLoading(false);
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
