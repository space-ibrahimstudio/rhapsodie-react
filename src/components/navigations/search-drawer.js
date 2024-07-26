import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles/search-drawer.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const SearchDrawer = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) {
      const animationDuration = 500;
      setTimeout(() => {
        onClose();
      }, animationDuration);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    let modalCount = 0;
    const popupModals = document.querySelectorAll(`.${styles.searchDrawer}`);
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
    <main className={styles.searchScroll}>
      <section className={`${styles.searchDrawer} ${isClosing ? styles.close : ""}`}></section>
    </main>
  );

  return createPortal(modalElement, modalRoot);
};

export default SearchDrawer;
