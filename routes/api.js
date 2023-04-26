const express = require("express");
const router = express.Router();
const { convert } = require("../controllers/convertHandler");

router.route("/convert").get(convert);

module.exports = router;
