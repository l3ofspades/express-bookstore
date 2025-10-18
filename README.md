# Express Bookstore API

This is a simple RESTful API built with Express.js for managing a collection of books. It supports full CRUD operations, uses JSON Schema for request validation, and includes integration tests with Jest and Supertest. Data is stored in a PostgreSQL database.

---

## Features

- Full CRUD functionality for books
- Input validation using JSON Schema
- PostgreSQL database integration
- Integration tests using Jest and Supertest
- Environment variable configuration for database connections

---

## Example Book Object

```json
{
  "isbn": "0691161518",
  "amazon_url": "http://a.co/eobPtX2",
  "author": "Matthew Lane",
  "language": "english",
  "pages": 264,
  "publisher": "Princeton University Press",
  "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  "year": 2017
}
