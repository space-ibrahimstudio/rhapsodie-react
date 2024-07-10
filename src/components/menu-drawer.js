import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@ibrahimstudio/button";
import styles from "./styles/menu-drawer.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const MenuDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  const ref = useRef();
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
    const popupModals = document.querySelectorAll(`.${styles.menuDrawer}`);
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
    <nav className={`${styles.menuDrawer} ${isClosing ? styles.close : ""}`}>
      <section ref={ref} className={`${styles.drawerContent} ${isClosing ? styles.close : ""}`}>
        <div className={styles.drawerItems}>
          <Button variant="hollow" isFullwidth radius="full" color="var(--color-secondary)" buttonText="Masuk" onClick={() => navigate("/login")} />
          <Button variant="hollow" isFullwidth radius="full" color="var(--color-secondary)" buttonText="Daftar Sekarang" onClick={() => navigate("/signup")} />
        </div>
      </section>
    </nav>
  );

  return createPortal(modalElement, modalRoot);
};

export default MenuDrawer;
