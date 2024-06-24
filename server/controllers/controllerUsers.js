const modelUser = require("../models/modelUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.register = async (req, res) => {
  try {
    // check account is exisit
    const { name, password } = req.body;

    var user = await modelUser.findOne({ name });

    if (user) {
      return res.send("User already exist").status(400);
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);

    user = new modelUser({
      name,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    // save
    await user.save();
    res.send("Register Success!!");
    // console.log(res)

  } catch (err) {
    console.log(err);
    res.status(500).send("Register Error");
  }
};

exports.login = async (req, res) => {
  try {
    // Check User
    const { name, password } = req.body;

    var user = await modelUser.findOneAndUpdate({ name }, { new: true });
    console.log(user);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }
      // Payload
      var payload = {
        user: {
          name: user.name,
          role: user.role,
        },
      };

      // Generate token
      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Login Error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    console.log("currentUser", req.user);
    const user = await modelUser.findOne({ name: req.user.name })
    .select('-password')
    .exec()
    
    res.send(user)
    
  } catch (err) {
    console.log(err)
    res.status(500).send("currentUser Error");
  }
}