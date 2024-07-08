const express = require("express");
const router = express.Router();

const { list,changerole } = require("../controllers/getuser");
const { auth, adminCheck } = require("../middleware/middlewareAuth");


router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changerole);


module.exports = router;
