import React from "react";
import styles from "./styles/tag.module.css";

const Tag = ({ tagText }) => {
  return (
    <div className={styles.tag}>
      <b className={styles.tagText}>{tagText}</b>
    </div>
  );
};

export default Tag;
