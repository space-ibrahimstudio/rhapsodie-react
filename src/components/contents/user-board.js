import React, { useState } from "react";
import { Button } from "@ibrahimstudio/button";
import { useWindow } from "@ibrahimstudio/react";
import styles from "./styles/user-board.module.css";
import tabcss from "./styles/board-tab.module.css";
import setcss from "./styles/info-set.module.css";
import btncss from "./styles/tab-button.module.css";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const TabButton = ({ buttonText, isActive = false, onClick = () => {} }) => {
  return (
    <button className={`${btncss.tabButton} ${isActive ? btncss.active : ""}`} onClick={onClick}>
      <b className={btncss.buttonText}>{buttonText}</b>
    </button>
  );
};

const InfoSet = ({ infoLabel, infoValue }) => {
  return (
    <section className={setcss.infoSet}>
      <b className={setcss.infoLabel}>{infoLabel}</b>
      <b className={setcss.infoSeparator}>:</b>
      <b className={setcss.infoValue}>{infoValue}</b>
    </section>
  );
};

const BoardTab = ({ children }) => {
  return <nav className={tabcss.boardTab}>{children}</nav>;
};

const UserBoard = ({ userdata }) => {
  const { width } = useWindow();
  const [activeTab, setActiveTab] = useState("1");
  const [newsLetter, setNewsLetter] = useState(true);

  return (
    <section className={styles.userBoard}>
      <h1 className={styles.boardTitle}>My Profile</h1>
      <section className={styles.boardBody}>
        {width > 772 && (
          <BoardTab>
            <TabButton buttonText="My Profile" isActive={activeTab === "1"} />
            <TabButton buttonText="My Member List" />
            <TabButton buttonText="Schedule" />
            <TabButton buttonText="Reviews" />
            <TabButton buttonText="Favourites" />
            <TabButton buttonText="Transaction" />
            <TabButton buttonText="Point Rewards" />
            <TabButton buttonText="Notifications" />
            <TabButton buttonText="Help Center" />
          </BoardTab>
        )}
        <article className={styles.boardContent} style={width > 772 ? { borderLeft: "1px solid var(--color-primary-30)" } : { borderLeft: "unset" }}>
          <section className={styles.boardProfile} style={width >= 500 ? { flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" } : { flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
            <header className={styles.profilePic}>
              <img className={styles.picIcon} alt={(userdata && userdata.name) || "Not Set"} src={userdata && userdata.avatar ? `${imgURL}/${userdata.avatar}` : "/jpg/avatar.jpg"} loading="lazy" />
              <Button id="update-avatar" size="sm" radius="full" buttonText="Update" />
            </header>
            <section className={styles.profileInfo} style={width >= 500 ? { flex: "1", textAlign: "left" } : { width: "100%", textAlign: "center" }}>
              <h1 className={styles.boardTitle}>{(userdata && userdata.name) || "Not Set"}</h1>
              <InfoSet infoLabel="Gender" infoValue={(userdata && userdata.gender) || "-"} />
              <InfoSet infoLabel="Birthdate" infoValue="-" />
              <InfoSet infoLabel="Phone" infoValue={(userdata && userdata.phone) || "-"} />
              <InfoSet infoLabel="Email" infoValue={(userdata && userdata.email) || "-"} />
              <InfoSet infoLabel="Home Address" infoValue="-" />
            </section>
            <Button id="update-profile" size="sm" radius="full" buttonText="Edit" />
          </section>
          <section className={styles.boardSubs}>
            <header className={styles.subsHeading}>
              <h1 className={styles.boardTitle}>Newsletter Subscribtion</h1>
              <p className={styles.subsDesc}>Don't forget to subscribe to our newsletter campaign to make sure that you get the latest event from us.</p>
            </header>
            <Button id="newsletter" size="sm" radius="full" bgColor="var(--color-hint)" buttonText={newsLetter ? "Disable" : "Enable"} onClick={() => setNewsLetter(!newsLetter)} />
          </section>
        </article>
      </section>
    </section>
  );
};

export default UserBoard;
