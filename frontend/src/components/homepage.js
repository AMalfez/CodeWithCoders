import React from "react";
import "../styles/homepage.css";
import temple from "../assets/temple.svg";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="templeImg">
        <Image src={temple} />
      </div>
      <div className="homepageText">hello</div>
    </div>
  );
};

export default Homepage;
