import React from "react";
import { Helmet } from "react-helmet-async";
import { useContent } from "@ibrahimstudio/react";

export function SEO({ title, description, route, thumbSrc }) {
  const { stripContent } = useContent();
  const domainurl = process.env.REACT_APP_DOMAIN_URL;
  const thumbnail = thumbSrc || "/img/img-01.jpg";
  const strippedDesc = (description && stripContent(description).substring(0, 160)) || "Rhapsodie Music is a music marketplace where you can find music teacher or music school to learn how to play music instruments.";

  return (
    <Helmet>
      <title>{`${title} | Rhapsodie.co`}</title>
      <link rel="canonical" href={`${domainurl}${route}`} />
      <meta property="og:title" content={`${title} | Rhapsodie.co`} />
      <meta property="og:description" content={strippedDesc} />
      <meta property="og:image" content={`${domainurl}${thumbnail}`} />
      <meta property="og:url" content={`${domainurl}${route}`} />
      <meta name="description" content={strippedDesc} />
      <meta name="twitter:title" content={`${title} | Rhapsode.co`} />
      <meta name="twitter:description" content={strippedDesc} />
      <meta name="twitter:image" content={`${domainurl}${thumbnail}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
