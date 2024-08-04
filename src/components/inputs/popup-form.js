import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./styles/popup-form.module.css";
import foot from "./styles/form-footer.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

export const PopupFieldset = ({ children }) => {
  return <div className={styles.formFieldset}>{children}</div>;
};

export const PopupBody = ({ children }) => {
  return <section className={styles.formBody}>{children}</section>;
};

export const PopupNote = ({ text }) => {
  return <i className={styles.formNote}>{`*${text}`}</i>;
};

export const PopupFooter = ({ children }) => {
  return <footer className={foot.formFooter}>{children}</footer>;
};

const PopupForm = ({ title, children, onSubmit, onClose }) => {
  const ref = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (isClosing) {
      const animationDuration = 500;
      setTimeout(() => {
        onClose();
      }, animationDuration);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let modalCount = 0;
    const popupModals = document.querySelectorAll(`.${styles.popupContainer}`);
    popupModals.forEach((modal) => {
      if (!modal.classList.contains(`.${styles.close}`)) {
        modalCount++;
      }
    });
    document.documentElement.style.overflow = modalCount > 0 ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isClosing]);

  const modalElement = (
    <main className={styles.popupScroll}>
      <section className={`${styles.popupContainer} ${isClosing ? styles.close : ""}`}>
        <form ref={ref} className={`${styles.popupForm} ${isClosing ? styles.close : ""}`} onSubmit={onSubmit}>
          <h1 className={styles.formTitle}>{title}</h1>
          {children}
        </form>
      </section>
    </main>
  );

  return createPortal(modalElement, modalRoot);
};

export default PopupForm;
