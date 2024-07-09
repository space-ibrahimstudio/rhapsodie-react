import React from "react";
import styles from "./styles/category-section.module.css";

const CategorySection = ({ children }) => {
  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryBody}>{children}</div>
    </section>
  );
};

export default CategorySection;
