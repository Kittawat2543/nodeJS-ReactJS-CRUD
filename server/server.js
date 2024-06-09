const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparse = require("body-parser");


const connectDB = require("./config/db");

const { readdirSync } = require("fs");

const app = express();
const port = 8000;

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyparse.json({ limit: "10mb" }));

readdirSync("./routes").map((r) => {
  app.use("/api", require("./routes/" + r));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
