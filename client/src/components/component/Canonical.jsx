// src/components/Canonical.jsx
import { Helmet } from "react-helmet-async";

const Canonical = ({ url }) => {
  const baseUrl = "https://akanaa-i82c.onrender.com";
  return (
    <Helmet>
      <link rel="canonical" href={`${baseUrl}${url}`} />
    </Helmet>
  );
};

export default Canonical;
