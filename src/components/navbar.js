import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import Image from "./image";
import { Search } from "./icons";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbarContent}>
        <Image width="auto" height="var(--pixel-30)" style={{ marginLeft: "var(--pixel-20)", marginRight: "var(--pixel-20)" }} src="/png/logo-primary.png" />
        <div className={styles.navbarMenu}>
          <Input isLabeled={false} radius="full" type="text" placeholder="Cari yang kamu butuhkan disini ..." endContent={<Search />} />
          <Button radius="full" size="sm" buttonText="Masuk" onClick={() => navigate("/login")} />
          <Button radius="full" size="sm" bgColor="var(--color-hint)" buttonText="Daftar Gratis" onClick={() => navigate("/signup")} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
