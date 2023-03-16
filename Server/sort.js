// const fs = require("fs");

// const Sort = (req, res) => {
//   var sortType = req.body;
//   fs.readFile("./Database/projectDb.json", (err, data) => {
//     var userProject = JSON.parse(data);
//     var projects = userProject[req.user.username];
//     var keys = Object.keys(projects);
//     if(sortType === 'name1')

//     for (let key of keys) {
//       if (projects[key].id === deleteId.id) {
//         delete projects[key];
//       }
//     }
//     fs.writeFile(
//       "./Database/projectDb.json",
//       JSON.stringify(userProject, null, 2),
//       (err) => {
//         if (!err) res.json({ message: "Task Deleted Successfully" });
//       }
//     );
//   });
// };

// module.exports = Sort;
