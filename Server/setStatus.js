const fs = require("fs");

const setStatus = (req, res) => {
  const id = req.body.id;
  const container = req.body.container;
  console.log(id, container);
  fs.readFile("./Database/projectDb.json", (err, data) => {
    var userProject = JSON.parse(data);
    var projects = userProject[req.user.username];
    var keys = Object.keys(projects);
    for (const key of keys) {
      if (projects[key].id === parseInt(id)) {
        projects[key].status = container;
      }
    }
    // console.log(userProject);
    console.log("status", JSON.stringify(userProject, null, 2));
    fs.writeFile(
      "./Database/projectDb.json",
      JSON.stringify(userProject, null, 2),
      (err) => {
        console.log("err", err);
        if (err) console.log("error", err);
        if (!err) res.json({ message: "Updated" });
      }
    );
  });
};

module.exports = setStatus;
