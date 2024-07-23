import React from "react";
import Skeleton from "./skeleton";
import styles from "./styles/tag.module.css";

const Tag = ({ isLoading = false, tagText }) => {
  return isLoading ? (
    <Skeleton type="txt-min" w="var(--pixel-50)" />
  ) : (
    <div className={styles.tag}>
      <b className={styles.tagText}>{tagText}</b>
    </div>
  );
};

export default Tag;
