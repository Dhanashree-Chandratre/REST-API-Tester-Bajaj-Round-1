const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Helper function to check if a string is a number
function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a string is an alphabet
function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

// Helper function to check if a string is a special character
function isSpecialChar(str) {
  return /^[^a-zA-Z0-9\s]+$/.test(str);
}

// Helper function to create alternating caps string in reverse order
function createAlternatingCaps(str) {
  const reversed = str.split("").reverse().join("");
  let result = "";
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toUpperCase();
    } else {
      result += reversed[i].toLowerCase();
    }
  }
  return result;
}

// POST endpoint /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array.",
      });
    }

    // Initialize arrays and variables
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let allAlphabets = "";

    // Process each element in the data array
    data.forEach((item) => {
      const str = String(item);

      if (isNumber(str)) {
        const num = parseInt(str);
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
        sum += num;
      } else if (isAlphabet(str)) {
        alphabets.push(str.toUpperCase());
        allAlphabets += str;
      } else if (isSpecialChar(str)) {
        specialCharacters.push(str);
      }
    });

    // Create response object
    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sum),
      concat_string: createAlternatingCaps(allAlphabets),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
    });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Bajaj API is running",
    endpoint: "/bfhl",
    method: "POST",
    test_interface: "/index.html",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});
