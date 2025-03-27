import React from "react";
import { Fade } from "react-awesome-reveal";
import { Card } from "react-bootstrap";

const Teams = () => {
  // Data tim diatur secara manual
  const teams = [
    {
      id: 1,
      name: "Zacky",
      email: "zacky@example.com",
      avatar: "public/images/23=6 46=6.psd bg putih.jpg",
    },
    {
      id: 2,
      name: "Mozart",
      email: "Mozart@example.com",
      avatar: "/images/aulia.jpg",
    },
    {
      id: 3,
      name: "Adi",
      email: "Adi@example.com",
      avatar: "/images/rizky.jpg",
    },
    {
      id: 4,
      name: "Freskha",
      email: "Freskha@example.com",
      avatar: "/images/siti.jpg",
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {teams.map((item) => (
          <div key={item.id} className="col-md-3 mb-3">
            <Fade delay={item.id * 10}>
              <Card>
                <Card.Img variant="top" src={item.avatar} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.email}</Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
