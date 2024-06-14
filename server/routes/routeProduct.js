const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../controllers/controllerProduct");

// middleware
const { auth } = require("../middleware/middlewareAuth");
const { upload } = require("../middleware/middlewareUpload")

router.get("/product", list);

router.get("/product/:id", read);

router.post("/product", upload, create);

router.put("/product/:id", update);

router.delete("/product/:id", remove);

module.exports = router;
