import React from "react";
import styles from "./styles/whatsapp-button.module.css";

const WhatsappButton = () => {
  const openLink = () => {
    window.open("https://wa.me/6282310135613", "_blank");
  };

  return (
    <button className={styles.whatsappButton} onClick={openLink}>
      <img className={styles.whatsappButtonIcon} alt="" src="/svg/whatsapp-floating.svg" />
    </button>
  );
};

export default WhatsappButton;
