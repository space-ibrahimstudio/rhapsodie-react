import React, { Fragment, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useAuth } from "../lib/auth";
import { facebook, google } from "../lib/firebaseConfig";
import { SEO } from "../lib/seo";
import { inputValidator } from "../lib/controller";
import PageLayout from "../components/frames/pages";
import PortalSection from "../sections/portal-section";
import Image from "../components/contents/image";
import PortalForm, { FormFieldset, FormTnC } from "../components/inputs/portal-form";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isLoggedin, signup, oAuthLogin } = useAuth();
  const [step, setStep] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [inputData, setInputData] = useState({ full_name: "", phone: "", email: "", password: "", confirm_password: "" });
  const [errors, setErrors] = useState({ full_name: "", phone: "", email: "", password: "", confirm_password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleNext = () => {
    const requiredFields = ["full_name", "phone", "email"];
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep("2");
  };

  const handlePrev = () => {
    setInputData({ ...inputData, password: "", confirm_password: "" });
    setErrors({ ...errors, password: "", confirm_password: "" });
    setStep("1");
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    try {
      await oAuthLogin(provider);
    } catch (error) {
      console.error("error when trying to signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["password", "confirm_password"];
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (inputData.password !== inputData.confirm_password) {
      alert("Konfirmasi password tidak cocok. Periksa kembali");
      return;
    }
    if (!isChecked) {
      alert("Mohon setujui Syarat & Ketentuan.");
      return;
    }
    setLoading(true);
    try {
      const submittedData = { name: inputData.full_name, phone: inputData.phone, email: inputData.email, password: inputData.password };
      await signup(submittedData);
      alert("Selamat! Pendaftaran akun berhasil. Login untuk melanjutkan.");
      console.log("form submitted:", inputData);
      navigate("/login");
    } catch (error) {
      console.error("error when trying to signup:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedin) {
    return <Navigate to="/profil" />;
  }

  return (
    <Fragment>
      <SEO title="Signup" route="/signup" />
      <PageLayout type="sub" as="child">
        <PortalSection>
          <PortalForm onSubmit={handleSubmit}>
            {step === "1" && (
              <Fragment>
                <FormFieldset>
                  <Input id="signup-fullname" isLabeled={false} type="text" radius="full" name="full_name" value={inputData.full_name} placeholder="Nama Lengkap" isRequired onChange={handleInputChange} errorContent={errors.full_name} />
                  <Input id="signup-phone" isLabeled={false} type="text" radius="full" name="phone" value={inputData.phone} placeholder="Nomor Telepon" isRequired onChange={handleInputChange} errorContent={errors.phone} />
                  <Input id="signup-email" isLabeled={false} type="text" radius="full" name="email" value={inputData.email} placeholder="Email" isRequired onChange={handleInputChange} errorContent={errors.email} />
                </FormFieldset>
                <FormFieldset>
                  <Button id="action-submit-step1" isFullwidth radius="full" buttonText="Selanjutnya" onClick={handleNext} />
                </FormFieldset>
                <FormFieldset>
                  <Button id="action-fb-reauth" isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Daftar dengan Facebook" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/fb-auth.svg" />} onClick={() => handleOAuthLogin(facebook)} />
                  <Button id="action-gm-reauth" isFullwidth variant="line" radius="full" color="var(--color-secondary)" buttonText="Daftar dengan Google" startContent={<Image width="var(--pixel-20)" height="auto" src="/svg/gm-auth.svg" />} onClick={() => handleOAuthLogin(google)} />
                </FormFieldset>
                <FormFieldset startAlt="Sudah Punya Akun?">
                  <Button id="action-login-fu" isFullwidth variant="line" radius="full" color="var(--color-primary)" buttonText="Masuk" onClick={() => navigate("/login")} />
                </FormFieldset>
              </Fragment>
            )}
            {step === "2" && (
              <Fragment>
                <FormFieldset>
                  <Input id="signup-password" isLabeled={false} type="password" radius="full" name="password" value={inputData.password} placeholder="Password Baru" isRequired onChange={handleInputChange} errorContent={errors.password} />
                  <Input id="signup-cpassword" isLabeled={false} type="password" radius="full" name="confirm_password" value={inputData.confirm_password} placeholder="Konfirmasi Password" isRequired onChange={handleInputChange} errorContent={errors.confirm_password} />
                </FormFieldset>
                <FormFieldset>
                  <Button id="action-submit-step2" type="submit" isFullwidth radius="full" buttonText="Daftar Sekarang" isLoading={loading} />
                  <Button id="action-prev-step2" variant="line" isFullwidth radius="full" color="var(--color-primary)" buttonText="Kembali" onClick={handlePrev} />
                </FormFieldset>
                <FormTnC checked={isChecked} onChange={handleCheckboxChange} />
              </Fragment>
            )}
          </PortalForm>
        </PortalSection>
      </PageLayout>
    </Fragment>
  );
};

export default SignupPage;
