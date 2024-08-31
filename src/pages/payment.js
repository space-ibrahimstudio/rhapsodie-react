import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useFormat } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useAuth } from "../lib/auth";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import PaymentForm, { PaymentOption, PaymentSummary, OptionList, PlanButton, MethodButton, SummaryDetail, SummaryInvoice } from "../components/contents/payment-form";
import { PopupFieldset } from "../components/inputs/popup-form";
import Image from "../components/contents/image";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reservation_data = location.state?.reservation_data;
  const { newPrice, newDate } = useFormat();
  const { userData } = useAuth();
  const [activePlan, setActivePlan] = useState(1);
  const [activeMethod, setActiveMethod] = useState("card");
  const [inputData, setInputData] = useState({ voucher_code: "", name: "", lesson: "", teacher_name: "", exp_date: "", price: 0, tr_fee: 0, voucher_fee: 0, adm_fee: 10000, regist_fee: 0, penalty_fee: 0, total_price: 0, total_pay: 0 });

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

  const handleCancel = () => {
    const confirm = window.confirm("Apakah anda yakin untuk membatalkan transaksi ini?");
    if (confirm) {
      localStorage.removeItem("reservation_data");
      navigate(-1);
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

      setInputData({ ...inputData, lesson: reservation_data.lesson, price: reservation_data.price, teacher_name: reservation_data.teacher, name: userData.name, total_price: totalplan, total_pay: grandtotal, exp_date: formatteddate });
    }
  }, [reservation_data, activePlan, activeMethod]);

  if (!reservation_data) {
    return <Navigate to="/" />;
  }

  return (
    <PageLayout>
      <Section>
        <PaymentForm>
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
              <Button buttonText="Submit" onClick={() => {}} />
            </OptionList>
          </PaymentOption>
          <PaymentSummary>
            <SummaryDetail title="Your Booking Detail" items={bookingdata} />
            <SummaryInvoice title="Order Summary" items={invoicedata} />
            <PopupFieldset>
              <Button isFullwidth radius="full" bgColor="var(--color-hint)" buttonText="Continue to Payment" onClick={() => {}} />
              <Button isFullwidth variant="line" radius="full" color="var(--color-hint)" buttonText="Cancel" onClick={handleCancel} />
            </PopupFieldset>
          </PaymentSummary>
        </PaymentForm>
      </Section>
    </PageLayout>
  );
};

export default PaymentPage;
