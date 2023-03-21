const fs = require("fs");

const edit = (req, res) => {
  var updatedForm = req.body;
  fs.readFile("./Database/projectDb.json", (err, data) => {
    var userProject = JSON.parse(data);
    var projects = userProject[req.user.username];
    var keys = Object.keys(projects);
    for (let key of keys) {
      if (projects[key].id === updatedForm.id) {
        updatedForm.status = projects[key].status;
        delete projects[key];
        key = updatedForm.name;

        projects[key] = updatedForm;
      }
    }
    fs.writeFile(
      "./Database/projectDb.json",
      JSON.stringify(userProject, null, 2),
      (err) => {
        if (!err) res.json({ message: "Task Updated Successfully" });
      }
    );
  });
};

module.exports = edit;
