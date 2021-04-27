//checking authentication 
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
        //if user is logged in, take then to the / route.
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
        //if they are not authenticated -> go to dashboard and make an account
      }
    },
  }
  