import axios from "axios";
import React, { useRef, useState } from "react";
import { Col, Container, Figure } from "react-bootstrap";
import { Api } from "../../config/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateRef = () => {
  const previewRef = useRef(null);
  const previewNameRef = useRef("");
  const imageRef = useRef(null);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const loadImage = (e) => {
    const img = e.target.files[0];
    imageRef.current = img;
    previewRef.current = URL.createObjectURL(img);
    previewNameRef.current = img.name;
  };

  const saveContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageRef.current);
    formData.append("name", nameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    try {
      await axios.post(Api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        position: "center",
        title: "Data berhasil disimpan!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/services");
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <Container className="mt-3">
        <h3>Form Add Contacts Members</h3>
        <hr />
        <div className="mt-3 d-lg-flex flex-lg-row justify-content-center d-sm-flex flex-sm-column">
          <Col className="col-lg-6">
            <form onSubmit={saveContact}>
              <div className="form-group my-3">
                <label>Full Name</label>
                <input className="form-control" type="text" ref={nameRef} />
                <div className="text-danger">
                  {errors.length > 0 &&
                    errors.map((error) => (
                      <small key={error.msg}>
                        {error.path === "name" ? error.msg : ""}
                      </small>
                    ))}
                </div>
              </div>
              <div className="form-group my-3">
                <label>Email</label>
                <input className="form-control" type="email" ref={emailRef} />
                <div className="text-danger">
                  {errors.length > 0 &&
                    errors.map((error) => (
                      <small key={error.msg}>
                        {error.path === "email" ? error.msg : ""}
                      </small>
                    ))}
                </div>
              </div>
              <div className="form-group my-3">
                <label>Phone</label>
                <input className="form-control" type="text" ref={phoneRef} />
                <div className="text-danger">
                  {errors.length > 0 &&
                    errors.map((error) => (
                      <small key={error.msg}>
                        {error.path === "phone" ? error.msg : ""}
                      </small>
                    ))}
                </div>
              </div>
              <div className="form-group my-3">
                <label>Image</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={loadImage}
                />
              </div>
              <button className="btn btn-primary mx-2" type="submit">
                Add Contact
              </button>
            </form>
          </Col>
          {previewRef.current && (
            <Col className="col-lg-5">
              <Figure>
                <Figure.Image
                  width="100%"
                  style={{ height: 300 }}
                  alt={previewNameRef.current}
                  src={previewRef.current}
                  className="img-thumbnail"
                ></Figure.Image>
                <Figure.Caption>{previewNameRef.current}</Figure.Caption>
              </Figure>
            </Col>
          )}
        </div>
      </Container>
    </>
  );
};

export default CreateRef;
