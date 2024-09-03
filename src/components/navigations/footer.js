import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../contents/image";
import styles from "./styles/footer.module.css";
import li from "./styles/contact-li.module.css";
import contact from "./styles/footer-contact.module.css";
import menu from "./styles/footer-menu.module.css";
import social from "./styles/footer-socials.module.css";

const ContactLi = ({ liIcon, liText, contactLiAlignSelf, liTextFlex, onClick = () => {} }) => {
  const contactLiStyle = useMemo(() => {
    return { alignSelf: contactLiAlignSelf };
  }, [contactLiAlignSelf]);

  const liTextStyle = useMemo(() => {
    return { flex: liTextFlex };
  }, [liTextFlex]);

  return (
    <div className={li.contactLi} style={contactLiStyle} onClick={onClick}>
      <Image width="var(--pixel-25)" height="auto" src={liIcon} />
      <span className={li.liText} style={liTextStyle}>
        {liText}
      </span>
    </div>
  );
};

const FooterMenu = ({ title, lists }) => {
  const navigate = useNavigate();

  return (
    <section className={menu.footerMenu}>
      <h1 className={menu.menuTitle}>{title}</h1>
      {lists.map((list, index) => (
        <span key={index} className={menu.menuLi} onClick={() => navigate(`${list.source}`)}>
          {list.label}
        </span>
      ))}
    </section>
  );
};

const FooterSocials = ({ socials }) => {
  const openLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section className={social.footerSocials}>
      <h1 className={social.socialsTitle}>Socials</h1>
      {socials.map((social, index) => (
        <ContactLi key={index} liIcon={social.icon} liText={social.label} contactLiAlignSelf="unset" liTextFlex="unset" onClick={() => openLink(social.source)} />
      ))}
    </section>
  );
};

const FooterContact = ({ contacts }) => {
  const openLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <section className={contact.footerContact}>
      <Image width="auto" height="var(--pixel-40)" src="/png/logo-primary.png" />
      {contacts.map((contact, index) => (
        <ContactLi key={index} liIcon={contact.icon} liText={contact.label} contactLiAlignSelf="stretch" liTextFlex="1" onClick={() => openLink(contact.source)} />
      ))}
    </section>
  );
};

const Footer = () => {
  const contacts = [
    { icon: "/svg/phone.svg", label: "+62 8231 0135 613", source: "tel:082310135613" },
    { icon: "/svg/office.svg", label: "Ruko Maggiore Grande Blok H. 3, Gading, Kec. Serpong, Kabupaten Tangerang, Banten 15332", source: "https://maps.app.goo.gl/xcQpRwiPGC4wqTEs9" },
    { icon: "/svg/email.svg", label: "customer.care@rhapsodie.co", source: "mailto:customer.care@rhapsodie.co" },
  ];

  const socials = [
    { icon: "/svg/insta.svg", label: "@officialrhapsodie.co", source: "https://www.instagram.com/officialrhapsodie.co" },
    { icon: "/svg/wa.svg", label: "+62811-1379-279", source: "https://wa.me/628111379279" },
    { icon: "/svg/yt.svg", label: "Rhapsodie.co", source: "https://www.youtube.com/@rhapsodie5686" },
    { icon: "/svg/fb.svg", label: "Rhapsodie.co", source: "https://www.facebook.com/profile.php?id=61562585294924" },
    { icon: "/svg/tt.svg", label: "Officialrhapsodie.co", source: "https://www.tiktok.com/@officialrhapsodie.co" },
  ];

  const lessons = [
    { label: "Piano Courses", source: "/kategori/piano" },
    { label: "Vocal Courses", source: "/kategori/vocal" },
    { label: "Violin Courses", source: "/kategori/violin" },
    { label: "Keyboard Courses", source: "/kategori/keyboard" },
    { label: "Bass Courses", source: "/kategori/bass-electric" },
    { label: "Cello Courses", source: "/kategori/cello" },
    { label: "Clarinet Courses", source: "/kategori/clarinet" },
  ];
  const abouts = [
    { label: "About Us", source: "/" },
    { label: "FAQs", source: "/" },
    { label: "Blogs", source: "/" },
    { label: "Terms & Condition", source: "/" },
    { label: "Privacy Policy", source: "/" },
  ];
  const teacherfor = [
    { label: "Become a Music Teacher", source: "/" },
    { label: "FAQs", source: "/" },
  ];
  const teachernear = [
    { label: "Music Teacher in Tangerang Selatan", source: "/pencarian/Tangerang%20Selatan" },
    { label: "Music Teacher in Tangerang Kota", source: "/pencarian/Tangerang%20Kota" },
    { label: "Music Teacher in Jakarta", source: "/pencarian/Jakarta" },
    { label: "Music Teacher in Depok", source: "/pencarian/Depok" },
    { label: "Music Teacher in Bogor", source: "/pencarian/Bogor" },
    { label: "Music Teacher in Bekasi", source: "/pencarian/Bekasi" },
  ];

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
