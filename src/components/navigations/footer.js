import React, { useMemo } from "react";
import Image from "../contents/image";
import styles from "./styles/footer.module.css";
import li from "./styles/contact-li.module.css";
import contact from "./styles/footer-contact.module.css";
import menu from "./styles/footer-menu.module.css";
import social from "./styles/footer-socials.module.css";

const ContactLi = ({ liIcon, liText, contactLiAlignSelf, liTextFlex }) => {
  const contactLiStyle = useMemo(() => {
    return { alignSelf: contactLiAlignSelf };
  }, [contactLiAlignSelf]);

  const liTextStyle = useMemo(() => {
    return { flex: liTextFlex };
  }, [liTextFlex]);

  return (
    <div className={li.contactLi} style={contactLiStyle}>
      <Image width="var(--pixel-25)" height="auto" src={liIcon} />
      <span className={li.liText} style={liTextStyle}>
        {liText}
      </span>
    </div>
  );
};

const FooterMenu = ({ title, lists }) => {
  return (
    <section className={menu.footerMenu}>
      <h1 className={menu.menuTitle}>{title}</h1>
      {lists.map((list, index) => (
        <span key={index} className={menu.menuLi}>
          {list.label}
        </span>
      ))}
    </section>
  );
};

const FooterSocials = ({ socials }) => {
  return (
    <section className={social.footerSocials}>
      <h1 className={social.socialsTitle}>Socials</h1>
      {socials.map((social, index) => (
        <ContactLi key={index} liIcon={social.icon} liText={social.label} contactLiAlignSelf="unset" liTextFlex="unset" />
      ))}
    </section>
  );
};

const FooterContact = ({ contacts }) => {
  return (
    <section className={contact.footerContact}>
      <Image width="auto" height="var(--pixel-40)" src="/png/logo-primary.png" />
      {contacts.map((contact, index) => (
        <ContactLi key={index} liIcon={contact.icon} liText={contact.label} contactLiAlignSelf="stretch" liTextFlex="1" />
      ))}
    </section>
  );
};

const Footer = () => {
  const contacts = [
    { icon: "/svg/phone.svg", label: "+62 8231 0135 613" },
    { icon: "/svg/office.svg", label: "Ruko Maggiore Grande Blok H. 3, Gading, Kec. Serpong, Kabupaten Tangerang, Banten 15332" },
    { icon: "/svg/email.svg", label: "customer.care@rhapsodie.co" },
  ];

  const socials = [
    { icon: "/svg/insta.svg", label: "@officialrhapsodie.co" },
    { icon: "/svg/wa.svg", label: "+62 8231 0135 613" },
    { icon: "/svg/yt.svg", label: "Rhapsodie.co" },
    { icon: "/svg/fb.svg", label: "Rhapsodie.co" },
    { icon: "/svg/tt.svg", label: "Officialrhapsodie.co" },
  ];

  const lessons = [{ label: "Piano Courses" }, { label: "Vocal Courses" }, { label: "Violin Courses" }, { label: "Keyboard Courses" }, { label: "Bass Courses" }, { label: "Cello Courses" }, { label: "Clarinet Courses" }];
  const abouts = [{ label: "About Us" }, { label: "FAQs" }, { label: "Blogs" }, { label: "Terms & Condition" }, { label: "Privacy Policy" }];
  const teacherfor = [{ label: "Become a Music" }, { label: "FAQs" }];
  const teachernear = [{ label: "Music Teacher in Tangerang Selatan" }, { label: "Music Teacher in Tangerang Kota" }, { label: "Music Teacher in Jakarta" }, { label: "Music Teacher in Depok" }, { label: "Music Teacher in Bogor" }, { label: "Music Teacher in Bekasi" }];

  return (
    <footer className={styles.footer}>
      <section className={styles.footerContent}>
        <FooterContact contacts={contacts} />
        <FooterSocials socials={socials} />
        <FooterMenu title="Music Lesson" lists={lessons} />
        <FooterMenu title="About Rhapsodie" lists={abouts} />
        <FooterMenu title="For Teacher" lists={teacherfor} />
        <FooterMenu title="Teachers Near You" lists={teachernear} />
      </section>
      <span className={styles.footerCopyright}>© 2024 Rhapsodie.co. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
