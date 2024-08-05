import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import UserBoard from "../components/contents/user-board";

const UserPage = () => {
  const { isLoggedin, userData } = useAuth();

  if (!isLoggedin) {
    return <Navigate to="/login" />;
  }

  console.log("user data:", userData);

  return (
    <PageLayout as="child">
      <Section>
        <UserBoard userdata={userData} />
      </Section>
    </PageLayout>
  );
};

export default UserPage;
