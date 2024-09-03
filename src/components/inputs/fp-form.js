import React from "react";
import { Button } from "@ibrahimstudio/button";
import { PopupFieldset } from "./popup-form";
import styles from "./styles/fp-form.module.css";

export const FPValue = ({ value }) => {
  return (
    <section className={styles.formField}>
      <div className={styles.fieldValue}>
        <b className={styles.valueText}>{value}</b>
      </div>
      <button className={styles.fieldAction}>
        <img className={styles.copyIcon} alt={`${value}-copy`} src="/svg/copy.svg" />
      </button>
    </section>
  );
};

export const FPNote = ({ icon, title, desc }) => {
  return (
    <section className={styles.formNote}>
      <img className={styles.noteIcon} loading="lazy" alt={title} src={icon} />
      <div className={styles.noteContent}>
        <b className={styles.formLabel}>{title}</b>
        <b className={styles.formLabel}>{desc}</b>
      </div>
    </section>
  );
};

export const FPLabel = ({ children }) => {
  return <b className={styles.formLabel}>{children}</b>;
};

export const FPBody = ({ children }) => {
  return <section className={styles.formBody}>{children}</section>;
};

const FPForm = ({ title, desc, children, note, onSubmit, onCancel }) => {
  return (
    <form className={styles.paymentForm} onSubmit={onSubmit}>
      <header className={styles.formHead}>
        <h1 className={styles.formTitle}>{title}</h1>
        <b className={styles.formDesc}>{desc}</b>
      </header>
      {children}
      <p className={styles.formNotes}>{note}</p>
      <PopupFieldset>
        <Button type="submit" isFullwidth radius="full" bgColor="var(--color-hint)" buttonText="Konfirmasi Pembayaran" />
        <Button isFullwidth variant="line" radius="full" color="var(--color-hint)" buttonText="Ubah Metode Pembayaran" onClick={onCancel} />
      </PopupFieldset>
    </form>
  );
};

export default FPForm;
