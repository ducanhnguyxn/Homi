// Basic tests that don't require database or external services
describe('Basic Functionality Tests', () => {
  
  test('ExpressError utility should work correctly', () => {
    const ExpressError = require('../utils/ExpressError');
    const error = new ExpressError(404, 'Not Found');
    
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
  });

  test('wrapAsync utility should exist and be a function', () => {
    const wrapAsync = require('../utils/wrapAsync');
    expect(typeof wrapAsync).toBe('function');
  });

  test('Listing model schema should have required fields', () => {
    const Listing = require('../models/listing');
    const schema = Listing.schema.obj;
    
    expect(schema).toHaveProperty('title');
    expect(schema).toHaveProperty('price');
    expect(schema).toHaveProperty('location');
    expect(schema).toHaveProperty('country');
  });

  test('User model should have email field', () => {
    const User = require('../models/user');
    const schema = User.schema.obj;
    
    expect(schema).toHaveProperty('email');
    expect(schema.email.required).toBe(true);
  });

  test('Review model should have required fields', () => {
    const Review = require('../models/review');
    const schema = Review.schema.obj;
    
    expect(schema).toHaveProperty('comment');
    expect(schema).toHaveProperty('rating');
  });

  test('cloudConfig should export storage and cloudinary', () => {
    const cloudConfig = require('../cloudConfig');
    
    expect(cloudConfig).toHaveProperty('storage');
    expect(cloudConfig).toHaveProperty('cloudinary');
  });
});

