import React from "react";
import ProductItem from "./product-item";
import styles from "./styles/invoice-sm.module.css";

const InvoiceSm = ({ items, total }) => {
  return (
    <section className={styles.invoiceSm}>
      <div className={styles.invoiceBody}>
        {items.map((item, index) => (
          <ProductItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      <section className={styles.invoiceTotal}>
        <b className={styles.totalLabel}>Total</b>
        <i className={styles.totalValue}>{`Rp ${total}`}</i>
      </section>
    </section>
  );
};

export default InvoiceSm;
