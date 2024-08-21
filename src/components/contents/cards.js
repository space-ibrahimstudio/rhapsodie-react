import React, { Fragment } from "react";
import { useWindow } from "@ibrahimstudio/react";
import Tag from "./tag";
import Image, { OImage } from "./image";
import Skeleton from "./skeleton";
import { Location } from "./icons";
import tchrcss from "./styles/teacher-card.module.css";
import ctgrcss from "./styles/cat-card.module.css";
import rvewcss from "./styles/review-card.module.css";
import certcss from "./styles/cert-card.module.css";

export const TeacherCard = ({ isLoading = false, image, name, location, rating, tags = [], onClick }) => {
  return (
    <section className={tchrcss.teacherCard}>
      {isLoading ? <Skeleton type="img" h="var(--pixel-150)" /> : <OImage className={tchrcss.cardImageIcon} alt={name} src={image} />}
      <section className={tchrcss.cardContent} onClick={onClick}>
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
                <b className={tchrcss.detLoc}>{location.length > 0 ? location.map((loc, index) => (index + 1 === location.length ? loc.name : `${loc.name}, `)) : "N/A"}</b>
              </Fragment>
            )}
          </div>
        </header>
        <div className={tchrcss.contentStar}>
          {isLoading ? (
            <Skeleton type="txt-xsm" w="80%" />
          ) : (
            <Fragment>
              <Image width="auto" height="var(--pixel-15)" src="/svg/star.svg" />
              <b className={tchrcss.starCount}>{rating === 0 ? "(5)" : `(${rating})`}</b>
            </Fragment>
          )}
        </div>
        <div className={tchrcss.contentTag}>
          <div className={tchrcss.tagWrap}>
            {tags.slice(0, 2).map((tag, index) => (
              <Tag key={index} tagText={tag.name} />
            ))}
          </div>
          {tags.length > 2 && <Tag tagText={`+${tags.length - 2} Lainnya`} />}
        </div>
      </section>
    </section>
  );
};

export const CatCard = ({ isLoading = false, cardImage, cardTitle, onClick = () => {} }) => {
  return (
    <section className={ctgrcss.catCard} onClick={onClick}>
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

export const CertCard = ({ title }) => {
  const { width } = useWindow();

  return (
    <section className={certcss.certCard}>
      <header className={certcss.cardContent}>
        <h1 className={`${certcss.contentText} ${width <= 700 ? certcss.mobile : ""}`}>{title}</h1>
      </header>
      <img className={certcss.cardImageIcon} alt={title} src={width <= 700 ? "/png/cert-mobile.png" : "/png/cert-desktop.png"} />
    </section>
  );
};
