import React from "react";
import styles from "./styles/portal-form.module.css";
import fields from "./styles/form-fieldset.module.css";

export const FormFieldset = ({ startAlt, startAltClick, endAlt, endAltClick, children }) => {
  return (
    <section className={fields.formFieldset}>
      <span className={fields.fieldsetAlt} onClick={startAltClick}>
        {startAlt}
      </span>
      {children}
      <span className={fields.fieldsetAlt} onClick={endAltClick}>
        {endAlt}
      </span>
    </section>
  );
};

export const FormTnC = () => {
  return (
    <footer className={styles.formTnc}>
      <div className={styles.replaceThis1} />
      <p className={styles.tncText}>
        {`Dengan klik “Daftar Sekarang” saya telah menyetujui `}
        <span className={styles.syaratKetentuan}>{`Syarat & Ketentuan`}</span> yang berlaku.
      </p>
    </footer>
  );
};

const PortalForm = ({ children }) => {
  return (
    <form className={styles.portalForm}>
      <div className={styles.replaceThis} />
      {children}
    </form>
  );
};

export default PortalForm;
