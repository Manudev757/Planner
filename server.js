const express = require("express");
const app = express();
require("dotenv").config();

const login = require("./Server/login");
const verifyUser = require("./Server/middleware");
const project = require("./Server/project");
const signUp = require("./Server/signup");

app.use(express.json());
app.use(express.static("Client"));

app.post("/index", login);
app.post("/signup", signUp);
app.post("/Dashboard", verifyUser, project);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server Running :)");
});
