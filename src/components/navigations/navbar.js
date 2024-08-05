import React, { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useAuth } from "../../lib/auth";
import Image from "../contents/image";
import SearchDrawer from "./search-drawer";
import MenuDrawer from "./menu-drawer";
import { Search, Burger, Close } from "../contents/icons";
import styles from "./styles/navbar.module.css";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const Navbar = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const { width } = useWindow();
  const { isLoggedin, userProvider, userData, logout, oAuthLogout } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const avatarURL = userData && userData.avatar ? (userProvider === "origin" ? `${imgURL}/${userData.avatar}` : userData.avatar) : "/jpg/avatar.jpg";

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    if (userProvider === "origin") {
      logout();
    } else {
      oAuthLogout();
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/pencarian/${keyword}`);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <header className={styles.navbar}>
        <nav className={styles.navbarContent}>
          {width > 772 ? <Image width="auto" height="var(--pixel-30)" style={{ marginLeft: "var(--pixel-20)", marginRight: "var(--pixel-20)", cursor: "pointer" }} src="/png/logo-primary.png" onClick={() => navigate("/")} /> : <Image width="auto" height="var(--pixel-40)" style={{ marginRight: "var(--pixel-15)" }} src="/svg/logo-secondary.svg" onClick={() => navigate("/")} />}
          <div className={styles.navbarMenu}>
            <div ref={ref} className={styles.navbarSearch} onClick={() => setSearchOpen(true)} onKeyDown={handleSearch}>
              <Input isLabeled={false} radius="full" type="text" name="keyword" value={keyword} placeholder="Cari yang kamu butuhkan disini ..." onChange={(e) => setKeyword(e.target.value)} endContent={<Search />} />
            </div>
            {width > 772 ? (
              <Fragment>
                {!isLoggedin && <Button radius="full" size="sm" buttonText="Masuk" onClick={() => navigate("/login")} />}
                {!isLoggedin && <Button radius="full" size="sm" bgColor="var(--color-hint)" buttonText="Daftar Gratis" onClick={() => navigate("/signup")} />}
                {isLoggedin && <Image width="var(--pixel-40)" height="var(--pixel-40)" style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center", cursor: "pointer" }} src={avatarURL} onClick={() => navigate("/profil")} />}
                {isLoggedin && <Button radius="full" size="sm" bgColor="var(--color-hint)" buttonText="Keluar" onClick={handleLogout} />}
              </Fragment>
            ) : (
              <Fragment>
                {isLoggedin && <Image width="var(--pixel-40)" height="var(--pixel-40)" style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "center", cursor: "pointer" }} src={avatarURL} onClick={() => navigate("/profil")} />}
                <Button variant="hollow" subVariant="icon" radius="full" color="var(--color-primary)" iconContent={menuOpen ? <Close /> : <Burger />} onClick={() => setMenuOpen(true)} />
              </Fragment>
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
