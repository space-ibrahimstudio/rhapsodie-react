import React from "react";
import styles from "./styles/skeleton.module.css";

export const SkeGroup = ({ flexDir = "column", width = "100%", gap = "var(--pixel-10)", justifyC = "flex-start", alignI = "flex-start", children }) => {
  const groupstyle = { display: "inline-flex", flexDirection: flexDir, width, gap, justifyContent: justifyC, alignItems: alignI };
  return <div style={groupstyle}>{children}</div>;
};

const Skeleton = ({ type = "txt-md", w, h }) => {
  const renderstyle = () => {
    let height;
    let width;
    switch (type) {
      case "txt-xlg":
        height = h || "var(--pixel-60)";
        width = w;
        break;
      case "txt-lg":
        height = h || "var(--pixel-40)";
        width = w;
        break;
      case "txt-md":
        height = h || "var(--pixel-30)";
        width = w;
        break;
      case "txt-sm":
        height = h || "var(--pixel-25)";
        width = w;
        break;
      case "txt-xsm":
        height = h || "var(--pixel-20)";
        width = w;
        break;
      case "txt-min":
        height = h || "var(--pixel-15)";
        width = w;
        break;
      case "txt-tin":
        height = h || "var(--pixel-10)";
        width = w;
        break;
      case "img":
        height = h || "var(--pixel-200)";
        width = w;
        break;
      default:
        height = h;
        width = w;
        break;
    }
    return { height, width };
  };
  return <div className={`${styles.skeleton} ${type === "img" ? styles.image : styles.text}`} style={renderstyle()} />;
};

export default Skeleton;
