import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import TeacherPage from "./pages/teacher";
import UserPage from "./pages/profile";
import CategoryPage from "./pages/category";
import CatSlugPage from "./pages/cat-slug";
import GroupTypePage from "./pages/group-type";
import SearchParamsPage from "./pages/search-params";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/guru/:slug" element={<TeacherPage />} />
      <Route path="/profil" element={<UserPage />} />
      <Route path="/kategori" element={<CategoryPage />} />
      <Route path="/kategori/:slug" element={<CatSlugPage />} />
      <Route path="/:type" element={<GroupTypePage />} />
      <Route path="/pencarian/:params" element={<SearchParamsPage />} />
    </Routes>
  );
}

export default App;
