# Bajaj API Tester - Round 1

A REST API built with Node.js that processes arrays and returns categorized data including numbers, alphabets, and special characters.

## Features

- POST endpoint `/bfhl` that processes arrays
- Categorizes input data into even numbers, odd numbers, alphabets, and special characters
- Returns sum of all numbers
- Creates alternating caps string from alphabets in reverse order
- Handles exceptions gracefully
- Follows REST API best practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS for cross-origin requests

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd bajaj-round-1
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Documentation

### Endpoint: POST /bfhl

Processes an array and returns categorized data.

**URL**: `http://localhost:3000/bfhl`

**Method**: POST

**Headers**:

```
Content-Type: application/json
```

**Request Body**:

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response**:

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Response Fields

- `is_success`: Boolean indicating if the operation was successful
- `user_id`: User identifier in format `{full_name_ddmmyyyy}`
- `email`: User email address
- `roll_number`: College roll number
- `odd_numbers`: Array of odd numbers (as strings)
- `even_numbers`: Array of even numbers (as strings)
- `alphabets`: Array of alphabets converted to uppercase
- `special_characters`: Array of special characters
- `sum`: Sum of all numbers (as string)
- `concat_string`: Concatenation of all alphabets in reverse order with alternating caps

## Examples

### Example 1

**Request**:

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response**:

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example 2

**Request**:

```json
{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}
```

**Response**:

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### Example 3

**Request**:

```json
{
  "data": ["A", "ABcD", "DOE"]
}
```

**Response**:

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A", "ABCD", "DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input format
- **500 Internal Server Error**: Server-side errors

Error responses include:

```json
{
  "is_success": false,
  "error": "Error message"
}
```

## Testing

You can test the API using curl, Postman, or any HTTP client:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

## Deployment

This API can be deployed to various platforms:

### Railway (Recommended)
1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "Deploy from GitHub repo"**
4. **Select this repository**
5. **Click "Deploy Now"**
6. **Get your live URL** from the Settings tab

### Other Platforms
- **Vercel**: Supports Node.js APIs
- **Render**: Free tier available
- **Heroku**: Traditional Node.js hosting

### Environment Variables

- `PORT`: Server port (default: 3000)

## License

This project is created for Bajaj Round 1 assessment.
