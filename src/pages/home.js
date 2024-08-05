import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow, useContent } from "@ibrahimstudio/react";
import { SEO } from "../lib/seo";
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
  const { apiGet, apiRead } = useApi();
  const { width } = useWindow();
  const { toPathname } = useContent();
  const [isLoading, setIsLoading] = useState(false);
  const [categData, setCategData] = useState([]);
  const [recoTData, setRecoTData] = useState([]);
  const [specTData, setSpecTData] = useState([]);
  const [privTData, setPrivTData] = useState([]);

  const sliders = [
    { label: "", image: "/jpg/banner-1.png" },
    { label: "", image: "/jpg/banner-2.png" },
    { label: "", image: "/jpg/banner-3.png" },
    { label: "", image: "/jpg/banner-4.png" },
  ];
  const renderSlider = (item) => <Image alt={item.label} src={item.image} width="100%" height="auto" style={width > 700 ? { borderRadius: "var(--pixel-10)" } : { borderRadius: "unset" }} />;

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setIsLoading(true);
    const formData = new FormData();
    formData.append("limit", "5");
    try {
      const recotdata = await apiRead(formData, "main", "teacherrekom");
      setRecoTData(recotdata && recotdata.data && recotdata.data.length > 0 ? recotdata.data : []);
      const spectdata = await apiRead(formData, "main", "teacherspesial");
      setSpecTData(spectdata && spectdata.data && spectdata.data.length > 0 ? spectdata.data : []);
      const privtdata = await apiRead(formData, "main", "teacherprivate");
      setPrivTData(privtdata && privtdata.data && privtdata.data.length > 0 ? privtdata.data : []);
      const categdata = await apiGet("main", "categoryview");
      setCategData(categdata && categdata.data && categdata.data.length > 0 ? categdata.data : []);
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderedRecoT = isLoading ? Array.from({ length: 5 }, () => ({})) : recoTData;
  const renderedSpecT = isLoading ? Array.from({ length: 5 }, () => ({})) : specTData;
  const renderedPrivT = isLoading ? Array.from({ length: 5 }, () => ({})) : privTData;

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
          {categData.slice(0, 9).map((lesson, index) => (
            <CatCard key={index} cardImage={`${imgURL}/${lesson.image}`} cardTitle={lesson.name} onClick={() => navigate(`/kategori/${toPathname(lesson.name)}`)} />
          ))}
          <CatCard cardImage="/svg/drawer.svg" cardTitle="Lihat Semua" onClick={() => navigate("/kategori")} />
        </CategorySection>
        {renderedTSection.map((section, index) => (
          <TeacherSection id={section.id} key={index}>
            <SectionHead title={section.title} />
            <SectionBody>
              {section.arraydata.map((teacher, index) => (
                <TeacherCard isLoading={isLoading} key={index} image={teacher["teacher"] && teacher["teacher"].image === null ? "/jpg/fallback.jpg" : teacher["teacher"] && `${imgURL}/${teacher["teacher"].image}`} name={teacher["teacher"] && teacher["teacher"].name} location={teacher["location"]} rating={teacher["review"] && teacher["review"].length} tags={teacher["teacher"] && teacher["teacher"].services} onClick={() => navigate(`/guru/${teacher["teacher"].slug}`)} />
              ))}
            </SectionBody>
          </TeacherSection>
        ))}
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
