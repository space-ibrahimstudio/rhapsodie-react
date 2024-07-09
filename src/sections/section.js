import React from "react";
import styles from "./styles/section.module.css";

const Section = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;
