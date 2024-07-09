import React from "react";
import { teacherList } from "../lib/dummy";
import PageLayout from "../components/pages";
import Section from "../sections/section";
import TeacherBoard from "../components/teacher-board";

const TeacherPage = ({ params }) => {
  const selectedTeacher = teacherList.find((item) => item.id === params);

  return (
    <PageLayout>
      <Section>
        <TeacherBoard name={selectedTeacher.name} avatar={selectedTeacher.image} header="/jpg/fallback.jpg" shortBio={selectedTeacher.short} bio={selectedTeacher.bio} location={selectedTeacher.location} rating={selectedTeacher.rating_total} tags={selectedTeacher.tags} reviews={selectedTeacher.reviews} />
      </Section>
    </PageLayout>
  );
};

export default TeacherPage;
