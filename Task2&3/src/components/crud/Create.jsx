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
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // Menampilkan preview gambar sebelum upload
  const loadImage = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      setPreview(URL.createObjectURL(img));
      setPreviewName(img.name);
    }
  };

  // Fungsi untuk menyimpan produk
  const saveProduct = async (e) => {
    e.preventDefault();

    // ✅ Validasi sebelum submit
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
    if (!image) {
      Swal.fire("Error", "Please upload an image!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", Number(price)); // Pastikan dikirim sebagai angka

    try {
      const response = await axios.post(Api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle success response
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          title: "Data berhasil disimpan!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/services");
      } else {
        // Handle unexpected responses
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        Swal.fire({
          title: "Validation Error!",
          text: JSON.stringify(error.response.data.errors, null, 2),
          icon: "error",
        });
      } else {
        // Catch other errors that could be unrelated to validation
        Swal.fire("Error", "An unexpected error occurred.", "error");
      }
    }
  };

  return (
    <>
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
              </div>
              <div className="form-group my-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group my-3">
                <label>Price</label>
                <input
                  className="form-control"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
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
              <button
                className="btn"
                type="submit"
                style={{
                  backgroundColor: "#ffb200",
                  color: "white",
                  border: "2px solid #ffb200",
                }}
              >
                Add Product
              </button>
            </form>
          </Col>

          {/* Menampilkan preview gambar */}
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
    </>
  );
};

export default Create;
