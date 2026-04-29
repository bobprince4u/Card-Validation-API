# Card Validation API

## Overview

This project implements a simple API endpoint that validates whether a given card number is structurally valid.

The validation focuses on format and checksum correctness, not whether the card actually exists or is active.

---

## Tech Stack

- Node.js
- TypeScript (strict mode enabled)
- Express.js
- Jest + Supertest (for testing)

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm run dev
```

### 3. Build the project

```bash
npm run build
```

### 4. Run production build

```bash
npm start
```

### 5. Run tests

```bash
npm test
```

---

## API Endpoint

### POST `/api/v1/cards/validate`

#### Request

```json
{
  "cardNumber": "4242424242424242"
}
```

#### Response (Valid)

```json
{
  "valid": true,
  "issuer": "Visa"
}
```

#### Response (Invalid)

```json
{
  "valid": false,
  "issuer": "Unknown",
  "reason": "Failed Luhn check"
}
```

#### Bad Request

```json
{
  "error": "Invalid input",
  "details": "cardNumber is required and must be a string"
}
```

## Live Demo

Base URL:
https://your-app-name.onrender.com

Example request:

curl -X POST https://your-app-name.onrender.com/api/v1/cards/validate \
-H "Content-Type: application/json" \
-d '{"cardNumber":"4242424242424242"}'

---

## Validation Approach

The validation is implemented using a layered approach:

### 1. Input Validation

- Ensures the card number is provided
- Must be a string
- Must contain only digits
- Length must be between 12 and 19 digits

### 2. Issuer Detection

- Uses known prefix patterns (BIN ranges)
- Supports common issuers such as Visa, MasterCard, and American Express
- Returns "Unknown" if no match is found

### 3. Luhn Algorithm

- Used to validate the structural integrity of the card number
- Detects common input errors such as mistyped digits

---

## Design Decisions

### Why Express?

Express was chosen for its simplicity and minimal setup, allowing focus on the core validation logic. For larger systems, a more structured framework like NestJS could be considered.

### Why Luhn Algorithm?

The Luhn algorithm is an industry-standard checksum used by major card networks. It efficiently validates card number structure but does not confirm card existence.

### Why return 200 for invalid cards?

An invalid card number is still a valid request. The API successfully processes the input and returns a result, so a `200 OK` response is appropriate. Validation failure is part of business logic, not an HTTP error.

### Why separate layers (controller, service, utils)?

This separation improves readability, maintainability, and testability by isolating concerns:

- Controllers handle HTTP logic
- Services handle business logic
- Utilities handle reusable functions

---

## Testing Strategy

An integration test was implemented using Supertest to verify the full request-response cycle, including routing, middleware, and validation logic.

This approach ensures the endpoint behaves correctly for:

- Valid inputs
- Invalid inputs
- Bad requests

---

## Limitations

- Does not verify if a card is real or active
- Issuer detection is based on limited known patterns
- No external validation or BIN database integration

---

## Possible Improvements

- Support additional card issuers
- Extend input normalization (e.g., handle dashes)
- Add more comprehensive test coverage
- Integrate external validation services for real-world use cases

---

## Commit Strategy

The project was developed incrementally with meaningful commits to reflect the development process, rather than a single bulk commit.

---

## Conclusion

This project demonstrates a clean, layered approach to API design, with a focus on correctness, input validation, and maintainable structure.
