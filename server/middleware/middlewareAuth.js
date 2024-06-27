const jwt = require("jsonwebtoken");
const ModelUser = require("../models/modelUser")


exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(400).send("No token");
    }
    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded.user

    next();
  } catch (err) {
    console.log(err);
    res.send("token invalid").status(500);
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    console.log(req.user.name)
    const userAdmin = await ModelUser.findOne({ name: req.user.name })
      .select("-password")
      .exec()
    
    if (userAdmin.role !== "admin") {
      res.status(500).send("admin access denied");
    } else {
      next()
    }

  } catch (err) {
    console.log(err)
    res.status(500).send("admin access denied")
  }
}
