import React, { useState, useEffect, Fragment } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useFormat, useDevmode } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useAuth } from "../lib/auth";
import { useApi } from "../lib/api";
import { SEO } from "../lib/seo";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import PaymentForm, { PaymentOption, PaymentSummary, OptionList, PlanButton, MethodButton, SummaryDetail, SummaryInvoice } from "../components/contents/payment-form";
import FPForm, { FPBody, FPLabel, FPNote, FPValue } from "../components/inputs/fp-form";
import PopupForm, { PopupBody, PopupFieldset, PopupFooter } from "../components/inputs/popup-form";
import Image from "../components/contents/image";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservation_data = location.state?.reservation_data;
  const { newPrice } = useFormat();
  const { log } = useDevmode();
  const { apiCrud } = useApi();
  const { userData, isLoggedin } = useAuth();
  const [activePlan, setActivePlan] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [activeMethod, setActiveMethod] = useState("card");
  const [inputData, setInputData] = useState({ voucher_code: "", name: "", phone: "", email: "", lesson: "", teacher_name: "", exp_date: "", price: 0, tr_fee: 0, voucher_fee: 0, adm_fee: 10000, regist_fee: 0, penalty_fee: 0, total_price: 0, total_pay: 0 });
  const [paymentStep, setPaymentStep] = useState("1");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const plans = [
    { label: "1 BULAN", value: 1, onCLick: () => setActivePlan(1) },
    { label: "3 BULAN", value: 3, onCLick: () => setActivePlan(3) },
    { label: "6 BULAN", value: 6, onCLick: () => setActivePlan(6) },
    { label: "12 BULAN", value: 12, onCLick: () => setActivePlan(12) },
  ];

  const methods = [
    { label: "Mastercard", iconsrc: "/svg/mastercard.svg", value: "card", onCLick: () => setActiveMethod("card") },
    { label: "Bank Transfer", iconsrc: "/svg/bank.svg", value: "bank", onCLick: () => setActiveMethod("bank") },
    { label: "QRIS", iconsrc: "/svg/qris.svg", value: "qris", onCLick: () => setActiveMethod("qris") },
  ];

  const bookingdata = [
    { label: "Student Name", value: inputData.name },
    { label: "Music Lesson", value: inputData.lesson },
    { label: "Price per Month", value: newPrice(inputData.price) },
    { label: "Teacher Name", value: inputData.teacher_name },
    { label: "Expiry Date", value: inputData.exp_date },
  ];

  const invoicedata = [
    { label: "Payment", value: inputData.total_price },
    { label: "Transaction Fee", value: inputData.tr_fee },
    { label: "Voucher & Other Promo", value: inputData.voucher_fee },
    { label: "Administration Fee", value: inputData.adm_fee },
    { label: "Registration Fee", value: inputData.regist_fee },
    { label: "Penalty Fee", value: inputData.penalty_fee },
    { label: "Grand Total", value: inputData.total_pay },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeStep = (step) => {
    window.scrollTo(0, 0);
    setPaymentStep(step);
  };

  const handleImageSelect = (file) => setSelectedImage(file);
  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const ordercode = localStorage.getItem("booking_id");
    const submittedData = { secret: userData.socialite_token, ordercode, totalmonth: activePlan.toString(), payment: activeMethod, price: reservation_data.price, totalprice: inputData.total_pay };
    formData.append("data", JSON.stringify(submittedData));
    setSubmitting(true);
    try {
      const response = await apiCrud(formData, "main", "orderupdate");
      if (!response.error) {
        log("submitted data:", submittedData);
        if (activeMethod !== "card") {
          handleChangeStep("2");
        } else {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm("Apakah anda yakin untuk membatalkan transaksi ini?");
    if (confirm) {
      localStorage.removeItem("reservation_data");
      localStorage.removeItem("booking_id");
      navigate(-1);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const ordercode = localStorage.getItem("booking_id");
    formData.append("fileimg", selectedImage);
    formData.append("idbooking", ordercode);
    setSubmitting(true);
    try {
      const response = await apiCrud(formData, "main", "buktibayar");
      if (!response.error) {
        localStorage.removeItem("reservation_data");
        localStorage.removeItem("booking_id");
        alert("Selamat, pembayaran telah berhasil dikonfirmasi. Mohon periksa status boooking anda di panel Transaction pada halaman Profil.");
        navigate("/profil");
      } else {
        return;
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (reservation_data) {
      const totalplan = reservation_data.price * activePlan;
      const totalfees = inputData.tr_fee + inputData.adm_fee + inputData.regist_fee + inputData.penalty_fee - inputData.voucher_fee;
      const grandtotal = totalplan + totalfees;

      const reservdate = new Date(reservation_data.date);
      reservdate.setMonth(reservdate.getMonth() + activePlan);
      const year = reservdate.getFullYear();
      const month = String(reservdate.getMonth() + 1).padStart(2, "0");
      const day = String(reservdate.getDate()).padStart(2, "0");
      const expiredate = `${year}-${month}-${day}`;
      const formatteddate = formatDate(expiredate);

      setInputData({ ...inputData, lesson: reservation_data.instruments, price: reservation_data.price, teacher_name: reservation_data.teacher, name: userData.name, total_price: totalplan, total_pay: grandtotal, exp_date: formatteddate });
    }
  }, [reservation_data, activePlan, activeMethod]);

  const renderSection = () => {
    switch (paymentStep) {
      case "1":
        return (
          <Section>
            <PaymentForm onSubmit={handleSubmit}>
              <PaymentOption>
                <OptionList title="Choose Your Lesson Plan">
                  {plans.map((item, index) => (
                    <PlanButton key={index} onClick={item.onCLick} isActive={item.value === activePlan}>
                      {item.label}
                    </PlanButton>
                  ))}
                </OptionList>
                <OptionList title="Choose Payment Method">
                  {methods.map((item, index) => (
                    <MethodButton key={index} onClick={item.onCLick} isActive={item.value === activeMethod}>
                      <Image width="auto" height="var(--pixel-35)" alt={item.label} src={item.iconsrc} />
                    </MethodButton>
                  ))}
                </OptionList>
                <OptionList title="Voucher">
                  <Input id="voucher-code" isLabeled={false} name="voucher_code" placeholder="Masukkan kode voucher" value={inputData.voucher_code} onChange={handleInputChange} />
                  <Button type="button" buttonText="Submit" onClick={() => {}} />
                </OptionList>
              </PaymentOption>
              <PaymentSummary>
                <SummaryDetail title="Your Booking Detail" items={bookingdata} />
                <SummaryInvoice title="Order Summary" items={invoicedata} />
                <PopupFieldset>
                  <Button isFullwidth type="submit" radius="full" bgColor="var(--color-hint)" buttonText="Continue to Payment" isLoading={submitting} />
                  <Button isFullwidth variant="line" radius="full" color="var(--color-hint)" buttonText="Cancel" onClick={handleCancel} />
                </PopupFieldset>
              </PaymentSummary>
            </PaymentForm>
          </Section>
        );
      case "2":
        return (
          <Fragment>
            <Section>
              <FPForm title={activeMethod === "bank" ? "Bayar Menggunakan Transfer Bank" : "Bayar Menggunakan QRIS"} desc="Untuk melanjutkan proses reservasi." note="Jika sudah melakukan pembayaran, mohon klik tombol “Konfirmasi Pembayaran” dibawah ini agar kami dapat memproses pembayaranmu." onSubmit={openConfirm} onCancel={() => handleChangeStep("1")}>
                <FPBody>
                  <FPNote icon={activeMethod === "bank" ? "/svg/bca-l.svg" : "/svg/qris-l.svg"} title={activeMethod === "bank" ? "Bank BCA" : "RHAPSODIE.CO"} desc={activeMethod === "bank" ? "PT Jaya Karya Poernama" : "NMID: ID2021130795812"} />
                  {activeMethod === "bank" && <FPValue value="0699 0787 88" />}
                </FPBody>
                <FPBody>
                  <FPLabel>Jumlah Transfer</FPLabel>
                  <FPValue value={newPrice(inputData.total_pay)} />
                </FPBody>
                {activeMethod === "qris" && <Image width="100%" height="auto" src="/jpg/qr.jpg" />}
              </FPForm>
            </Section>
            {confirmOpen && (
              <PopupForm title="Konfirmasi Pembayaran" onClose={closeConfirm} onSubmit={handleConfirm}>
                <PopupBody>
                  <Input radius="full" labelText="Nama Lengkap" placeholder="John Doe" type="text" name="name" value={inputData.name} onChange={handleInputChange} isRequired />
                  <Input radius="full" labelText="Nomor Telepon" placeholder="0882xxx" type="tel" name="phone" value={inputData.phone} onChange={handleInputChange} isRequired />
                  <Input radius="full" labelText="Email" placeholder="your@email.com" type="email" name="email" value={inputData.email} onChange={handleInputChange} />
                  <Input variant="upload" accept="image/*" isPreview={false} radius="full" labelText="Bukti Bayar" initialFile={selectedImage} onSelect={handleImageSelect} />
                </PopupBody>
                <PopupFooter>
                  <Button type="submit" isFullwidth radius="full" buttonText="Selesaikan Pembayaran" isLoading={submitting} />
                </PopupFooter>
              </PopupForm>
            )}
          </Fragment>
        );
      default:
        return null;
    }
  };

  if (!isLoggedin) {
    return <Navigate to="/" />;
  }

  if (!reservation_data) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <SEO title={reservation_data ? `Booking ${reservation_data.instruments} by ${reservation_data.teacher}` : "Booking guru musik"} route="/payment" />
      <PageLayout>{renderSection()}</PageLayout>
    </Fragment>
  );
};

export default PaymentPage;
