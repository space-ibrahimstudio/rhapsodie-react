import React from "react";
import { useFormat } from "@ibrahimstudio/react";
import styles from "./styles/payment-form.module.css";

export const SummaryInvoice = ({ title, items = [] }) => {
  const { newPrice } = useFormat();

  return (
    <section className={styles.summaryInvoice}>
      <h1 className={styles.invoiceTitle}>{title}</h1>
      <section className={styles.invoiceContent}>
        {items.map((item, index) => (
          <div key={index} className={`${styles.contentList} ${index + 1 === items.length ? styles.total : ""}`}>
            <div className={styles.listLabel}>
              <b className={styles.labelText} style={{ fontWeight: "500" }}>
                {item.label}
              </b>
            </div>
            <b className={styles.listSepar}>:</b>
            <div className={styles.listValue}>
              <b className={styles.labelText}>{newPrice(item.value)}</b>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export const SummaryDetail = ({ title, items = [] }) => {
  return (
    <section className={styles.summaryDetail}>
      <h1 className={styles.detailTitle}>{title}</h1>
      <section className={styles.detailContent}>
        {items.map((item, index) => (
          <div key={index} className={styles.contentList}>
            <div className={styles.listLabel}>
              <b className={styles.labelText} style={{ fontWeight: "500" }}>
                {item.label}
              </b>
            </div>
            <b className={styles.listSepar}>:</b>
            <div className={styles.listLabel}>
              <b className={styles.labelText}>{item.value}</b>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export const MethodButton = ({ onClick = () => {}, isActive = false, children }) => {
  return (
    <button type="button" className={`${styles.methodButton} ${isActive ? styles.active : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const PlanButton = ({ onClick = () => {}, isActive = false, children }) => {
  return (
    <button type="button" className={`${styles.planButton} ${isActive ? styles.active : ""}`} onClick={onClick}>
      <b className={styles.buttonText}>{children}</b>
    </button>
  );
};

export const OptionList = ({ title, children }) => {
  return (
    <section className={styles.optionList}>
      <h1 className={styles.listTitle}>{title}</h1>
      <section className={styles.listContent}>{children}</section>
    </section>
  );
};

export const PaymentSummary = ({ children }) => {
  return <section className={styles.paymentSummary}>{children}</section>;
};

export const PaymentOption = ({ children }) => {
  return <section className={styles.paymentOption}>{children}</section>;
};

const PaymentForm = ({ onSubmit, children }) => {
  return (
    <form className={styles.paymentForm} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default PaymentForm;
