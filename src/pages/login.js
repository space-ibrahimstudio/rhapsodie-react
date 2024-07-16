import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { inputValidator } from "../lib/controller";
import PageLayout from "../components/frames/pages";
import PortalSection from "../sections/portal-section";
import Image from "../components/contents/image";
import PortalForm, { FormFieldset } from "../components/inputs/portal-form";

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["username", "password"];
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("Selamat! Anda berhasil login.");
    console.log("form submitted:", inputData);
    setInputData({ username: "", password: "" });
  };

  return (
    <PageLayout type="sub" as="child">
      <PortalSection>
        <PortalForm onSubmit={handleSubmit}>
          <FormFieldset>
            <Input isLabeled={false} type="text" radius="full" name="username" value={inputData.username} placeholder="Telepon atau Email" isRequired onChange={handleInputChange} errorContent={errors.username} />
            <Input isLabeled={false} type="password" radius="full" name="password" value={inputData.password} placeholder="Password" isRequired onChange={handleInputChange} errorContent={errors.password} />
          </FormFieldset>
          <FormFieldset>
            <Button type="submit" isFullwidth radius="full" buttonText="Masuk" />
            <Button isFullwidth variant="hollow" radius="full" color="var(--color-primary)" buttonText="Lupa Password?" />
          </FormFieldset>
          <FormFieldset>
            <Button isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Masuk dengan Facebook" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/fb-auth.svg" />} />
            <Button isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Masuk dengan Google" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/gm-auth.svg" />} />
          </FormFieldset>
          <FormFieldset startAlt="Belum Punya Akun?">
            <Button isFullwidth variant="line" radius="full" color="var(--color-primary)" buttonText="Daftar Sekarang" onClick={() => navigate("/signup")} />
          </FormFieldset>
        </PortalForm>
      </PortalSection>
    </PageLayout>
  );
};

export default LoginPage;
