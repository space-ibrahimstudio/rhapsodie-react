import React, { Fragment, useState } from "react";
import { useWindow } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { lessonCategory } from "../lib/dummy";
import AboutTab from "./about-tab";
import ReviewCard from "./review-card";
import Image from "./image";
import { Location, Love, Share } from "./icons";
import InvoiceSm from "./invoice-sm";
import ProductSm from "./product-sm";
import PopupForm, { PopupBody, PopupFieldset, PopupFooter, PopupNote } from "./popup-form";
import styles from "./styles/teacher-board.module.css";

const TeacherBoard = ({ avatar, header, name, shortBio, bio, location, rating, tags, reviews }) => {
  const { width } = useWindow();
  const [step, setStep] = useState("1");
  const [reservOpen, setReservOpen] = useState(false);
  const [inputData, setInputData] = useState({ location_type: "", category: "", date: "", time: "", payment_type: "" });

  const formtitle = step === "1" ? "Formulir Reservasi" : step === "2" ? "Konfirmasi Pembayaran" : "Pembayaran Berhasil!";
  const hours = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
  const locations = [
    { label: "Belajar di tempat Murid", value: "murid" },
    { label: "Belajar di tempat Guru", value: "guru" },
  ];

  const products = [
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
    { label: "Lesson 1", value: "Rp 500.000/45 menit" },
  ];

  const payments = [
    { label: "OVO", value: "ovo" },
    { label: "ShopeePay", value: "spay" },
    { label: "GoPay", value: "gopay" },
    { label: "Bank Transfer", value: "bank" },
    { label: "Virtual Account", value: "va" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNextStep = (step) => {
    setStep(step);
  };

  return (
    <Fragment>
      <article className={styles.teacherBoard}>
        <header className={styles.teacherBanner} style={{ backgroundImage: `url(${header})` }}>
          <img className={styles.teacherAvatarIcon} alt="" src={avatar} />
        </header>
        <section className={styles.teacherDetails}>
          <div className={styles.detailsContent}>
            <h1 className={styles.teacherName}>{name}</h1>
            <p className={styles.teacherBio}>{shortBio}</p>
            <div className={styles.teacherLoc}>
              <Location size="var(--pixel-15)" />
              <b className={styles.locText}>{location}</b>
            </div>
            <div className={styles.teacherRating}>
              <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
              <b className={styles.locText}>{`(${rating} ulasan)`}</b>
            </div>
          </div>
          <div className={styles.detailsActions}>
            <Button radius="full" buttonText="Reservasi Sekarang" onClick={() => setReservOpen(true)} />
            <Button variant="line" subVariant="icon" radius="full" color="var(--color-primary)" iconContent={<Love />} />
            {width <= 700 ? <Button variant="hollow" subVariant="icon" radius="full" color="var(--color-secondary)" iconContent={<Share />} /> : <Button variant="hollow" radius="full" color="var(--color-secondary)" buttonText="Bagikan" startContent={<Share />} />}
          </div>
        </section>
        <section className={styles.teacherAbout}>
          <AboutTab tags={tags} content={bio} />
        </section>
        <section className={styles.teacherReview}>
          <h1 className={styles.reviewTitle}>
            <span style={{ fontWeight: "800" }}>{`Ulasan `}</span>
            <span style={{ fontWeight: "600", opacity: "0.5" }}>{`(${rating} ulasan)`}</span>
          </h1>
          <div className={styles.reviewContent}>
            {reviews.map((review, index) => (
              <ReviewCard key={index} isEven={index % 2 === 0 ? false : true} name={review.name} status={review.status} avatar={review.image} content={review.content} />
            ))}
          </div>
        </section>
      </article>
      {reservOpen && (
        <PopupForm title={formtitle} onClose={() => setReservOpen(false)} onSubmit={() => {}}>
          {step === "1" && (
            <Fragment>
              <PopupBody>
                <Input variant="select" radius="full" labelText="Mau Belajar Dimana?" placeholder="Pilih tipe lokasi" name="location_type" value={inputData.location_type} options={locations.map((item) => ({ value: item.value, label: item.label }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "location_type", value: selectedValue } })} />
                <Input variant="select" radius="full" labelText="Mau Belajar Apa?" placeholder="Pilih kategori" name="category" value={inputData.category} options={lessonCategory.map((item) => ({ value: item.value, label: item.label }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "category", value: selectedValue } })} isSearchable />
                {inputData.category !== "" && <ProductSm items={products} />}
                <PopupFieldset>
                  <Input radius="full" labelText="Hari dan Tanggal" placeholder="Atur tanggal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
                  <Input variant="select" isSearchable radius="full" labelText="Jam Belajar" placeholder="Pilih jadwal tersedia" name="time" value={inputData.time} options={hours.map((hour) => ({ value: hour, label: hour }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "time", value: selectedValue } })} />
                </PopupFieldset>
              </PopupBody>
              <PopupFooter>
                <Button isFullwidth radius="full" buttonText="Reservasi Sekarang" onClick={() => handleNextStep("2")} />
              </PopupFooter>
            </Fragment>
          )}
          {step === "2" && (
            <Fragment>
              <PopupBody>
                <InvoiceSm items={products} total="1.500.000" />
                <PopupNote text="Tagihan pembayaran untuk 1 bulan" />
                <Input variant="select" radius="full" labelText="Metode Pembayaran" placeholder="Pilih metode pembayaran" name="payment_type" value={inputData.payment_type} options={payments.map((item) => ({ value: item.value, label: item.label }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "payment_type", value: selectedValue } })} />
              </PopupBody>
              <PopupFooter>
                <Button isFullwidth variant="line" color="var(--color-primary)" radius="full" buttonText="Kembali" onClick={() => handleNextStep("1")} />
                <Button isFullwidth radius="full" buttonText="Bayar Sekarang" onClick={() => handleNextStep("3")} />
              </PopupFooter>
            </Fragment>
          )}
          {step === "3" && (
            <Fragment>
              <PopupBody>
                <InvoiceSm items={products} total="1.500.000" />
                <PopupNote text="Tagihan pembayaran untuk 1 bulan" />
              </PopupBody>
              <PopupFooter>
                <Button isFullwidth radius="full" buttonText="Tutup" onClick={() => setReservOpen(false)} />
              </PopupFooter>
            </Fragment>
          )}
        </PopupForm>
      )}
    </Fragment>
  );
};

export default TeacherBoard;
