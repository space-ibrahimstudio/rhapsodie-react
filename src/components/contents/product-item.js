import React from "react";
import { Button } from "@ibrahimstudio/button";
import styles from "./styles/product-item.module.css";

const ProductItem = ({ isActive = false, onSelect, value }) => {
  return (
    <section className={styles.productItem}>
      <b className={styles.itemLabel}>{value}</b>
      <Button id={`choose-item-${value}`} type="button" size="sm" variant={isActive ? "line" : "fill"} color={isActive ? "var(--color-primary)" : "var(--color-foreground)"} bgColor={isActive ? "transparent" : "var(--color-primary)"} buttonText={isActive ? "Terpilih" : "Pilih"} onClick={onSelect} />
    </section>
  );
};

export default ProductItem;
