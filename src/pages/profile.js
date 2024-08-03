import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApi } from "../lib/api";
import { useAuth } from "../lib/auth";
import PageLayout from "../components/frames/pages";
import Section from "../components/frames/section";
import UserBoard from "../components/contents/user-board";

const UserPage = () => {
  const { apiRead } = useApi();
  const { isLoggedin, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  //   const fetchData = async () => {
  //     const errormsg = "Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.";
  //     setIsLoading(true);
  //     try {
  //       const formData = new FormData();
  //       const ratingFormData = new FormData();
  //       formData.append("slug", slug);
  //       const data = await apiRead(formData, "main", "teacherdetail2");
  //       if (data && data.length > 0) {
  //         setSelectedData(data[0]);
  //         ratingFormData.append("data", JSON.stringify({ iduser: data[0]["teacher"].id }));
  //         const ratingdata = await apiRead(ratingFormData, "main", "teacherreview");
  //         if (ratingdata && ratingdata.length > 0) {
  //           setRatingData(ratingdata);
  //         } else {
  //           setRatingData([]);
  //         }
  //       } else {
  //         setSelectedData([]);
  //         setRatingData([]);
  //       }
  //     } catch (error) {
  //       console.error(errormsg, error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, [slug]);

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
