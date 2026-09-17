
const User = require("../models/user");

module.exports.renderSignUp = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password); 
        console.log(registeredUser); 
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Explorage");
            res.redirect("/listings");
        }) 
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
   
};

module.exports.renderLogIn = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.logIn = async (req, res) => {
    req.flash("success", "Welcome to Explorage! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    
    // Manually save session before redirecting to ensure cookie is set
    req.session.save((err) => {
        if (err) {
            console.log("Session save error:", err);
            return res.redirect("/login");
        }
        res.redirect(redirectUrl);
    });
};

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
      if(err){
        return next(err);
      }  
      req.flash("success", "You are logged out");
      res.redirect("/listings");
    });
};