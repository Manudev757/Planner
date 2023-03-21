const fs = require("fs");

const project = (req, res) => {
  const datas = req.body;
  const loggedUser = req.user.username;
  fs.readFile("./Database/userDb.json", (err, data) => {
    const user_db = JSON.parse(data);
    const username = Object.keys(user_db);
    if (username.includes(loggedUser)) {
      const project = {};
      const user = {};
      const name = datas.name;
      project[name] = datas;
      user[loggedUser] = project;
      var prj = Object.keys(user[loggedUser]);
      fs.readFile("./Database/projectDb.json", (err, result) => {
        if (err) {
          console.log("project", user);
          fs.writeFile(
            "./Database/projectDb.json",
            JSON.stringify(user, null, 2),
            (err) => {
              if (!err) console.log("success");
            }
          );
        } else {
          var existData = JSON.parse(result);
          var keys = Object.keys(existData[loggedUser]);
          if (keys.includes(prj[0]))
            res.json({
              Info: "Task Name Already Exsist, Please choose Another Name..!",
            });
          else {
            if (loggedUser in existData) existData[loggedUser][name] = datas;
            else {
              existData[loggedUser] = {};
              existData[loggedUser][name] = datas;
            }
            fs.writeFile(
              "./Database/projectDb.json",
              JSON.stringify(existData, null, 2),
              (err) => {
                if (!err) res.json({ message: "Task Added" });
              }
            );
          }
        }
      });
    }
  });
};

module.exports = project;
