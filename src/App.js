import React from "react";
import { Route, Routes } from "react-router-dom";
import { teacherList } from "./lib/dummy";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import TeacherPage from "./pages/teacher";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {teacherList.map((data, index) => (
        <Route key={index} path={`/guru/${data.id}`} element={<TeacherPage params={data.id} />} />
      ))}
    </Routes>
  );
}

export default App;
