import React from "react";
import Tag from "./tag";
import styles from "./styles/about-tab.module.css";

const AboutTab = ({ tags, content }) => {
  return (
    <section className={styles.aboutTab}>
      <nav className={styles.tabSwitch}>
        <button className={styles.switchButtonActive}>
          <b className={styles.buttonText}>Tentang Guru</b>
        </button>
        <button className={styles.switchButton}>
          <b className={styles.buttonText1}>Jadwal Guru</b>
        </button>
      </nav>
      <div className={styles.tabContent}>
        <div className={styles.contentCat}>
          {tags.map((tag, index) => (
            <Tag key={index} tagText={tag.label} />
          ))}
        </div>
        <p className={styles.contentText}>{content}</p>
      </div>
    </section>
  );
};

export default AboutTab;
