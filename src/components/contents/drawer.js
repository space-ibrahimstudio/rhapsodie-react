import React, { useRef, useState, useEffect } from "react";
import { Button } from "@ibrahimstudio/button";
import styles from "./styles/drawer.module.css";

export const DrawerContent = ({ children }) => {
  return <article className={styles.drawerContent}>{children}</article>;
};

export const OptionButton = ({ children }) => {
  return (
    <button className={styles.optionButton}>
      <b className={styles.buttonText}>{children}</b>
    </button>
  );
};

export const FilterButton = ({ onClick = () => {} }) => {
  return (
    <div className={styles.filterButton}>
      <Button id="filter" size="sm" buttonText="Filter" onClick={onClick} />
    </div>
  );
};

export const FilterSet = ({ title, children }) => {
  return (
    <div className={styles.filterSet}>
      <b className={styles.setTitle}>{title}</b>
      <div className={styles.setOption}>{children}</div>
    </div>
  );
};

export const DrawerFilter = ({ type = "reg", onClose, children }) => {
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

  return type === "reg" ? (
    <aside className={styles.drawerFilter}>
      <span className={styles.filterTitle}>Filter Berdasarkan</span>
      {children}
    </aside>
  ) : (
    <main className={styles.drawerScroll}>
      <section className={`${styles.drawerContainer} ${isClosing ? styles.close : ""}`}>
        <aside ref={ref} className={`${styles.drawerFilter} ${styles.float} ${isClosing ? styles.close : ""}`}>
          <span className={styles.filterTitle}>Filter Berdasarkan</span>
          {children}
        </aside>
      </section>
    </main>
  );
};

const Drawer = ({ children }) => {
  return <section className={styles.drawerBody}>{children}</section>;
};

export default Drawer;
