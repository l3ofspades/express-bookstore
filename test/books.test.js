process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testBook;

beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO books
        (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES (
          '1234567890',
          'http://a.co/eobPtX2',    
            'Test Author',
            'English',
            100,
            'Test Publisher',
            'Test Book',
            2020
        )
        RETURNING isbn, amazon_url, author, language, pages, publisher, title, year`
  );
  testBook = result.rows[0];
});

afterEach(async () => {
  await db.query("DELETE FROM books");
});

afterAll(async () => {
  await db.end();
});

test("GET /books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.books).toHaveLength(1);
});

test("POST /books", async () => {
    const res = await request(app).post("/books").send({
        isbn: '5432109876',
        amazon_url: 'http://a.co/test',
        author: 'New Author',
        language: 'English',
        pages: 250,
        publisher: 'New Publisher',
        title: 'New Book',
        year: 2021
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.book).toHaveProperty("isbn", "5432109876");
});

test("PUT /books/:isbn", async () => {
    const res = await request(app).put(`/books/${testBook.isbn}`).send({
        amazon_url: 'http://a.co/updated',
        author: 'Updated Author',
        language: 'English',
        pages: 150,
        publisher: 'Updated Publisher',
        title: 'Updated Book',
        year: 2022
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.book).toHaveProperty("author", "Updated Author");
});

test("DELETE /books/:isbn", async () => {
    const res = await request(app).delete(`/books/${testBook.isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
}); 