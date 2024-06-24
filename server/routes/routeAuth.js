const express = require("express");
const router = express.Router();

const { register,login,currentUser } = require("../controllers/controllerUsers")
const { auth } = require("../middleware/middlewareAuth")

router.post("/register", register);
router.post('/login', login)
router.post("/current-user",auth , currentUser);



module.exports = router