import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import Image from "../contents/image";
import SearchDrawer from "./search-drawer";
import MenuDrawer from "./menu-drawer";
import { Search, Burger, Close } from "../contents/icons";
import styles from "./styles/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { width } = useWindow();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Fragment>
      <header className={styles.navbar}>
        <nav className={styles.navbarContent}>
          {width > 772 ? <Image width="auto" height="var(--pixel-30)" style={{ marginLeft: "var(--pixel-20)", marginRight: "var(--pixel-20)" }} src="/png/logo-primary.png" /> : <Image width="auto" height="var(--pixel-40)" style={{ marginRight: "var(--pixel-15)" }} src="/svg/logo-secondary.svg" />}
          <div className={styles.navbarMenu}>
            {!searchOpen && (
              <div className={styles.navbarSearch} onClick={() => setSearchOpen(true)}>
                <Input isLabeled={false} radius="full" type="text" placeholder="Cari yang kamu butuhkan disini ..." endContent={<Search />} />
              </div>
            )}
            {width > 772 ? (
              <Fragment>
                <Button radius="full" size="sm" buttonText="Masuk" onClick={() => navigate("/login")} />
                <Button radius="full" size="sm" bgColor="var(--color-hint)" buttonText="Daftar Gratis" onClick={() => navigate("/signup")} />
              </Fragment>
            ) : (
              <Button variant="hollow" subVariant="icon" radius="full" color="var(--color-primary)" iconContent={menuOpen ? <Close /> : <Burger />} onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </nav>
      </header>
      {searchOpen && <SearchDrawer onClose={() => setSearchOpen(false)} />}
      {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
    </Fragment>
  );
};

export default Navbar;
