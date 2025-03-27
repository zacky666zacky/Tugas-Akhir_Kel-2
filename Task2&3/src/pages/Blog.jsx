import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Card } from "react-bootstrap";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // valina js
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setPosts(data);
    //   });

    // axios
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      //   console.log(res.data);
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {posts.map((item) => {
          return (
            <div key={item.id} className="col-md-4 mb-3">
              <Fade delay={item.id * 10}>
                <Card>
                  <Card.Img variant="top" src="https://picsum.photos/100/100" />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.body}</Card.Text>
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

export default Blog;
