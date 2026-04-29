// This file contains tests for the Card Validation API.
// It uses Jest as the testing framework and Supertest to make HTTP requests to the API endpoints.
// The tests cover various scenarios, including valid card numbers, invalid card numbers, and bad input formats.
// These tests help ensure that the API behaves as expected and can handle different types of input gracefully.
//Simulates real API calls
import request from "supertest";
import app from "../src/app";

//The test suite for the Card Validation API.
//Groups related tests together for better organization and readability.

describe("Card Validation API", () => {
  //Defines a test case for validating a correct card number.
  //Sends a POST request to the /validate endpoint with a known valid card number.
  //Asserts that the response status is 200 (OK), the valid field in the response body is true, and the issuer is correctly identified as "Visa".
  it("should return valid for a correct card number", async () => {
    const response = await request(app)
      .post("/api/v1/cards/validate")
      .send({ cardNumber: "4242424242424242" });

    //Asserts that the response status is 200 (OK), the valid field in the response body is true, and the issuer is correctly identified as "Visa".
    //This test checks that the API correctly identifies a valid Visa card number and returns the expected response structure.
    //The assertions ensure that the API is functioning correctly for valid input and that the issuer detection is working as intended.
    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.issuer).toBe("Visa");
  });

  it("should return invalid for a wrong card number", async () => {
    const response = await request(app)
      .post("/api/v1/cards/validate")
      .send({ cardNumber: "1234567890123456" });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(false);
  });

  it("should return 400 for bad input", async () => {
    const response = await request(app)
      .post("/api/v1/cards/validate")
      .send({ cardNumber: 12345 }); // not a string

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
