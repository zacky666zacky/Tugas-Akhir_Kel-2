import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Figure } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Api, Url } from "../../config/Api";
import Swal from "sweetalert2";

const Edit = () => {
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [existingImage, setExistingImage] = useState(""); // To hold the existing image URL

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the product details to edit
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${Api}/${id}`);
      setName(res.data.data.name);
      setDescription(res.data.data.description);
      setPrice(res.data.data.price);
      setExistingImage(res.data.data.image); // Store the existing image URL
      setPreview(`${Url}/${res.data.data.image}`);
      setPreviewName(res.data.data.image);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  // Handle image upload and preview
  const loadImage = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      setPreview(URL.createObjectURL(img));
      setPreviewName(img.name);
    }
  };

  // Handle form submission to update product
  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Only append price if it is not empty
    if (price !== "") {
      formData.append("price", Number(price));
    }

    // Append image only if a new image is selected
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${Api}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        position: "center",
        title: "Data successfully updated!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/services"); // Redirect to /services after success
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Set validation errors from the backend
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container className="mt-3">
      <h3>Form Edit Product</h3>
      <hr />
      <div className="mt-3 d-lg-flex flex-lg-row justify-content-center d-sm-flex flex-sm-column">
        <Col className="col-lg-6">
          <form onSubmit={updateProduct}>
            <div className="form-group my-3">
              <label>Product Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <small className="text-danger d-block">
                  {errors.name.join(", ")}
                </small>
              )}
            </div>
            <div className="form-group my-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <small className="text-danger d-block">
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
                <small className="text-danger d-block">
                  {errors.price.join(", ")}
                </small>
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
            <button className="btn btn-primary mx-2" type="submit">
              Update Product
            </button>
          </form>
        </Col>

        {/* Show image preview */}
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

export default Edit;
