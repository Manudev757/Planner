const fs = require("fs");

const serach = (req, res) => {
  var searchTxt = req.body;

  fs.readFile("./Database/projectDb.json", (err, result) => {
    var userProject = JSON.parse(result);
    var projects = userProject[req.user.username];
    var keys = Object.keys(projects);
    var array = [];
    for (var i = 0; i < keys.length; i++) {
      array.push(projects[keys[i]]);
    }
    array = array.filter((val) => val.name === searchTxt.search);
    if (array.length === 1) res.json(array);
    else res.json({ message: "No Tasks Found!" });
  });
};

module.exports = serach;
