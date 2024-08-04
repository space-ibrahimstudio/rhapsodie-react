import React from "react";

const SectionTitle = ({ children }) => {
  const h1style = { margin: "0", alignSelf: "stretch", position: "relative", fontSize: "var(--font-md)", fontWeight: "800", fontFamily: "var(--font-mulish)", color: "var(--color-secondary)", textAlign: "center" };
  return <h1 style={h1style}>{children}</h1>;
};

export default SectionTitle;
