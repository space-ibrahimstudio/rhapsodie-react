import React from "react";

const Image = ({ className, width, height, style, alt, src, onClick }) => {
  const imagestyle = { position: "relative", width, height, cursor: onClick ? "pointer" : "default" };
  return <img className={className} style={{ ...imagestyle, ...style }} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

export default Image;
