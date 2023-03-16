const express = require("express");

const app = express();
require("dotenv").config();

const login = require("./Server/login");
const verifyUser = require("./Server/middleware");
const project = require("./Server/project");
const dashboard = require("./Server/dashboard");
const signUp = require("./Server/signup");
const edit = require("./Server/edit");
const Delete = require("./Server/delete");
const setStatus = require("./Server/setStatus");
// const Sort = require("./Server/sort");

app.use(express.json());
app.use(express.static("Client"));

app.post("/index", login);
app.post("/signup", signUp);
app.post("/showTask", verifyUser, project);
app.post("/Dashboard", verifyUser, dashboard);
app.post("/edit", verifyUser, edit);
app.post("/delete", verifyUser, Delete);
app.post("/status", verifyUser, setStatus);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log("Server Running :)");
});
