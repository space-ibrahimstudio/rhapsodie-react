import React from "react";
import SectionTitle from "../components/contents/section-title";
import styles from "./styles/category-section.module.css";

const CategorySection = ({ title, children }) => {
  return (
    <section className={styles.categorySection}>
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className={styles.categoryBody}>{children}</div>
    </section>
  );
};

export default CategorySection;
