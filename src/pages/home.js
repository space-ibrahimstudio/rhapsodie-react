import React from "react";
import { useNavigate } from "react-router-dom";
import { lessonCategory, teacherList } from "../lib/dummy";
import PageLayout from "../components/frames/pages";
import SliderSection from "../sections/slider-section";
import CategorySection from "../sections/category-section";
import TeacherSection, { SectionHead, SectionBody } from "../sections/teacher-section";
import Image from "../components/contents/image";
import CatCard from "../components/cards/cat-card";
import TeacherCard from "../components/cards/teacher-card";

const HomePage = () => {
  const navigate = useNavigate();
  const sliders = [
    { label: "", image: "/jpg/banner-1.png" },
    { label: "", image: "/jpg/banner-2.png" },
    { label: "", image: "/jpg/banner-3.png" },
    { label: "", image: "/jpg/banner-4.png" },
  ];
  const renderSlider = (item) => <Image alt={item.label} src={item.image} width="100%" height="auto" />;

  return (
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
          {teacherList.map((teacher, index) => (
            <TeacherCard key={index} image="/jpg/fallback.jpg" name={teacher.name} location={teacher.location} rating={teacher.rating_total} tags={teacher.tags} onClick={() => navigate(`/guru/${teacher.id}`)} />
          ))}
        </SectionBody>
      </TeacherSection>
      <TeacherSection>
        <SectionHead title="Penawaran Spesial" />
        <SectionBody>
          {teacherList.map((teacher, index) => (
            <TeacherCard key={index} image="/jpg/fallback.jpg" name={teacher.name} location={teacher.location} rating={teacher.rating_total} tags={teacher.tags} onClick={() => navigate(`/guru/${teacher.id}`)} />
          ))}
        </SectionBody>
      </TeacherSection>
      <TeacherSection>
        <SectionHead title="Guru Privat" />
        <SectionBody>
          {teacherList.map((teacher, index) => (
            <TeacherCard key={index} image="/jpg/fallback.jpg" name={teacher.name} location={teacher.location} rating={teacher.rating_total} tags={teacher.tags} onClick={() => navigate(`/guru/${teacher.id}`)} />
          ))}
        </SectionBody>
      </TeacherSection>
    </PageLayout>
  );
};

export default HomePage;
