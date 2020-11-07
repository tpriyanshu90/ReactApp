var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{"username": "Priyasnhu","id": 1},
      {"username" : "Divyanshu","id": 2}
  ]);
});

module.exports = router;
