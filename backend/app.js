const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const adminRouter = require("./routes/admin");
const sequelize = require("./utils/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(adminRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is working on the port 3000");
    });
  })
  .catch((err) => {
    res.status(500).send({ message: "server error" });
  });
