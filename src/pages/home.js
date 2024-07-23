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
import { TeacherCard, CatCard } from "../components/contents/cards";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const { apiGet } = useApi();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const renderedRecoT = isLoading ? Array.from({ length: 4 }, () => ({})) : recoTData;
  const renderedSpecT = isLoading ? Array.from({ length: 4 }, () => ({})) : specTData;
  const renderedPrivT = isLoading ? Array.from({ length: 4 }, () => ({})) : privTData;

  const renderedTSection = [
    { id: "teacher-recommended", title: "Guru Rekomendasi", arraydata: renderedRecoT },
    { id: "teacher-special", title: "Penawaran Spesial", arraydata: renderedSpecT },
    { id: "teacher-private", title: "Guru Privat", arraydata: renderedPrivT },
  ];

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
        {renderedTSection.map((section, index) => (
          <TeacherSection id={section.id} key={index}>
            <SectionHead title={section.title} />
            <SectionBody>
              {section.arraydata.map((teacher, index) => (
                <TeacherCard isLoading={isLoading} key={index} image={teacher["teacher"] && teacher["teacher"].logo === null ? "/jpg/fallback.jpg" : teacher["teacher"] && `${imgURL}/${teacher["teacher"].logo}`} name={teacher["teacher"] && teacher["teacher"].name} location={teacher["teacher"] && teacher["teacher"].address} rating={teacher["review"] && teacher["review"].length} tags={teacher["teacher"] && teacher["teacher"].services} onClick={() => navigate(`/guru/${teacher["teacher"].slug}`)} />
              ))}
            </SectionBody>
          </TeacherSection>
        ))}
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
