import React from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Arrow } from "../components/contents/icons";
import styles from "./styles/teacher-section.module.css";

export const SectionBody = ({ children }) => {
  return <section className={styles.sectionBody}>{children}</section>;
};

export const SectionHead = ({ title }) => {
  const navigate = useNavigate();
  const { toPathname } = useContent();

  return (
    <header className={styles.sectionHead}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      <Button id={`view-source-${title}`} variant="hollow" size="sm" color="var(--color-primary)" buttonText="Lihat Semua" endContent={<Arrow />} onClick={() => navigate(`/${toPathname(title)}`)} />
    </header>
  );
};

const TeacherSection = ({ children }) => {
  return (
    <section className={styles.teacherSection}>
      <section className={styles.sectionContent}>{children}</section>
    </section>
  );
};

export default TeacherSection;
