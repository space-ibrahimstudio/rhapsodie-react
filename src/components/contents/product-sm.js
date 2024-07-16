import React from "react";
import ProductItem from "./product-item";
import styles from "./styles/product-sm.module.css";

const ProductSm = ({ items }) => {
  return (
    <section className={styles.productSm}>
      {items.map((item, index) => (
        <ProductItem key={index} label={item.label} value={item.value} />
      ))}
    </section>
  );
};

export default ProductSm;
