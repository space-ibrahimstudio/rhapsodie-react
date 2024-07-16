import React from "react";
import Image from "../contents/image";
import styles from "./styles/review-card.module.css";

const ReviewCard = ({ name, status, avatar, content, isEven = false }) => {
  return (
    <section className={`${styles.reviewCard} ${isEven ? styles.even : ""}`}>
      <header className={styles.cardHead}>
        <img className={styles.cardAvatarIcon} alt="" src={avatar} />
        <div className={styles.cardInfo}>
          <h1 className={styles.cardName}>{name}</h1>
          <span className={styles.cardStatus}>{status}</span>
        </div>
      </header>
      <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
      <p className={styles.cardContent}>{content}</p>
    </section>
  );
};

export default ReviewCard;
