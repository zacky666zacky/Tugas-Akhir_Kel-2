import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Figure } from "react-bootstrap";
import { Api } from "../../config/Api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Create = () => {
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const loadImage = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      setPreview(URL.createObjectURL(img));
      setPreviewName(img.name);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (price !== "") {
      formData.append("price", Number(price));
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${Api}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container className="mt-3">
      <h3 className="text-center">Form Add Product</h3>
      <hr />
      <div className="mt-3 d-lg-flex flex-lg-row justify-content-center d-sm-flex flex-sm-column">
        <Col className="col-lg-6">
          <form onSubmit={saveProduct}>
            <div className="form-group my-3">
              <label>Product Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.join(", ")}</small>
              )}
            </div>
            <div className="form-group my-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <small className="text-danger">
                  {errors.description.join(", ")}
                </small>
              )}
            </div>
            <div className="form-group my-3">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <small className="text-danger">{errors.price.join(", ")}</small>
              )}
            </div>
            <div className="form-group my-3">
              <label>Image</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={loadImage}
              />
              {errors.image &&
                errors.image.map((error, index) => (
                  <small key={index} className="text-danger d-block">
                    {error}
                  </small>
                ))}
            </div>
            <button className="btn btn-warning text-white" type="submit">
              Add Product
            </button>
          </form>
        </Col>
        {preview && (
          <Col className="col-lg-5">
            <Figure>
              <Figure.Image
                width="100%"
                style={{ height: 300 }}
                alt={previewName}
                src={preview}
                className="img-thumbnail"
              />
              <Figure.Caption>{previewName}</Figure.Caption>
            </Figure>
          </Col>
        )}
      </div>
    </Container>
  );
};

export default Create;
