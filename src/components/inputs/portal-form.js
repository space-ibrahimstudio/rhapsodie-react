import React from "react";
import Image from "../contents/image";
import styles from "./styles/portal-form.module.css";
import fields from "./styles/form-fieldset.module.css";

export const FormFieldset = ({ startAlt, startAltClick, endAlt, endAltClick, children }) => {
  return (
    <section className={fields.formFieldset}>
      {startAlt && (
        <span className={fields.fieldsetAlt} onClick={startAltClick}>
          {startAlt}
        </span>
      )}
      {children}
      {endAlt && (
        <span className={fields.fieldsetAlt} onClick={endAltClick}>
          {endAlt}
        </span>
      )}
    </section>
  );
};

export const FormTnC = ({ checked, onChange }) => {
  return (
    <label className={styles.formTnc}>
      <input type="checkbox" checked={checked} onChange={onChange} className={styles.checkbox} />
      <span className={styles.checkmark}></span>
      <p className={styles.tncText}>
        Dengan klik “Daftar Sekarang” saya telah menyetujui
        <span style={{ textDecoration: "underline" }}>{` Syarat & Ketentuan `}</span>yang berlaku.
      </p>
    </label>
  );
};

const PortalForm = ({ children, onSubmit }) => {
  return (
    <form className={styles.portalForm} onSubmit={onSubmit}>
      <Image width="var(--pixel-300)" height="auto" src="/png/logo-primary.png" />
      {children}
    </form>
  );
};

export default PortalForm;
