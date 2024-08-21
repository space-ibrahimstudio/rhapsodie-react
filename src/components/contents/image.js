import React, { Fragment, useState } from "react";
import styles from "./styles/oimage.module.css";

export const OImage = ({ className, width, height, style, alt, src }) => {
  const imagestyle = { position: "relative", width, height, cursor: "pointer" };
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const openInNewTab = () => window.open(src, "_blank");

  return (
    <Fragment>
      <img className={className} style={{ ...imagestyle, ...style }} alt={alt} loading="lazy" src={src} onClick={openPopup} />
      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} className={styles.popupImage} onClick={openInNewTab} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const Image = ({ className, width, height, style, alt, src, onClick }) => {
  const imagestyle = { position: "relative", width, height, cursor: onClick ? "pointer" : "default" };
  return <img className={className} style={{ ...imagestyle, ...style }} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

export default Image;
