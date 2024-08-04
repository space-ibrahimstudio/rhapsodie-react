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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
    setIsLoading(true);
    try {
      const formData = new FormData();
      const ratingFormData = new FormData();
      formData.append("slug", slug);
      const data = await apiRead(formData, "main", "teacherdetail2");
      if (data && data.data && data.data.length > 0) {
        setSelectedData(data.data[0]);
        ratingFormData.append("data", JSON.stringify({ iduser: data.data[0]["teacher"].id }));
        const ratingdata = await apiRead(ratingFormData, "main", "teacherreview");
        if (ratingdata && ratingdata.data && ratingdata.data.length > 0) {
          setRatingData(ratingdata.data);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
    <PageLayout as="child">
      <Section>
        <TeacherBoard
          isLoading={isLoading}
          name={selectedData["teacher"] && selectedData["teacher"].name}
          avatar={selectedData["teacher"] && selectedData["teacher"].image === null ? "/jpg/fallback.jpg" : `${imgURL}/${selectedData["teacher"] && selectedData["teacher"].image}`}
          header={selectedData["teacher"] && selectedData["teacher"].cover === null ? "/jpg/fallback.jpg" : `${imgURL}/${selectedData["teacher"] && selectedData["teacher"].cover}`}
          shortBio={selectedData["teacher"] && selectedData["teacher"].short_description}
          bio={selectedData["teacher"] && selectedData["teacher"].description}
          location={selectedData["location"] && selectedData["location"]}
          rating={ratingData.length}
          tags={selectedData["teacher"] && selectedData["teacher"].services}
          reviews={ratingData}
        />
      </Section>
    </PageLayout>
  );
};

export default TeacherPage;
