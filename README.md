# Library Management System API
 
## About
 
Managing a library's daily operations — tracking books, authors, members, and borrowing activity — is a surprisingly complex task when done manually. Librarians often struggle with knowing which books are currently available, which members have outstanding borrows, and maintaining accurate records of borrowing history. Errors in manual record-keeping can lead to lost books, overdue returns going unnoticed, and a frustrating experience for both staff and library members.
 
This project is a RESTful API built to solve exactly that problem. The Library Management System API provides a robust backend solution for managing a library's core operations programmatically. It allows library staff to maintain a complete catalog of books and their authors, register and manage library members, and track the full lifecycle of a book loan — from the moment a member borrows a book to when it is returned.
 
The API is designed with simplicity and clarity in mind. Every book in the system is linked to its author, and every borrow record is linked to both the book being borrowed and the member borrowing it. When a book is borrowed, its availability status is automatically updated so that no two members can borrow the same copy simultaneously. When the book is returned, the system updates the record with the return date and marks the book as available again. The member's total borrowed book count is also tracked and updated automatically on both borrow and return operations.
 
The system exposes a clean set of HTTP endpoints organized around four core resources: Authors, Books, Members, and Borrow Records. Each resource supports standard CRUD operations where applicable, and the Borrow Records resource includes specialized endpoints for filtering active borrows, borrows by member, and borrows by book. This makes it easy to query the current state of the library at any point in time.
 
Error handling is built into every endpoint. All errors return structured JSON responses with appropriate HTTP status codes, making it straightforward for any frontend or client application to handle failures gracefully. A global error handler and a 404 not-found middleware ensure that unexpected errors and unknown routes are always handled consistently.
 
This API was built as a final project for CPE-114, demonstrating the practical application of Node.js, Express.js, Sequelize ORM, and MySQL in building a functional, well-structured backend system. It is intended as a foundation that can be extended with features such as authentication, pagination, and fine/due-date tracking in future iterations.

---

## Tech Stack
 
| Technology | Version |
|------------|---------|
| Node.js | >= 18.x |
| Express.js | ^5.2.1 |
| Sequelize | ^6.37.8 |
| MySQL2 | ^3.22.3 |
| MariaDB | ^3.5.2 |
| dotenv | ^17.4.2 |
 
---
 
## Setup Instructions
 
### 1. Clone the repository
```bash
git clone <your-repository-url>
cd cpe-114-final-project
```
 
### 2. Install dependencies
```bash
npm install
```
 
### 3. Configure environment variables
Copy the example env file and fill in your own values:
```bash
cp .env.example .env
```
 
Then open `.env` and update the values:
```
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
```
 
### 4. Create the database
Make sure your MySQL server is running, then create the database:
```sql
CREATE DATABASE your_database_name;
```
 
### 5. Start the server
```bash
node index.js
```
 
You should see:
```
Database connected
Server running on http://localhost:3000
```
 
> Sequelize will automatically create the tables on first run via `sequelize.sync()`.
 
---
 
## Database Schema
 
### Authors
Table name: `Authors`
 
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| name | STRING | Not Null |
| nationality | STRING | Not Null |
| createdAt | DATE | Auto-managed by Sequelize |
| updatedAt | DATE | Auto-managed by Sequelize |
 
### Books
Table name: `Books`
 
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| title | STRING | Not Null |
| genre | STRING | Not Null |
| publicationYear | INTEGER | Not Null |
| availabilityStatus | BOOLEAN | Default: true |
| authorId | INTEGER | Foreign Key → Authors.id, Not Null |
| createdAt | DATE | Auto-managed by Sequelize |
| updatedAt | DATE | Auto-managed by Sequelize |
 
### Members
Table name: `Members`
 
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| firstName | STRING | Not Null |
| lastName | STRING | Not Null |
| email | STRING | Not Null, Unique, Must be valid email |
| membershipDate | DATE | Default: current date/time |
| booksBorrowed | INTEGER | Default: 0 |
| createdAt | DATE | Auto-managed by Sequelize |
| updatedAt | DATE | Auto-managed by Sequelize |
 
### BorrowRecords
Table name: `BorrowRecords`
 
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| bookId | INTEGER | Foreign Key → Books.id, Not Null |
| memberId | INTEGER | Foreign Key → Members.id, Not Null |
| borrowDate | DATE | Set on borrow |
| returnDate | DATE | Null until returned |
| createdAt | DATE | Auto-managed by Sequelize |
| updatedAt | DATE | Auto-managed by Sequelize |
 
---
 
## Relationship Diagram (ER Diagram)

![alt text](./image/Screenshot_11-5-2026_202551_dbdiagram.io.jpeg)

**Relationships:**
- An **Author** has many **Books** (one-to-many)
- A **Book** belongs to one **Author**
- A **Book** has many **BorrowRecords** (one-to-many)
- A **Member** has many **BorrowRecords** (one-to-many)
- A **BorrowRecord** belongs to one **Book** and one **Member**
---

## API Reference
 
### Authors
 
| Method | Path | Request Body | Description |
|--------|------|-------------|-------------|
| GET | /authors | — | Get all authors |
| GET | /authors/:id | — | Get a single author by ID |
| POST | /authors | `{ name, nationality }` | Create a new author |
| PUT | /authors/:id | `{ name, nationality }` | Update an author |
| DELETE | /authors/:id | — | Delete an author |
 
**POST /authors — Example Request Body:**
```json
{
  "name": "John Doe",
  "nationality": "American"
}
```
 
**Example Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "nationality": "American",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```
 
---
 
### Books
 
| Method | Path | Request Body | Description |
|--------|------|-------------|-------------|
| GET | /books | — | Get all books |
| GET | /books/:id | — | Get a single book by ID |
| POST | /books | `{ title, genre, publicationYear, authorId }` | Create a new book |
| PUT | /books/:id | `{ title, genre, publicationYear, authorId }` | Update a book |
| DELETE | /books/:id | — | Delete a book |
 
**POST /books — Example Request Body:**
```json
{
  "title": "Some Book",
  "genre": "Fiction",
  "publicationYear": 2021,
  "authorId": 1
}
```
 
**Example Response:**
```json
{
  "id": 1,
  "title": "Some Book",
  "genre": "Fiction",
  "publicationYear": 2021,
  "availabilityStatus": true,
  "authorId": 1,
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```
 
---
 
### Members
 
| Method | Path | Request Body | Description |
|--------|------|-------------|-------------|
| GET | /members | — | Get all members |
| GET | /members/:id | — | Get a single member by ID |
| POST | /members | `{ firstName, lastName, email }` | Create a new member |
| PUT | /members/:id | `{ firstName, lastName, email }` | Update a member |
| DELETE | /members/:id | — | Delete a member |
 
**POST /members — Example Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@email.com"
}
```
 
**Example Response:**
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@email.com",
  "membershipDate": "2024-01-01T00:00:00.000Z",
  "booksBorrowed": 0,
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```
 
---
 
### Borrow Records
 
| Method | Path | Request Body | Description |
|--------|------|-------------|-------------|
| POST | /borrow-records/borrow | `{ bookId, memberId }` | Borrow a book |
| POST | /borrow-records/return | `{ bookId, memberId }` | Return a book |
| GET | /borrow-records | — | Get all borrow records |
| GET | /borrow-records/active | — | Get all active (unreturned) borrows |
| GET | /borrow-records/member/:memberId | — | Get all borrows by a member |
| GET | /borrow-records/book/:bookId | — | Get all borrows for a book |
 
**POST /borrow-records/borrow — Example Request Body:**
```json
{
  "bookId": 1,
  "memberId": 1
}
```
 
**Example Response:**
```json
{
  "message": "Borrowed a book successfully"
}
```
 
**POST /borrow-records/return — Example Request Body:**
```json
{
  "bookId": 1,
  "memberId": 1
}
```
 
**Example Response:**
```json
{
  "message": "Returned a book successfully"
}
```
 
---
 
## Error Responses
 
All errors return a JSON object with a `message` or `error` field and an appropriate HTTP status code.
 
| Status Code | Meaning | Example Response |
|-------------|---------|-----------------|
| 400 | Bad Request | `{ "message": "Book already borrowed" }` |
| 400 | Bad Request | `{ "message": "Book already returned" }` |
| 404 | Not Found | `{ "message": "Author not found." }` |
| 404 | Not Found | `{ "message": "Book not found." }` |
| 404 | Not Found | `{ "message": "Member not found." }` |
| 404 | Not Found | `{ "message": "Member or Book not found" }` |
| 404 | Not Found | `{ "message": "Book record not found" }` |
| 404 | Not Found | `{ "message": "Route not found" }` |
| 500 | Internal Server Error | `{ "error": "error message here" }` |
| 500 | Internal Server Error | `{ "message": "Internal Server Error" }` |
 
### Error Response Examples
 
**404 — Resource Not Found:**
```json
{
  "message": "Author not found."
}
```
 
**400 — Book Unavailable:**
```json
{
  "message": "Book already borrowed"
}
```
 
**404 — Unknown Route:**
```json
{
  "message": "Route not found"
}
```
 
**500 — Internal Server Error:**
```json
{
  "error": "detailed error message"
}
```