const express = require("express");
const router = express.Router();

const {
  list
} = require("../controllers/getuser");
const { auth, adminCheck } = require("../middleware/middlewareAuth");


router.get("/user", auth, adminCheck, list);

module.exports = router;
