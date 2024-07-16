import React from "react";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../contents/icons";
import styles from "./styles/back-button.module.css";

const BackButton = ({ isLower = true }) => {
  const navigate = useNavigate();

  return (
    <button className={`${styles.backButton} ${isLower ? styles.lower : ""}`} onClick={() => navigate(-1)}>
      <Arrow direction="left" color="var(--color-secondary)" size="var(--pixel-25)" />
    </button>
  );
};

export default BackButton;
