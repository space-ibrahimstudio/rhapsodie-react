import React, { useState } from "react";
import { Plus } from "./icons";
import styles from "./styles/weekly-calendar.module.css";

export const DayBody = ({ status, onClick = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const onHover = () => {
    setIsVisible(true);
  };

  return (
    <div className={`${styles.dayBody} ${status === "booked" ? styles.booked : status === "available" ? styles.available : styles.unavailable}`} onClick={onClick} onMouseEnter={onHover} onMouseLeave={() => setIsVisible(false)}>
      {isVisible && status === "unavailable" && (
        <div className={styles.bodyValue} style={{ color: "var(--color-secondary-50)" }}>
          Unavailable
        </div>
      )}
      {isVisible && status === "booked" && (
        <div className={styles.bodyValue} style={{ color: "var(--color-foreground)" }}>
          Booked
        </div>
      )}
      {isVisible && status === "available" && <Plus size="var(--pixel-25)" color="var(--color-foreground)" />}
    </div>
  );
};

export const DayList = ({ children }) => {
  return <section className={styles.dayList}>{children}</section>;
};

export const DayHeader = ({ day, date, isActive = false }) => {
  return (
    <header className={`${styles.dayHeader} ${isActive ? styles.active : ""}`}>
      <b className={styles.dayHeaderText}>{day}</b>
      <div className={styles.headerSpan}>{date}</div>
    </header>
  );
};

export const CalendarDay = ({ children, isActive = false }) => {
  return <section className={`${styles.calendarDay} ${isActive ? styles.active : ""}`}>{children}</section>;
};

export const CalendarDays = ({ children }) => {
  return <section className={styles.calendarDays}>{children}</section>;
};

export const TimeBody = ({ children }) => {
  return (
    <div className={styles.timeBody}>
      <div className={styles.bodyValue}>{children}</div>
    </div>
  );
};

export const TimeList = ({ children }) => {
  return <section className={styles.timeList}>{children}</section>;
};

export const TimeHeader = ({ children }) => {
  return (
    <header className={styles.timeHeader}>
      <div className={styles.headerText}>{children}</div>
    </header>
  );
};

export const CalendarTime = ({ children }) => {
  return <section className={styles.calendarTime}>{children}</section>;
};

const WeeklyCalendar = ({ children }) => {
  return <section className={styles.weeklyCalendar}>{children}</section>;
};

export default WeeklyCalendar;
