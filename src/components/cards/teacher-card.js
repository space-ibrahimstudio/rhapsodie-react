import React from "react";
import Tag from "../contents/tag";
import Image from "../contents/image";
import { Location } from "../contents/icons";
import styles from "./styles/teacher-card.module.css";

const TeacherCard = ({ image, name, location, rating, tags, onClick }) => {
  const stringToArray = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(",").map((tag) => tag.trim());
  };

  const convertedTags = stringToArray(tags);

  return (
    <section className={styles.teacherCard} onClick={onClick}>
      <img className={styles.cardImageIcon} alt="" src={image} />
      <section className={styles.cardContent}>
        <header className={styles.contentHead}>
          <h1 className={styles.contentName}>{name}</h1>
          <div className={styles.contentDet}>
            <Location size="var(--pixel-15)" />
            <b className={styles.detLoc}>{location}</b>
          </div>
        </header>
        <div className={styles.contentStar}>
          <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
          <b className={styles.starCount}>{`(${rating})`}</b>
        </div>
        <div className={styles.contentTag}>
          <div className={styles.tagWrap}>
            {convertedTags.slice(0, 2).map((tag, index) => (
              <Tag key={index} tagText={tag} />
            ))}
          </div>
          {convertedTags.length > 2 && <Tag tagText={`${convertedTags.length - 2} Lainnya`} />}
        </div>
      </section>
    </section>
  );
};

export default TeacherCard;
