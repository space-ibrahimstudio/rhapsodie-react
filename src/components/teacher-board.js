import React from "react";
import { Button } from "@ibrahimstudio/button";
import AboutTab from "./about-tab";
import ReviewCard from "./review-card";
import Image from "./image";
import { Location, Love, Share } from "./icons";
import styles from "./styles/teacher-board.module.css";

const TeacherBoard = ({ avatar, header, name, shortBio, bio, location, rating, tags, reviews }) => {
  return (
    <article className={styles.teacherBoard}>
      <header className={styles.teacherBanner} style={{ backgroundImage: `url(${header})` }}>
        <img className={styles.teacherAvatarIcon} alt="" src={avatar} />
      </header>
      <section className={styles.teacherDetails}>
        <div className={styles.detailsContent}>
          <h1 className={styles.teacherName}>{name}</h1>
          <p className={styles.teacherBio}>{shortBio}</p>
          <div className={styles.teacherLoc}>
            <Location size="var(--pixel-15)" />
            <b className={styles.locText}>{location}</b>
          </div>
          <div className={styles.teacherRating}>
            <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
            <b className={styles.locText}>{`(${rating} ulasan)`}</b>
          </div>
        </div>
        <div className={styles.detailsActions}>
          <Button radius="full" buttonText="Reservasi Sekarang" />
          <Button variant="line" subVariant="icon" radius="full" color="var(--color-primary)" iconContent={<Love />} />
          <Button variant="hollow" radius="full" color="var(--color-secondary)" buttonText="Bagikan" startContent={<Share />} />
        </div>
      </section>
      <section className={styles.teacherAbout}>
        <AboutTab tags={tags} content={bio} />
      </section>
      <section className={styles.teacherReview}>
        <h1 className={styles.reviewTitle}>
          <span style={{ fontWeight: "800" }}>{`Ulasan `}</span>
          <span style={{ fontWeight: "600", opacity: "0.5" }}>{`(${rating} ulasan)`}</span>
        </h1>
        <div className={styles.reviewContent}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} isEven={index % 2 === 0 ? false : true} name={review.name} status={review.status} avatar={review.image} content={review.content} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default TeacherBoard;
