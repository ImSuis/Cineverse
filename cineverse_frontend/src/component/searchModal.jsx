import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../style/searchModal.css';

const SearchModal = ({ show, onHide, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSubmit(searchQuery);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="custom-search-modal">
      <div className="custom-search-modal-body">
        <Form onSubmit={handleSearch} className="custom-search-form">
          <Form.Group controlId="customFormSearch" className="custom-search-input-group">
            <Form.Control
              type="text"
              placeholder="Search..."
              autoFocus
              className="custom-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="custom-search-icon-button">
              <FaSearch />
            </button>
          </Form.Group>
        </Form>
      </div>
    </Modal>
  );
};

export default SearchModal;
