import React from "react";
import { teacherList } from "../lib/dummy";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import TeacherBoard from "../components/contents/teacher-board";

const TeacherPage = ({ params }) => {
  const selectedTeacher = teacherList.find((item) => item.id === params);

  return (
    <PageLayout as="child">
      <Section>
        <TeacherBoard name={selectedTeacher.name} avatar={selectedTeacher.image} header="/jpg/fallback.jpg" shortBio={selectedTeacher.short} bio={selectedTeacher.bio} location={selectedTeacher.location} rating={selectedTeacher.rating_total} tags={selectedTeacher.tags} reviews={selectedTeacher.reviews} />
      </Section>
    </PageLayout>
  );
};

export default TeacherPage;
