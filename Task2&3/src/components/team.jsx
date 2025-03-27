import React from "react";
import { Fade } from "react-awesome-reveal";
import { Card } from "react-bootstrap";
import "./team.css"; // Import the CSS file

const Teams = () => {
  // Data tim diatur secara manual
  const teams = [
    {
      id: 1,
      name: "Zacky",
      title: "Leader",
      avatar: "public/images/23=6 46=6.psd bg putih.jpg",
    },
    {
      id: 2,
      name: "Mozart",
      title: "Anggota 1",
      avatar: "public/images/Mozart.jpeg",
    },
    {
      id: 3,
      name: "Adi",
      title: "Anggota 2",
      avatar: "public/images/adrian_adi.jpg",
    },
    {
      id: 4,
      name: "Freskha",
      title: "Anggota 3",
      avatar: "public/images/Fres_bg_white.jpeg",
    },
  ];

  return (
    <div className="background-orange">
      <div className="container mt-5 mb-5">
        <div className="row">
          <h1>PARA PRIA</h1>
          {teams.map((item) => (
            <div key={item.id} className="col-md-3 mb-3">
              <Fade delay={item.id * 10}>
                <Card className="team-card">
                  <Card.Img
                    variant="top"
                    src={item.avatar}
                    className="team-avatar"
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.title}</Card.Text>
                  </Card.Body>
                </Card>
              </Fade>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
