const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//Index Route --index.ejs
router.get("/", wrapAsync(listingController.index));

//New Route--new.ejs
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show Route--show.ejs
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post(
    '/',
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,                          
    wrapAsync(listingController.createListing) 
  );
  

//Edit Route-edit.ejs
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update Route-edit.ejs
router.put("/:id", isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing));

//Delete Route-show.ejs
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroy));

module.exports = router;
