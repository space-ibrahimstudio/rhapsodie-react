import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../lib/api";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import TeacherBoard from "../components/contents/teacher-board";

const imgURL = process.env.REACT_APP_IMGSRC_URL;

const TeacherPage = () => {
  const { slug } = useParams();
  const { apiRead } = useApi();
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setLoading(true);
    try {
      const formData = new FormData();
      const ratingFormData = new FormData();
      formData.append("slug", slug);
      const data = await apiRead(formData, "main", "teacherdetail");
      if (data && data.length > 0) {
        setSelectedData(data[0]);
        ratingFormData.append("data", JSON.stringify({ iduser: "10" }));
        const ratingdata = await apiRead(ratingFormData, "main", "teacherreview");
        if (ratingdata && ratingdata.length > 0) {
          setRatingData(ratingdata);
        } else {
          setRatingData([]);
        }
      } else {
        setSelectedData([]);
        setRatingData([]);
      }
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <PageLayout as="child">
      <Section>
        <TeacherBoard name={selectedData.name} avatar={selectedData.logo === null ? "/jpg/fallback.jpg" : `${imgURL}/${selectedData.logo}`} header={selectedData.cover === null ? "/jpg/fallback.jpg" : `${imgURL}/${selectedData.cover}`} shortBio={selectedData.short_description} bio={selectedData.description} location={selectedData.address} rating={ratingData.length} tags={selectedData.services} reviews={ratingData} />
      </Section>
    </PageLayout>
  );
};

export default TeacherPage;
