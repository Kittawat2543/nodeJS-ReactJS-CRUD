const modelUser = require("../models/modelUser");


exports.list = async (req, res) => {
  try {

    const user = await modelUser
      .find({})
      .select("-password")
      .exec();

      res.send(user);
      
  } catch (err) {
    console.log(err);
    res.status(500).send("currentUser Error");
  }
};
