const jwt = require("jsonwebtoken");

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
