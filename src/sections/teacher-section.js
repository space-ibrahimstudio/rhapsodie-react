import React from "react";
import { Button } from "@ibrahimstudio/button";
import { Arrow } from "../components/contents/icons";
import styles from "./styles/teacher-section.module.css";
import head from "./styles/section-head.module.css";
import body from "./styles/section-body.module.css";

export const SectionHead = ({ title }) => {
  return (
    <header className={head.sectionHead}>
      <h1 className={head.sectionTitle}>{title}</h1>
      <Button variant="hollow" size="sm" color="var(--color-primary)" buttonText="Lihat Semua" endContent={<Arrow />} />
    </header>
  );
};

export const SectionBody = ({ children }) => {
  return <section className={body.sectionBody}>{children}</section>;
};

const TeacherSection = ({ id, children }) => {
  return (
    <section id={id} className={styles.teacherSection}>
      {children}
    </section>
  );
};

export default TeacherSection;
