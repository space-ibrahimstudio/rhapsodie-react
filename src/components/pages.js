import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const PageLayout = ({ type = "main", children }) => {
  const pagestyles = { width: "100%", position: "relative", paddingTop: type === "main" ? "var(--pixel-90)" : "unset", backgroundColor: "var(--color-foreground)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" };
  return (
    <main style={pagestyles}>
      {type === "main" && <Navbar />}
      {children}
      {type === "main" && <Footer />}
    </main>
  );
};

export default PageLayout;
