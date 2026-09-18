const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignUp);

router.post("/signup", wrapAsync(userController.signUp));

router.get("/login", userController.renderLogIn);


router.post("/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true, 
    }),
    userController.logIn
    
);

router.get("/logout", userController.logOut);

router.get("/wishlist", isLoggedIn, wrapAsync(userController.renderWishlist));

module.exports  = router;