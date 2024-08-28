import React, { Fragment, useState, useEffect } from "react";
import { useWindow, useFormat, useEvent, useContent } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useApi } from "../../lib/api";
import Tag from "./tag";
import { ReviewCard, CertCard } from "./cards";
import Image from "./image";
import { Location, Love, Share } from "./icons";
import Skeleton, { SkeGroup } from "./skeleton";
import InvoiceSm from "./invoice-sm";
import ProductSm from "./product-sm";
import WeeklyCalendar, { CalendarTime, TimeHeader, TimeList, TimeBody, CalendarDays, CalendarDay, DayHeader, DayList, DayBody } from "./weekly-calendar";
import PopupForm, { PopupBody, PopupFieldset, PopupFooter, PopupNote } from "../inputs/popup-form";
import styles from "./styles/teacher-board.module.css";

const ActivitesCard = ({ image, title }) => {
  return (
    <section className={styles.activitesCard}>
      <img className={styles.cardImageIcon} alt={title} src={image} />
      <p className={styles.cardTitle}>{title}</p>
    </section>
  );
};

const GridContent = ({ children }) => {
  return <section className={styles.gridContent}>{children}</section>;
};

const AwardsItem = ({ title }) => {
  return (
    <section className={styles.awardsItem}>
      <img className={styles.itemIcon} alt={title} loading="lazy" src="/png/medal.png" />
      <p className={styles.itemTitle}>{title}</p>
    </section>
  );
};

const TeacherBoard = ({ isLoading = false, id, avatar, header, name, shortBio, bio, location = [], awards = [], activities = [], certs = [], rating, tags = [], reviews = [] }) => {
  const { scroll } = useEvent();
  const { width } = useWindow();
  const { newDate } = useFormat();
  const { stripContent, toTitleCase } = useContent();
  const { apiRead } = useApi();
  const [step, setStep] = useState("1");
  const [reservOpen, setReservOpen] = useState(false);
  const [inputData, setInputData] = useState({ location_type: "", category: "", date: "", time: "", payment_type: "" });
  const [scheduleData, setScheduleData] = useState([]);
  const [availSchedule, setAvailSchedule] = useState([]);
  const [availLesson, setAvailLesson] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [activeTab, setActiveTab] = useState("1");
  const [selectedRange, setSelectedRange] = useState("06:00-12:00");

  const strippedContent = (bio && stripContent(bio)) || "Tidak ada deskripsi.";
  const formtitle = step === "1" ? "Formulir Reservasi" : step === "2" ? "Konfirmasi Pembayaran" : "Pembayaran Berhasil!";

  const payments = [
    { label: "OVO", value: "ovo" },
    { label: "ShopeePay", value: "spay" },
    { label: "GoPay", value: "gopay" },
    { label: "Bank Transfer", value: "bank" },
    { label: "Virtual Account", value: "va" },
  ];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeRanges = [
    { value: "00:00-06:00", label: "00:00-06:00", item: { start: "00:00", end: "06:00" } },
    { value: "06:00-12:00", label: "06:00-12:00", item: { start: "06:00", end: "12:00" } },
    { value: "12:00-18:00", label: "12:00-18:00", item: { start: "12:00", end: "18:00" } },
    { value: "18:00-24:00", label: "18:00-24:00", item: { start: "18:00", end: "24:00" } },
  ];

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let [startHour, startMinutes] = start.split(":").map(Number);
    const [endHour, endMinutes] = end.split(":").map(Number);
    while (startHour < endHour || (startHour === endHour && startMinutes < endMinutes)) {
      const formattedHour = startHour < 10 ? `0${startHour}` : startHour;
      const formattedMinutes = startMinutes < 10 ? `0${startMinutes}` : startMinutes;
      slots.push(`${formattedHour}:${formattedMinutes}`);
      startMinutes += 15;
      if (startMinutes >= 60) {
        startMinutes = 0;
        startHour += 1;
      }
    }
    return slots;
  };

  const handleRangeChange = (value) => {
    setSelectedRange(value);
  };

  const selectedTimeRange = timeRanges.find((range) => range.value === selectedRange);
  const timeSlots = generateTimeSlots(selectedTimeRange.item.start, selectedTimeRange.item.end);

  const getDayOfWeek = (dateString) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      return day;
    });
  };

  const formatDate = (date, type) => {
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = date.toLocaleString("default", { month: "short" });
    return type === "day" ? dayName : `${day} ${monthName}`;
  };

  const currentWeekDates = getCurrentWeekDates();
  const today = new Date();

  const closeForm = () => {
    setReservOpen(false);
    setInputData({ ...inputData, date: "", time: "", payment_type: "" });
    setAvailLesson([]);
    setTotalPrice("");
  };

  const getScheduleData = async (locationid, instrumentid) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ idteacher: id, iddistrict: locationid, idinstruments: instrumentid }));
    try {
      const response = await apiRead(formData, "main", "scheduleview");
      if (response && response.data && response.data.length > 0) {
        setScheduleData(response.data);
      } else {
        setScheduleData([]);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleDirectBooking = (date, time) => {
    setReservOpen(true);
    const formattedDate = date.toISOString().split("T")[0];
    setInputData((prevState) => ({ ...prevState, date: formattedDate, time }));
  };

  const handleNextStep = (step) => setStep(step);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (inputData.location_type !== "" && inputData.category !== "") {
      getScheduleData(inputData.location_type, inputData.category);
    }
  }, [inputData.location_type, inputData.category]);

  useEffect(() => {
    if (inputData.date !== "") {
      const dayOfWeek = getDayOfWeek(inputData.date);
      const availableSlots = scheduleData.filter((item) => item.day === dayOfWeek && item.is_booked === "0");
      setAvailSchedule(availableSlots);
      console.log("available time:", availableSlots);
    }
  }, [inputData.date, scheduleData]);

  useEffect(() => {
    if (inputData.time !== "" && availSchedule.length > 0) {
      const availableTimes = availSchedule.filter((item) => item.id === inputData.time);
      if (availableTimes.length > 0) {
        setAvailLesson(availableTimes);
        const totalPrice = availableTimes.reduce((total, schedule) => total + parseInt(schedule.tuition_fee, 10), 0);
        const formattedTotal = `${totalPrice.toLocaleString("id-ID")}`;
        setTotalPrice(formattedTotal);
      }
    }
  }, [inputData.time, availSchedule]);

  return (
    <Fragment>
      <article className={styles.teacherBoard}>
        <header className={styles.teacherBanner} style={{ backgroundImage: `url(${isLoading ? "/jpg/fallback.jpg" : header})` }}>
          <Image className={styles.teacherAvatarIcon} alt={name} src={isLoading ? "/jpg/fallback.jpg" : avatar} />
        </header>
        <section className={styles.teacherDetails}>
          <section className={styles.detailsContent}>
            <section className={styles.detailsInfo}>
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
                  <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
                  <b className={styles.locText}>{rating === 0 ? "(5)" : `(${rating} ulasan)`}</b>
                </div>
              )}
            </section>
            {!isLoading && awards.length > 0 && (
              <section className={styles.detailsAwards}>
                <h1 className={styles.awardsTitle}>Awards & Certificates</h1>
                {awards.slice(0, 2).map((item, index) => (
                  <AwardsItem key={index} title={item.name} />
                ))}
                {awards.length > 2 && <Button size="sm" bgColor="var(--color-primary-10)" color="var(--color-primary)" buttonText={`Lihat ${awards.length - 2} Lainnya`} onClick={() => scroll("awards-teacher", -90)} />}
              </section>
            )}
          </section>
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
            <section className={styles.aboutTab}>
              <nav className={styles.tabSwitch}>
                <button className={`${styles.switchButton} ${activeTab === "1" ? styles.active : ""}`} onClick={() => setActiveTab("1")}>
                  <b className={styles.buttonText}>Tentang Guru</b>
                </button>
                <button className={`${styles.switchButton} ${activeTab === "2" ? styles.active : ""}`} onClick={() => setActiveTab("2")}>
                  <b className={styles.buttonText}>Jadwal Guru</b>
                </button>
              </nav>
              {activeTab === "1" && (
                <div className={styles.tabContent}>
                  {tags.length > 0 && (
                    <div className={styles.contentCat}>
                      {tags.map((tag, index) => (
                        <Tag key={index} tagText={tag.name} />
                      ))}
                    </div>
                  )}
                  <p className={styles.contentText}>{strippedContent}</p>
                </div>
              )}
              {activeTab === "2" && (
                <div className={styles.tabContent}>
                  <PopupFieldset>
                    <Input variant="select" radius="full" labelText="Lokasi Belajar" placeholder="Pilih lokasi" name="location_type" value={inputData.location_type} options={location.map((item) => ({ value: item.iddistrict, label: item.name }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "location_type", value: selectedValue } })} isSearchable={location.length > 10} />
                    <Input variant="select" radius="full" labelText="Pilih Instrument" placeholder="Lihat pilihan instrument" name="category" value={inputData.category} options={tags.map((item) => ({ value: item.idinstruments, label: item.name }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "category", value: selectedValue } })} isSearchable={location.length > 10} />
                    <Input variant="select" noEmptyValue radius="full" labelText="Pilih Jam" value={selectedRange} options={timeRanges} onSelect={handleRangeChange} />
                  </PopupFieldset>
                  <WeeklyCalendar>
                    <CalendarTime>
                      <TimeHeader>UTC+7</TimeHeader>
                      <TimeList>
                        {timeSlots.map((time) => (
                          <TimeBody key={time}>{time}</TimeBody>
                        ))}
                      </TimeList>
                    </CalendarTime>
                    <CalendarDays>
                      {currentWeekDates.map((day, index) => {
                        const isToday = day.toDateString() === today.toDateString();
                        return (
                          <CalendarDay key={index} isActive={isToday}>
                            <DayHeader day={toTitleCase(formatDate(day, "day"))} date={formatDate(day, "date")} isActive={isToday} />
                            <DayList>
                              {timeSlots.map((time, idx) => {
                                const dayName = daysOfWeek[index].toLowerCase();
                                const slot = scheduleData.find((sch) => {
                                  return sch.day.toLowerCase() === dayName && time >= sch.start_time.slice(0, 5) && time < sch.end_time.slice(0, 5);
                                });
                                let status = "";
                                let isClickable = false;
                                if (slot) {
                                  if (slot.is_booked === "0") {
                                    status = "available";
                                    isClickable = true;
                                  } else {
                                    status = "booked";
                                  }
                                } else {
                                  status = "unavailable";
                                }
                                return <DayBody key={idx} status={status} onClick={isClickable ? () => handleDirectBooking(day, time) : () => {}} />;
                              })}
                            </DayList>
                          </CalendarDay>
                        );
                      })}
                    </CalendarDays>
                  </WeeklyCalendar>
                </div>
              )}
            </section>
          )}
        </section>
        {!isLoading && (
          <Fragment>
            <section className={styles.teacherReview}>
              <h1 className={styles.reviewTitle}>
                <span style={{ fontWeight: "800" }}>Activities</span>
              </h1>
              {activities.length > 0 && (
                <GridContent>
                  {activities.map((item, index) => (
                    <ActivitesCard key={index} title={item.title} image={item.image} />
                  ))}
                </GridContent>
              )}
            </section>
            {certs.length > 0 && (
              <section id="awards-teacher" className={styles.teacherReview}>
                <h1 className={styles.reviewTitle}>
                  <span style={{ fontWeight: "800" }}>Awards & Certificates</span>
                </h1>
                <GridContent>
                  {certs.map((item, index) => (
                    <CertCard key={index} title={item.name} />
                  ))}
                </GridContent>
              </section>
            )}
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
          </Fragment>
        )}
      </article>
      {reservOpen && (
        <PopupForm title={formtitle} onClose={closeForm} onSubmit={() => {}}>
          {step === "1" && (
            <Fragment>
              <PopupBody>
                <Input variant="select" radius="full" labelText="Lokasi Belajar" placeholder="Pilih lokasi" name="location_type" value={inputData.location_type} options={location.map((item) => ({ value: item.iddistrict, label: item.name }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "location_type", value: selectedValue } })} isSearchable={location.length > 10} />
                <Input variant="select" radius="full" labelText="Pilih Instrument" placeholder="Lihat pilihan instrument" name="category" value={inputData.category} options={tags.map((item) => ({ value: item.idinstruments, label: item.name }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "category", value: selectedValue } })} isSearchable={location.length > 10} />
                <PopupFieldset>
                  <Input radius="full" labelText="Hari dan Tanggal" placeholder="Atur tanggal" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
                  <Input
                    variant="select"
                    isSearchable={inputData.date !== "" ? (availSchedule.length > 10 ? true : false) : false}
                    radius="full"
                    labelText="Jam Belajar"
                    placeholder={inputData.date === "" ? "Mohon pilih tanggal dulu" : "Pilih jadwal tersedia"}
                    name="time"
                    value={inputData.time}
                    options={inputData.date === "" ? [] : availSchedule.map((item) => ({ value: item.id, label: `${item.start_time} - ${item.end_time}` }))}
                    onSelect={(selectedValue) => handleInputChange({ target: { name: "time", value: selectedValue } })}
                    isDisabled={inputData.date === ""}
                  />
                </PopupFieldset>
                {availLesson.length > 0 && <ProductSm items={availLesson} />}
              </PopupBody>
              <PopupFooter>
                <Button isFullwidth radius="full" buttonText="Reservasi Sekarang" onClick={() => handleNextStep("2")} />
              </PopupFooter>
            </Fragment>
          )}
          {step === "2" && (
            <Fragment>
              <PopupBody>
                <InvoiceSm items={availLesson} total={totalPrice} />
                <PopupNote text="Tagihan pembayaran untuk 1 bulan" />
                <Input variant="select" radius="full" labelText="Metode Pembayaran" placeholder="Pilih metode pembayaran" name="payment_type" value={inputData.payment_type} options={payments.map((item) => ({ value: item.value, label: item.label }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "payment_type", value: selectedValue } })} />
              </PopupBody>
              <PopupFooter>
                <Button isFullwidth variant="line" color="var(--color-primary)" radius="full" buttonText="Kembali" onClick={() => handleNextStep("1")} />
                <Button isFullwidth radius="full" buttonText="Bayar Sekarang" onClick={() => handleNextStep("3")} />
              </PopupFooter>
            </Fragment>
          )}
        </PopupForm>
      )}
    </Fragment>
  );
};

export default TeacherBoard;
