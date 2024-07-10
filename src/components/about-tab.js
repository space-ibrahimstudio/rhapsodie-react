import React, { act, useState } from "react";
import Tag from "./tag";
import styles from "./styles/about-tab.module.css";

const AboutTab = ({ tags, content }) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className={styles.aboutTab}>
      <nav className={styles.tabSwitch}>
        <button className={`${styles.switchButton} ${activeTab === "1" ? styles.active : ""}`} onClick={() => setActiveTab("1")}>
          <b className={styles.buttonText}>Tentang Guru</b>
        </button>
        <button className={`${styles.switchButton} ${activeTab === "2" ? styles.active : ""}`} onClick={() => setActiveTab("2")}>
          <b className={styles.buttonText}>Jadwal Guru</b>
        </button>
      </nav>
      {activeTab === "1" && (
        <div className={styles.tabContent}>
          <div className={styles.contentCat}>
            {tags.map((tag, index) => (
              <Tag key={index} tagText={tag.label} />
            ))}
          </div>
          <p className={styles.contentText}>{content}</p>
        </div>
      )}
      {activeTab === "2" && <div className={styles.tabContent}></div>}
    </section>
  );
};

export default AboutTab;
