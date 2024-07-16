import React from "react";
import styles from "./styles/whatsapp-button.module.css";

const WhatsappButton = ({ onClick = () => {} }) => {
  return (
    <button className={styles.whatsappButton} onClick={onClick}>
      <img className={styles.whatsappButtonIcon} alt="" src="/svg/whatsapp-floating.svg" />
    </button>
  );
};

export default WhatsappButton;
