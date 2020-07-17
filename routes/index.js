var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/goods', function (req, res, next) {
  res.send(`Welcome Mr.${req.user.profile.name}`)
});

module.exports = router;
