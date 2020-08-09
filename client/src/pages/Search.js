import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { BookList, BookListItem } from "../components/List";
import { Input, SearchButton } from "../components/Input";

class Search extends Component {
    state = {
        books: [],
        bookSearch: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.searchBooks(this.state.bookSearch)
            .then(res => {
                this.setState({ books: res.data.items }, function () {
                    console.log(this.state.books);
                })
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <Container>
                                    <Row>
                                    <Col size="xs-2 sm-2">
                                            <SearchButton
                                                onClick={this.handleFormSubmit}
                                                type="success"
                                                className="input-lg"
                                            >
                                                Search
                                            </SearchButton>
                                        </Col>
                                        <Col size="xs-10 sm-10">
                                            <Input
                                                name="bookSearch"
                                                value={this.state.bookSearch}
                                                onChange={this.handleInputChange}
                                                placeholder="Search for a Book"
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="xs-12">
                            <BookList>
                                {this.state.books.map(book => {
                                    return (
                                        <BookListItem
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            authors={book.volumeInfo.authors}
                                            link={book.volumeInfo.infoLink}
                                            description={book.volumeInfo.description}
                                            image={book.volumeInfo.imageLinks === undefined ? "http://siddallheatingandcooling.net/_imgstore/5/1360415/thumbnail/FSeY96wEdX_eY4XkBN2jfYnuY9A.png" : `${book.volumeInfo.imageLinks.thumbnail}`}
                                        />);
                                })}
                            </BookList>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };

};

export default Search;