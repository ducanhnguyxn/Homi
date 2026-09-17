const { model } = require("mongoose");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

// Only initialize geocoding client if valid token exists (not in test mode)
let geocodingClient;
if (mapToken && mapToken.startsWith('pk.') && mapToken.length > 10) {
  try {
    geocodingClient = mbxGeocoding({ accessToken: mapToken });
  } catch (err) {
    console.log("Mapbox client initialization failed:", err.message);
  }
}


module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
      })
      .populate("owner");
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async(req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    
    let result = listingSchema.validate(req.body);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    // Only geocode if client is available
    if (geocodingClient) {
      let response = await geocodingClient
          .forwardGeocode({
          query: req.body.listing.location,
          limit: 1,
        })
          .send();
      newListing.geometry = response.body.features[0].geometry;
    } else {
      // Default geometry for testing
      newListing.geometry = {
        type: "Point",
        coordinates: [0, 0]
      };
    }

   let savedListing = await newListing.save();
   console.log(savedListing);

   req.flash("success", "New Listing Created");
   res.redirect("/listings");
};

module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image= {url, filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async(req, res) => {
    let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", "Listing Deleted");
   res.redirect("/listings");
};

