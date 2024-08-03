import React, { Fragment, useState } from "react";
import { useWindow, useFormat } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { lessonCategory } from "../../lib/dummy";
import AboutTab from "./about-tab";
import { ReviewCard } from "./cards";
import Image from "./image";
import { Location, Love, Share } from "./icons";
import Skeleton, { SkeGroup } from "./skeleton";
import InvoiceSm from "./invoice-sm";
import ProductSm from "./product-sm";
import PopupForm, { PopupBody, PopupFieldset, PopupFooter, PopupNote } from "../inputs/popup-form";
import styles from "./styles/teacher-board.module.css";

const TeacherBoard = ({ isLoading = false, avatar, header, name, shortBio, bio, location = [], rating, tags, reviews = [] }) => {
  const { width } = useWindow();
  const { newDate } = useFormat();
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

  const handleNextStep = (step) => setStep(step);

  return (
    <Fragment>
      <article className={styles.teacherBoard}>
        <header className={styles.teacherBanner} style={{ backgroundImage: `url(${isLoading ? "/jpg/fallback.jpg" : header})` }}>
          <Image className={styles.teacherAvatarIcon} alt={name} src={isLoading ? "/jpg/fallback.jpg" : avatar} />
        </header>
        <section className={styles.teacherDetails}>
          <div className={styles.detailsContent}>
            {isLoading ? (
              <SkeGroup justifyC={width <= 700 ? "center" : "flex-start"} alignI={width <= 700 ? "center" : "flex-start"}>
                <Skeleton w="40%" />
                <Skeleton type="txt-xsm" w="70%" />
              </SkeGroup>
            ) : (
              <Fragment>
                <h1 className={styles.teacherName}>{(name && name) || "N/A"}</h1>
                {shortBio && <p className={styles.teacherBio}>{shortBio}</p>}
              </Fragment>
            )}
            <div className={styles.teacherLoc}>
              {isLoading ? (
                <Fragment>
                  <Skeleton w="var(--pixel-20)" h="var(--pixel-20)" />
                  <Skeleton type="txt-xsm" w="20%" />
                </Fragment>
              ) : (
                <Fragment>
                  <Location size="var(--pixel-15)" />
                  <b className={styles.locText}>{location.length > 0 ? location.map((loc, index) => (index + 1 === location.length ? loc.name : `${loc.name}, `)) : "N/A"}</b>
                </Fragment>
              )}
            </div>
            {!isLoading && (
              <div className={styles.teacherRating}>
                {rating === 0 ? <Image width="auto" height="var(--pixel-15)" src="/svg/nostar.svg" /> : <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />}
                <b className={styles.locText}>{rating === 0 ? "(0)" : `(${rating} ulasan)`}</b>
              </div>
            )}
          </div>
          <div className={styles.detailsActions}>
            {isLoading ? (
              <Fragment>
                <Skeleton w="var(--pixel-200)" h="var(--pixel-50)" />
                <Skeleton w="var(--pixel-50)" h="var(--pixel-50)" />
                <Skeleton w="var(--pixel-50)" h="var(--pixel-50)" />
              </Fragment>
            ) : (
              <Fragment>
                <Button radius="full" buttonText="Reservasi Sekarang" onClick={() => setReservOpen(true)} />
                <Button variant="line" subVariant="icon" radius="full" color="var(--color-primary)" iconContent={<Love />} />
                {width <= 700 ? <Button variant="hollow" subVariant="icon" radius="full" color="var(--color-secondary)" iconContent={<Share />} /> : <Button variant="hollow" radius="full" color="var(--color-secondary)" buttonText="Bagikan" startContent={<Share />} />}
              </Fragment>
            )}
          </div>
        </section>
        <section className={styles.teacherAbout}>
          {isLoading ? (
            <SkeGroup gap="var(--pixel-15)">
              <SkeGroup flexDir="row">
                <Skeleton w="var(--pixel-100)" h="var(--pixel-40)" />
                <Skeleton w="var(--pixel-100)" h="var(--pixel-40)" />
              </SkeGroup>
              <SkeGroup>
                <Skeleton type="txt-xsm" />
                <Skeleton type="txt-xsm" />
                <Skeleton type="txt-xsm" w="60%" />
              </SkeGroup>
            </SkeGroup>
          ) : (
            <AboutTab tags={tags} content={bio} />
          )}
        </section>
        {!isLoading && (
          <section className={styles.teacherReview}>
            <h1 className={styles.reviewTitle}>
              <span style={{ fontWeight: "800" }}>{`Ulasan `}</span>
              <span style={{ fontWeight: "600", opacity: "0.5" }}>{`(${rating} ulasan)`}</span>
            </h1>
            <div className={styles.reviewContent}>
              {reviews.map((review, index) => (
                <ReviewCard key={index} isEven={index % 2 === 0 ? false : true} name={review.name} status={`Bergabung sejak ${newDate(review.created_at)}`} avatar="/jpg/avatar.jpg" content={review.description} />
              ))}
            </div>
          </section>
        )}
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
