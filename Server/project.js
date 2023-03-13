const fs = require("fs");

const project = (req, res) => {
  const datas = req.body;
  const loggedUser = req.user.username;
  fs.readFile("../Database/userDb.json", (err, data) => {
    const user_db = JSON.parse(data);
    const username = Object.keys(user_db);
    if (username.includes(loggedUser)) {
      const project = {};
      const user = {};
      const name = datas.project;
      project[name] = datas;
      user[loggedUser] = project;
    }
  });
};

module.exports = project;
