# School Management API

This API allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

- Add new schools with name, address, latitude, and longitude
- List schools sorted by proximity to a given location
- Seed database with sample data for testing

## Prerequisites

- Node.js (v14 or later)
- MySQL database

## Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Set up your environment variables by modifying the `.env` file:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
PORT=3000
```
4. Make sure your MySQL server is running and create the database:
```sql
CREATE DATABASE school_management;
```

## Running the Application

### Development mode
```
npm run dev
```

### Production mode
```
npm start
```

## API Endpoints

### Seed Database with Sample Data

- **URL:** `/api/seed-database`
- **Method:** `POST`
- **Description:** Populates the database with sample school data for testing
- **Success Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully with sample data"
}
```

### Add a School

- **URL:** `/api/addSchool`
- **Method:** `POST`
- **Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Example Street, City, Country",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Example School",
    "address": "123 Example Street, City, Country",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### List Schools by Proximity

- **URL:** `/api/listSchools?latitude=37.7749&longitude=-122.4194`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Success Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Nearby School",
      "address": "456 Close Street",
      "latitude": 37.7750,
      "longitude": -122.4192,
      "distance": 0.15
    },
    {
      "id": 2,
      "name": "Far School",
      "address": "789 Far Avenue",
      "latitude": 37.8000,
      "longitude": -122.5000,
      "distance": 7.24
    }
  ]
}
```

## Testing with Postman

1. Import the provided Postman collection file (`school-management-api-postman-collection.json`) into your Postman application:
   - Open Postman
   - Click on "Import" button
   - Select the collection file
   - Click "Import" to complete

2. Set up your environment:
   - Create a new environment in Postman
   - Add a variable `baseUrl` with value `http://localhost:3000` (or your deployment URL)
   - Select this environment when testing the API

3. Test the API flow:
   - First, use the "Seed Database" request to populate the database with sample data
   - Use "Add School" to add a custom school
   - Use "List Schools" to retrieve schools sorted by proximity to a location

## Deployment

### Local Deployment
Follow the installation and running instructions above.

### Hosting on a Server
1. Clone the repository on your server
2. Install dependencies: `npm install`
3. Configure environment variables for production
4. Start the server: `npm start`

### Docker Deployment
A Dockerfile is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t school-management-api .

# Run the container
docker run -p 3000:3000 -e DB_HOST=your_db_host -e DB_USER=your_db_user -e DB_PASSWORD=your_db_password -e DB_NAME=school_management school-management-api
```

## Error Handling

The API includes comprehensive error handling:
- Validates all input data before processing
- Returns appropriate HTTP status codes
- Provides descriptive error messages

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request