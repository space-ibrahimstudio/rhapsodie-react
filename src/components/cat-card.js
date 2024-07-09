import React from "react";
import styles from "./styles/cat-card.module.css";

const CatCard = ({ cardImage, cardTitle }) => {
  return (
    <section className={styles.catCard}>
      <div className={styles.cardFrame}>
        <img className={styles.cardImageIcon} alt="" src={cardImage} />
      </div>
      <span className={styles.cardTitle}>{cardTitle}</span>
    </section>
  );
};

export default CatCard;
