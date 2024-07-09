import React from "react";
import styles from "./styles/portal-section.module.css";

const PortalSection = ({ children }) => {
  return <section className={styles.portal}>{children}</section>;
};

export default PortalSection;
