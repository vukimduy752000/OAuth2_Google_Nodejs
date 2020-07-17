var express = require('express');
var usersRouter = express.Router();
var passport = require('passport')

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

usersRouter.get('/logout', (req, res, next) => {
  console.log(req.session);

  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id")
    console.log("After Logout", req.session);
    res.redirect('/');
  } else {
    err = new Error("You are not logged in");
    err.statusCode = 404;
    next(err);
  }
})

usersRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

usersRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/bad' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.session);
    res.send("Successfully loggin")
  });

module.exports = usersRouter;
