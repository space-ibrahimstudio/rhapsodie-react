import React from "react";
import { Search } from "./icons";
import styles from "./styles/suggest.module.css";

const Suggest = ({ label }) => {
  return (
    <button className={styles.suggest}>
      <Search size="var(--pixel-15)" color="var(--color-primary)" />
      <b className={styles.suggestText}>{label}</b>
    </button>
  );
};

export default Suggest;
