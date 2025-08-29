const axios = require("axios");

const BASE_URL = "http://localhost:3000";

// Test cases from the requirements
const testCases = [
  {
    name: "Example A",
    data: ["a", "1", "334", "4", "R", "$"],
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339",
      concat_string: "Ra",
    },
  },
  {
    name: "Example B",
    data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103",
      concat_string: "ByA",
    },
  },
  {
    name: "Example C",
    data: ["A", "ABcD", "DOE"],
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0",
      concat_string: "EoDdCbAa",
    },
  },
];

async function testAPI() {
  console.log("🚀 Starting API tests...\n");

  for (const testCase of testCases) {
    try {
      console.log(`📝 Testing: ${testCase.name}`);
      console.log(`Input: ${JSON.stringify(testCase.data)}`);

      const response = await axios.post(`${BASE_URL}/bfhl`, {
        data: testCase.data,
      });

      const result = response.data;
      console.log(`✅ Response received:`);
      console.log(JSON.stringify(result, null, 2));

      // Validate response structure
      const requiredFields = [
        "is_success",
        "user_id",
        "email",
        "roll_number",
        "odd_numbers",
        "even_numbers",
        "alphabets",
        "special_characters",
        "sum",
        "concat_string",
      ];

      const missingFields = requiredFields.filter(
        (field) => !(field in result)
      );
      if (missingFields.length > 0) {
        console.log(`❌ Missing fields: ${missingFields.join(", ")}`);
        continue;
      }

      // Validate expected values
      let allPassed = true;
      for (const [key, expectedValue] of Object.entries(testCase.expected)) {
        if (JSON.stringify(result[key]) !== JSON.stringify(expectedValue)) {
          console.log(
            `❌ ${key}: Expected ${JSON.stringify(
              expectedValue
            )}, Got ${JSON.stringify(result[key])}`
          );
          allPassed = false;
        }
      }

      if (allPassed) {
        console.log(`✅ ${testCase.name} - All tests passed!\n`);
      } else {
        console.log(`❌ ${testCase.name} - Some tests failed!\n`);
      }
    } catch (error) {
      console.log(`❌ Error testing ${testCase.name}:`, error.message);
      if (error.response) {
        console.log("Response:", error.response.data);
      }
      console.log("");
    }
  }

  // Test error handling
  console.log("🧪 Testing error handling...");

  try {
    const response = await axios.post(`${BASE_URL}/bfhl`, {
      invalid: "data",
    });
    console.log("❌ Should have returned error for invalid input");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log("✅ Error handling works correctly");
    } else {
      console.log("❌ Unexpected error response");
    }
  }

  console.log("\n🏁 Testing completed!");
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI().catch(console.error);
}

module.exports = { testAPI };
