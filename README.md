# Blogging Platform - Backend

## About the Project

This is the backend part of a full-stack blogging platform built with Node.js and Express. It provides API endpoints for user authentication, blog post management, and search functionality, with data stored in a MySQL database.

## My Approach

I approached this project by creating a clean, organized API structure with proper separation of concerns. The backend is built with:

- Node.js and Express for the server
- MySQL for database storage
- JWT for secure authentication
- RESTful API design principles

Key features implemented include:

- User authentication (register, login, logout)
- CRUD operations for blog posts
- Search functionality for posts
- Secure password handling with bcrypt
- Token-based authentication

## AI Assistance

During development, I used AI tools like ChatGPT and Cascade to help with:

- Setting up the project structure
- Creating database schemas and models
- Implementing authentication logic
- Debugging API endpoints
- Writing validation middleware
- Creating comprehensive API documentation
- Generating the Postman collection for API testing
- Implementing secure JWT authentication
- Optimizing database queries

Cascade, an advanced AI coding assistant, was particularly helpful with creating the comprehensive Postman collection that covers all API endpoints with various test cases. It also provided guidance on implementing secure authentication practices and structuring the API for optimal performance and maintainability.

AI assistance helped me create a more robust and secure backend while following best practices.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (username: root, password: root)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/if-sourabhsawant/blogging-platform-backend
   cd blogging-platform/backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up the database
   ```
   mysql -u root -p
   ```
   
   In MySQL console:
   ```
   CREATE DATABASE blog_platform;
   USE blog_platform;
   exit;
   ```

4. Start the server
   ```
   npm start
   ```

5. The server will run on `http://localhost:5000`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=blog_platform
JWT_SECRET=your_jwt_secret_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)
- `GET /api/posts/search?q=query` - Search posts by title or content

### User
- `GET /api/users/profile` - Get user profile (requires authentication)
- `GET /api/users/:id/posts` - Get all posts by a specific user

## Postman Collection

For your convenience, we've included a comprehensive Postman collection file (`Blog_Platform_API_Collection.json`) in this repository. This collection contains all API endpoints with various test cases to help you test and validate the functionality of the backend.

### How to Use the Postman Collection

1. Import the `Blog_Platform_API_Collection.json` file into Postman
2. Create an environment in Postman with variables:
   - `authToken` (will be auto-populated after login)
   - `otherUserToken` (for testing unauthorized access)
3. Run the "Login - Success" request first to get your authentication token
4. Then you can test all other endpoints with proper authentication

The collection includes test scripts that automatically capture and store authentication tokens when you log in, making it easy to test protected endpoints without manually copying tokens.

## Database Structure

The database consists of two main tables:

1. **Users**
   - id (Primary Key)
   - username
   - email
   - password (hashed)
   - created_at

2. **Posts**
   - id (Primary Key)
   - title
   - content
   - author_id (Foreign Key to Users)
   - created_at
   - updated_at
