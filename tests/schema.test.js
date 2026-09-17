const { listingSchema, reviewSchema } = require('../schema');

describe('Schema Validation Tests', () => {
  
  describe('Listing Schema', () => {
    test('should validate a correct listing', () => {
      const validListing = {
        listing: {
          title: 'Beautiful Apartment',
          description: 'A lovely place to stay',
          location: 'London',
          country: 'UK',
          price: 100,
          image: 'https://example.com/image.jpg'
        }
      };

      const { error } = listingSchema.validate(validListing);
      expect(error).toBeUndefined();
    });

    test('should reject listing without title', () => {
      const invalidListing = {
        listing: {
          description: 'A lovely place',
          location: 'London',
          country: 'UK',
          price: 100
        }
      };

      const { error } = listingSchema.validate(invalidListing);
      expect(error).toBeDefined();
    });

    test('should reject listing with negative price', () => {
      const invalidListing = {
        listing: {
          title: 'Apartment',
          description: 'Nice place',
          location: 'London',
          country: 'UK',
          price: -50
        }
      };

      const { error } = listingSchema.validate(invalidListing);
      expect(error).toBeDefined();
    });
  });

  describe('Review Schema', () => {
    test('should validate a correct review', () => {
      const validReview = {
        review: {
          rating: 4,
          comment: 'Great place to stay!'
        }
      };

      const { error } = reviewSchema.validate(validReview);
      expect(error).toBeUndefined();
    });

    test('should reject review with rating above 5', () => {
      const invalidReview = {
        review: {
          rating: 6,
          comment: 'Amazing!'
        }
      };

      const { error } = reviewSchema.validate(invalidReview);
      expect(error).toBeDefined();
    });

    test('should reject review with rating below 1', () => {
      const invalidReview = {
        review: {
          rating: 0,
          comment: 'Bad'
        }
      };

      const { error } = reviewSchema.validate(invalidReview);
      expect(error).toBeDefined();
    });
  });
});

