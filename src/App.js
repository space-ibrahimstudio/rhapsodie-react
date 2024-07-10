import React from "react";
import { Route, Routes } from "react-router-dom";
import { teacherList } from "./lib/dummy";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import TeacherPage from "./pages/teacher";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {teacherList.map((data, index) => (
        <Route key={index} path={`/guru/${data.id}`} element={<TeacherPage params={data.id} />} />
      ))}
    </Routes>
  );
}

export default App;
