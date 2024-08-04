import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@ibrahimstudio/react";
import { SEO } from "../lib/seo";
import { useApi } from "../lib/api";
import PageLayout from "../components/frames/pages";
import CategorySection from "../sections/category-section";
import { CatCard } from "../components/contents/cards";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const CategoryPage = () => {
  const navigate = useNavigate();
  const { toPathname } = useContent();
  const { apiGet } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [categData, setCategData] = useState([]);

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setIsLoading(true);
    try {
      const categdata = await apiGet("main", "categoryview");
      setCategData(categdata && categdata.data && categdata.data.length > 0 ? categdata.data : []);
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <SEO title="Kategori Lesson" route="/" />
      <PageLayout as="child">
        <CategorySection title="Semua Kategori">
          {categData.map((lesson, index) => (
            <CatCard key={index} cardImage={lesson.image ? `${imgURL}/${lesson.image}` : "/jpg/fallback.jpg"} cardTitle={lesson.name} onClick={() => navigate(`/kategori/${toPathname(lesson.name)}`)} />
          ))}
        </CategorySection>
      </PageLayout>
    </Fragment>
  );
};

export default CategoryPage;
