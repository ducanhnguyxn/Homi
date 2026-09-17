# Explorage Test Suite

This directory contains automated tests for the Explorage application.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Files

### `schema.test.js`
Tests Joi validation schemas for listings and reviews:
- Validates correct listing data
- Rejects invalid data (missing fields, negative prices, etc.)
- Tests review rating constraints (1-5 stars)

### `basic.test.js`
Tests core application components without requiring database:
- Utility functions (ExpressError, wrapAsync)
- Model schemas (Listing, User, Review)
- Configuration modules (cloudConfig)

## CI/CD Integration

These tests run automatically in the GitHub Actions pipeline on every push and pull request.

The tests are designed to:
- Run fast (< 1 second)
- Not require external services (no database, no API calls)
- Validate core business logic
- Ensure code quality before deployment

## Adding New Tests

When adding features, add corresponding tests:
1. Create a new test file in this directory
2. Follow the existing pattern
3. Ensure tests don't require external dependencies
4. Run `npm test` to verify they pass

