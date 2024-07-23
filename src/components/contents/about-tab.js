import React, { useState } from "react";
import { useContent } from "@ibrahimstudio/react";
import Tag from "../contents/tag";
import styles from "./styles/about-tab.module.css";

const AboutTab = ({ tags, content }) => {
  const [activeTab, setActiveTab] = useState("1");
  const { stripContent } = useContent();

  const stringToArray = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(",").map((tag) => tag.trim());
  };

  const convertedTags = stringToArray(tags);
  const strippedContent = (content && stripContent(content)) || "Tidak ada deskripsi.";

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
          {convertedTags.length > 0 && (
            <div className={styles.contentCat}>
              {convertedTags.map((tag, index) => (
                <Tag key={index} tagText={tag} />
              ))}
            </div>
          )}
          <p className={styles.contentText}>{strippedContent}</p>
        </div>
      )}
      {activeTab === "2" && <div className={styles.tabContent}></div>}
    </section>
  );
};

export default AboutTab;
