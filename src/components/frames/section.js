import React from "react";
import styles from "./styles/section.module.css";

export const SectionTitle = ({ children }) => {
  const h1style = { margin: "0", alignSelf: "stretch", position: "relative", fontSize: "var(--font-md)", fontWeight: "800", fontFamily: "var(--font-mulish)", color: "var(--color-secondary)", textAlign: "center" };
  return <h1 style={h1style}>{children}</h1>;
};

const Section = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default Section;
