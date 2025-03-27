import React, { useEffect, useState } from "react";
import { Api, Url } from "../../config/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import "./ContactList.css"; // Import file CSS tambahan

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch contacts based on the current page
  const getContacts = async (page = 1) => {
    try {
      const res = await axios.get(`${Api}?page=${page}`);
      setContacts(res.data.data);
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getContacts(currentPage);
  }, [currentPage]);

  // Delete Contact
  const deleteContact = async (contactId) => {
    try {
      await Swal.fire({
        title: "Serius jon?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${Api}/${contactId}`);
          getContacts(currentPage);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center">Product List</h1>
        <Link to={"/create"} className="btn custom-button">
          Add Product
        </Link>
      </div>
      <hr />
      <div className="container mt-5 mb-5">
        <div className="row">
          {contacts.map((contact) => {
            return (
              <div key={contact.id} className="col-md-4 mb-3">
                <Card>
                  <Card.Img
                    className="img-thumbnail"
                    variant="top"
                    width="100%"
                    style={{ height: "300px" }}
                    src={`${Url}/${contact.image}`}
                  />
                  <Card.Body>
                    <Card.Title>{contact.name}</Card.Title>
                    <Card.Text>{contact.description}</Card.Text>
                    <Card.Text>{contact.price}</Card.Text>
                  </Card.Body>
                  <div className="btn-group">
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn custom-button btn-sm"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => deleteContact(contact.id)}
                      className="btn custom-button btn-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </Button>
      </div>
    </div>
  );
};

export default ContactList;
