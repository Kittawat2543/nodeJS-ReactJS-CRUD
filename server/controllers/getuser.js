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

exports.changerole = async (req, res) => {
  try {
    const { id , role } = req.body.data

    const user = await modelUser
      .findOneAndUpdate({_id:id},{role:role},{new:true})
      .select("-password")
      .exec();

      res.send(user);
      
  } catch (err) {
    console.log(err);
    res.status(500).send("currentUser Error");
  }
};
