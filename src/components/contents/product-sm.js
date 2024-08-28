import React from "react";
import { useFormat } from "@ibrahimstudio/react";
import ProductItem from "./product-item";
import styles from "./styles/product-sm.module.css";

const ProductSm = ({ items }) => {
  const { newPrice } = useFormat();

  return (
    <section className={styles.productSm}>
      {items.map((item, index) => (
        <ProductItem key={index} label={`Lesson ${index + 1}`} value={newPrice(item.tuition_fee)} />
      ))}
    </section>
  );
};

export default ProductSm;
