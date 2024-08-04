import React from "react";
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

export const FilterSet = ({ title, children }) => {
  return (
    <div className={styles.filterSet}>
      <b className={styles.setTitle}>{title}</b>
      <div className={styles.setOption}>{children}</div>
    </div>
  );
};

export const DrawerFilter = ({ children }) => {
  return (
    <aside className={styles.drawerFilter}>
      <span className={styles.filterTitle}>Filter Berdasarkan</span>
      {children}
    </aside>
  );
};

const Drawer = ({ children }) => {
  return <section className={styles.drawerBody}>{children}</section>;
};

export default Drawer;
