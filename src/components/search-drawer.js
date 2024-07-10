import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { teacherList } from "../lib/dummy";
import { Location, Search, Close } from "./icons";
import Suggest from "./suggest";
import TeacherCard from "./teacher-card";
import styles from "./styles/search-drawer.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const SearchDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ query: "", location: "" });

  const handleClose = () => setIsClosing(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (isClosing) {
      const animationDuration = 500;
      setTimeout(() => {
        onClose();
      }, animationDuration);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    let modalCount = 0;
    const popupModals = document.querySelectorAll(`.${styles.searchDrawer}`);
    popupModals.forEach((modal) => {
      if (!modal.classList.contains(`.${styles.close}`)) {
        modalCount++;
      }
    });
    document.documentElement.style.overflow = modalCount > 0 ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isClosing]);

  const modalElement = (
    <main className={styles.searchScroll}>
      <section className={`${styles.searchDrawer} ${isClosing ? styles.close : ""}`}>
        <nav className={styles.searchBar}>
          <Button subVariant="icon" radius="full" color="var(--color-primary)" bgColor="var(--color-primary-10)" iconContent={<Close />} onClick={handleClose} />
          <div className={styles.searchFieldset}>
            <Input isLabeled={false} type="text" radius="full" name="query" value={searchQuery.query} placeholder="Cari yang kamu butuhkan disini ..." onChange={handleInputChange} startContent={<Search />} />
            <Input isLabeled={false} type="text" radius="full" name="location" value={searchQuery.location} placeholder="Masukkan alamat kamu disini ..." onChange={handleInputChange} startContent={<Location />} />
          </div>
          <Button radius="full" buttonText="Temukan" />
        </nav>
        <section className={styles.searchSuggest}>
          <h1 className={styles.suggestTitle}>Paling sering dicari</h1>
          <div className={styles.suggestItems}>
            <Suggest label="Guitar Accoustic" />
            <Suggest label="Bass" />
            <Suggest label="Kelas Biola" />
            <Suggest label="Guru Piano" />
          </div>
        </section>
        <section className={styles.searchResult}>
          <div className={styles.resultHead}>
            <h1 className={styles.resultTitle}>Guru Popular</h1>
          </div>
          <div className={styles.resultItems}>
            {teacherList.map((teacher, index) => (
              <TeacherCard key={index} image="/jpg/fallback.jpg" name={teacher.name} location={teacher.location} rating={teacher.rating_total} tags={teacher.tags} onClick={() => navigate(`/guru/${teacher.id}`)} />
            ))}
          </div>
          <div className={styles.resultItems}>
            {teacherList.map((teacher, index) => (
              <TeacherCard key={index} image="/jpg/fallback.jpg" name={teacher.name} location={teacher.location} rating={teacher.rating_total} tags={teacher.tags} onClick={() => navigate(`/guru/${teacher.id}`)} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );

  return createPortal(modalElement, modalRoot);
};

export default SearchDrawer;
