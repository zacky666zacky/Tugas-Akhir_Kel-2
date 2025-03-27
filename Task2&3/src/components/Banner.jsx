import React, { useState } from "react";
import "./Banner.css";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Banner = () => {
  const [nama, setNama] = useState("Team 2");

  const handleClik = () => {
    setNama("Team 2 JAYA!");
  };

  return (
    <section className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center flex-column order-lg-1 order-2">
            <Slide>
              <h1>
                Tetap Semangat Bersama{" "}
                <strong className="custom-color">{nama}</strong>
              </h1>
              <p>
                Pergi ke pasar membeli pita, Pita dibeli warna berjaya. Team 2
                kuat penuh semangat, Siap bertanding jadi juara!
              </p>
              <div className="mt-4">
                <button onClick={handleClik} className="btn custom-button">
                  Pencet Dong
                </button>
              </div>
            </Slide>
          </div>
          <div className="col-md-6 order-lg-2 order-1">
            <Fade>
              <img
                src="public/images/TEAM_2.webp"
                className="img-fluid animation"
                alt="logo banner"
              />
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
