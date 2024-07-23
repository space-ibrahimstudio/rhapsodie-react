import React, { Fragment } from "react";
import Tag from "./tag";
import Image from "./image";
import Skeleton from "./skeleton";
import { Location } from "./icons";
import tchrcss from "./styles/teacher-card.module.css";
import ctgrcss from "./styles/cat-card.module.css";
import rvewcss from "./styles/review-card.module.css";

export const TeacherCard = ({ isLoading = false, image, name, location, rating, tags, onClick }) => {
  const stringToArray = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(",").map((tag) => tag.trim());
  };

  const convertedTags = stringToArray(tags);

  return (
    <section className={tchrcss.teacherCard} onClick={onClick}>
      {isLoading ? <Skeleton type="img" h="var(--pixel-150)" /> : <Image className={tchrcss.cardImageIcon} alt={name} src={image} />}
      <section className={tchrcss.cardContent}>
        <header className={tchrcss.contentHead}>
          {isLoading ? <Skeleton /> : <h1 className={tchrcss.contentName}>{(name && name) || "N/A"}</h1>}
          <div className={tchrcss.contentDet}>
            {isLoading ? (
              <Fragment>
                <Skeleton w="var(--pixel-20)" h="var(--pixel-20)" />
                <Skeleton type="txt-xsm" w="40%" />
              </Fragment>
            ) : (
              <Fragment>
                <Location size="var(--pixel-15)" />
                <b className={tchrcss.detLoc}>{(location && location) || "N/A"}</b>
              </Fragment>
            )}
          </div>
        </header>
        <div className={tchrcss.contentStar}>
          {isLoading ? (
            <Skeleton type="txt-xsm" w="80%" />
          ) : (
            <Fragment>
              {rating !== 0 && <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />}
              <b className={tchrcss.starCount}>{rating === 0 ? "Belum ada ulasan" : `(${rating})`}</b>
            </Fragment>
          )}
        </div>
        <div className={tchrcss.contentTag}>
          <div className={tchrcss.tagWrap}>
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

export const CatCard = ({ isLoading = false, cardImage, cardTitle }) => {
  return (
    <section className={ctgrcss.catCard}>
      <div className={ctgrcss.cardFrame}>
        <img className={ctgrcss.cardImageIcon} alt="" src={cardImage} />
      </div>
      <span className={ctgrcss.cardTitle}>{cardTitle}</span>
    </section>
  );
};

export const ReviewCard = ({ isLoading = false, name, status, avatar, content, isEven = false }) => {
  return (
    <section className={`${rvewcss.reviewCard} ${isEven ? rvewcss.even : ""}`}>
      <header className={rvewcss.cardHead}>
        <img className={rvewcss.cardAvatarIcon} alt="" src={avatar} />
        <div className={rvewcss.cardInfo}>
          <h1 className={rvewcss.cardName}>{name}</h1>
          <span className={rvewcss.cardStatus}>{status}</span>
        </div>
      </header>
      <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
      <p className={rvewcss.cardContent}>{content}</p>
    </section>
  );
};
