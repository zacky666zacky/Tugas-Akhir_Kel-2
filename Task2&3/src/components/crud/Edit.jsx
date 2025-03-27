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
  const [errors, setErrors] = useState([]);
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

    // Form validation before submitting
    if (!name.trim()) {
      Swal.fire("Error", "Product Name is required!", "error");
      return;
    }
    if (!description.trim()) {
      Swal.fire("Error", "Description is required!", "error");
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      Swal.fire("Error", "Price must be a valid number!", "error");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price));

    // Append image only if a new image is selected
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${Api}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: "center",
          title: "Data successfully updated!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/services"); // Redirect to /services after success
      } else {
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        Swal.fire({
          title: "Validation Error!",
          text: JSON.stringify(error.response.data.errors, null, 2),
          icon: "error",
        });
      } else {
        Swal.fire("Error", "An unexpected error occurred.", "error");
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
              <div className="text-danger">
                {errors.name && <small>{errors.name[0]}</small>}
              </div>
            </div>
            <div className="form-group my-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="text-danger">
                {errors.description && <small>{errors.description[0]}</small>}
              </div>
            </div>
            <div className="form-group my-3">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="text-danger">
                {errors.price && <small>{errors.price[0]}</small>}
              </div>
            </div>
            <div className="form-group my-3">
              <label>Image</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={loadImage}
              />
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
