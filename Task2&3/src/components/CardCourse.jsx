import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Images from "../config/Data";
import { Fade } from "react-awesome-reveal";

const CardCourse = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Images);
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {data.map((item, index) => {
          return (
            <div key={index} className="col-md-4 mb-3">
              <Fade delay={index * 100}>
                <Card>
                  <Card.Img variant="top" src={item.url} />
                  <Card.Body>
                    <Card.Title>{item.courseName}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Fade>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCourse;
