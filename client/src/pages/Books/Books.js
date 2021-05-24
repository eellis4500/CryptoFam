import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Card } from "../../components/Card";
import { Input, TextArea, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});
  const formEl = useRef(null);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => {
        // console.log(res.data.books);
        setBooks(res.data.books);
      })
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {

    event.preventDefault();
    if (formObject.title && formObject.symbol) {
      API.saveBook({
        title: formObject.title,
        symbol: formObject.symbol,
        synopsis: formObject.synopsis

      })
        .then(res => {
          formEl.current.reset();
          loadBooks();
        })
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Card title="What Crypto would you like to track?">
              <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="title"
                  placeholder="Crypto Name (Full Name Required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="symbol"
                  placeholder="Symbol(required)"
                />
                <TextArea
                  onChange={handleInputChange}
                  name="synopsis"
                  placeholder="Reason for tracking (Optional)"
                />
                <FormBtn
                  disabled={!(formObject.symbol && formObject.title)}
                  onClick={handleFormSubmit}
                >
                  Submit Crypto Currency
                </FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-6 sm-12">
            <Card title="Crypto Currencies On My List">
              {books.length ? (
                <List>
                  {books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={`/crypto/${book.title}`}>
                        <strong>
                          {book.title} ({book.symbol})
                        </strong>
                        <h3>Reason for tracking?</h3>
                        <p>{book.synopsis}</p>
                      </Link> 
                      <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
