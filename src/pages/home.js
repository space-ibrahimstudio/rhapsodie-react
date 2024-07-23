import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "../lib/seo";
import { lessonCategory } from "../lib/dummy";
import { useApi } from "../lib/api";
import PageLayout from "../components/frames/pages";
import SliderSection from "../sections/slider-section";
import CategorySection from "../sections/category-section";
import TeacherSection, { SectionHead, SectionBody } from "../sections/teacher-section";
import Image from "../components/contents/image";
import CatCard from "../components/cards/cat-card";
import TeacherCard from "../components/cards/teacher-card";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const { apiGet } = useApi();
  const [recoTData, setRecoTData] = useState([]);
  const [specTData, setSpecTData] = useState([]);
  const [privTData, setPrivTData] = useState([]);

  const sliders = [
    { label: "", image: "/jpg/banner-1.png" },
    { label: "", image: "/jpg/banner-2.png" },
    { label: "", image: "/jpg/banner-3.png" },
    { label: "", image: "/jpg/banner-4.png" },
  ];
  const renderSlider = (item) => <Image alt={item.label} src={item.image} width="100%" height="auto" style={{ borderRadius: "var(--pixel-10)" }} />;

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    try {
      const recotdata = await apiGet("main", "teacherrekom");
      if (recotdata && recotdata.length > 0) {
        setRecoTData(recotdata);
      } else {
        setRecoTData([]);
      }
      const spectdata = await apiGet("main", "teacherspesial");
      if (spectdata && spectdata.length > 0) {
        setSpecTData(spectdata);
      } else {
        setSpecTData([]);
      }
      const privtdata = await apiGet("main", "teacherprivate");
      if (privtdata && privtdata.length > 0) {
        setPrivTData(privtdata);
      } else {
        setPrivTData([]);
      }
    } catch (error) {
      console.error(errormsg, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <SEO title="Platform Pencarian Guru Musik" route="/" />
      <PageLayout>
        <SliderSection content={sliders} renderContent={renderSlider} contentStyle={{ minWidth: "100%" }} />
        <CategorySection>
          {lessonCategory.map((lesson, index) => (
            <CatCard key={index} cardImage={lesson.icon} cardTitle={lesson.label} />
          ))}
        </CategorySection>
        <TeacherSection>
          <SectionHead title="Guru Rekomendasi" />
          <SectionBody>
            {recoTData.map((teacher, index) => (
              <TeacherCard key={index} image={teacher.logo === null ? "/jpg/fallback.jpg" : `${imgURL}/${teacher.logo}`} name={teacher.name} location={teacher.address} rating={teacher.rating_total} tags={teacher.services} onClick={() => navigate(`/guru/${teacher.slug}`)} />
            ))}
          </SectionBody>
        </TeacherSection>
        <TeacherSection>
          <SectionHead title="Penawaran Spesial" />
          <SectionBody>
            {specTData.map((teacher, index) => (
              <TeacherCard key={index} image={teacher.logo === null ? "/jpg/fallback.jpg" : `${imgURL}/${teacher.logo}`} name={teacher.name} location={teacher.address} rating={teacher.rating_total} tags={teacher.services} onClick={() => navigate(`/guru/${teacher.slug}`)} />
            ))}
          </SectionBody>
        </TeacherSection>
        <TeacherSection>
          <SectionHead title="Guru Privat" />
          <SectionBody>
            {privTData.map((teacher, index) => (
              <TeacherCard key={index} image={teacher.logo === null ? "/jpg/fallback.jpg" : `${imgURL}/${teacher.logo}`} name={teacher.name} location={teacher.address} rating={teacher.rating_total} tags={teacher.services} onClick={() => navigate(`/guru/${teacher.slug}`)} />
            ))}
          </SectionBody>
        </TeacherSection>
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
