import React from "react";
import styles from "./styles/product-item.module.css";

const ProductItem = ({ label, value }) => {
  return (
    <section className={styles.productItem}>
      <b className={styles.itemLabel}>{label}</b>
      <i className={styles.itemValue}>{value}</i>
    </section>
  );
};

export default ProductItem;
