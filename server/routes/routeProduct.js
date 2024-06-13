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

router.get("/product", auth, list);

router.get("/product/:id", auth, read);

router.post("/product", auth, upload, create);

router.put("/product/:id", auth, update);

router.delete("/product/:id", auth, remove);

module.exports = router;
