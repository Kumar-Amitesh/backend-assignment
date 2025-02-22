# Resume Processing API

## Overview
This project provides an API to process and search resumes. It extracts structured information from PDF resumes using `pdf-parse` and Gemini AI model, encrypts sensitive data, and stores it in MongoDB.

## Features
- Upload resume via URL
- Extract structured data (name, email, education, experience, skills)
- Encrypt sensitive data before saving
- Search resumes with token-agnostic and case-insensitive matching
- Deployable on Render with MongoDB Atlas
- User authentication with login functionality

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI Model:** Gemini API
- **Deployment:** Render (free tier)

## Setup Instructions
### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Kumar-Amitesh/backend-assignment
   cd backend_assignment
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   PORT=3000
   MONGO_URI=<your_mongodb_connection_string>
   GEMINI_API_KEY=<your_gemini_api_key>
   JWT_SECRET=<your_JWT_SECRET>
   ENCRYPTION_KEY=<your_ENCRYPTION_key>
   ```
4. Start the server:
   ```sh
   node index.js
   ```

## API Endpoints
### 1. User Login
**POST** `/login`
- **Body:** `{ "username":"naval.ravikant", "password":"05111974" }`
- **Response:** `{ token: "<jwt_token>" }`

### 2. Process Resume (Requires Authentication)
**POST** `/resumes/process`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:** `{ "url": "<pdf-url>" }`
- **Response:** `{ message: "Resume processed successfully", data: {...} }`

### 3. Search Resume (Requires Authentication)
**GET** `/resumes/search`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:** `{ "name": "John" }`
- **Response:** `[ { name: "John Doe", email: "john@example.com", ... }, ... ]`

## Deployment on Render
- The API is deployed on Render at: **[Deployed URL](https://backend-assignment-nfg5.onrender.com)**
- GitHub Repository: **[Repo](https://github.com/Kumar-Amitesh/backend-assignment)**

## License
This project is licensed under the MIT License.

---
