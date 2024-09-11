## Description

Scrape any website and turn it into structured data with AI.

## Installation

1. Clone the repository: `git clone https://github.com/sameraw/ai-scraperV1.git`
2. Navigate to the project directory: `cd <project_folder>`
3. Install dependencies: `npm install`

## Documentation

# API Documentation

This document outlines the available endpoints for the web scraping API.

## Base URL

The base URL for all endpoints is: `http://localhost:8070` (or the appropriate host and port where your server is running)

## Endpoints

### 1. Home

- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns a welcome message.
- **Response**: Plain text message "Turn website into structured data."

### 2. Scrape Website

- **URL**: `/scrape`
- **Method**: `POST`
- **Description**: Scrapes a website based on the provided URL and command.
- **Request Body**:
  ```json
  {
  	"url": "string",
  	"command": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**: JSON object containing the scraping results
- **Error Response**:
  - **Code**: 400
  - **Content**: `{ "error": "URL is required" }` or `{ "error": "Command is required" }`
  - **Code**: 500
  - **Content**: `{ "error": "Error message" }`

### 3. Get Scripts

- **URL**: `/scripts`
- **Method**: `GET`
- **Description**: Retrieves all saved scripts.
- **Success Response**:
  - **Code**: 200
  - **Content**: JSON array of saved scripts

### 4. Execute Script

- **URL**: `/execute/:id`
- **Method**: `POST`
- **Description**: Executes a saved script by its ID.
- **URL Parameters**:
  - `id`: The ID of the script to execute
- **Success Response**:
  - **Code**: 200
  - **Content**: JSON object containing the execution results
- **Error Response**:
  - **Code**: 500
  - **Content**: `{ "error": "Error message" }`

## Error Handling

The API uses standard HTTP response codes to indicate the success or failure of requests. Errors are returned in JSON format with an `error` field containing a description of the error.

## Authentication

This API does not implement authentication. However, it uses an API key to communicate with the Capybara API. Ensure that the `CAPYBARA_API` environment variable is set with your Capybara API key.

## Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server will run (default: 8070)
- `CAPYBARA_URL`: The base URL for the Capybara API
- `CAPYBARA_API`: Your Capybara API key

Ensure these are set in your `.env` file or in your deployment environment.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
