const fs = require("fs");

const dashboard = (req, res) => {
  var needSort = req.body.sort;
  var container = req.body.container;
  fs.readFile("./Database/projectDb.json", (err, data) => {
    try {
      if (data != undefined || data != null || data != "") {
        var userProject = JSON.parse(data);
        var projects = userProject[req.user.username];
        var keys = Object.keys(projects);
        var array = [];
        for (var i = 0; i < keys.length; i++) {
          array.push(projects[keys[i]]);
        }
        array = array.filter((val) => val.status == container);

        if (needSort != undefined) {
          if (needSort === "name1") {
            array.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            res.json(array);
          }
          if (needSort === "startdate1") {
            array.sort((a, b) => {
              var sdate = new Date(a.startDate).getTime();
              var edate = new Date(b.startDate).getTime();
              return sdate - edate;
            });
            res.json(array);
          }
          if (needSort === "enddate1") {
            array.sort((a, b) => {
              var sdate = new Date(a.endDate).getTime();
              var edate = new Date(b.endDate).getTime();
              return sdate - edate;
            });
            res.json(array);
          }
        } else res.json(projects);
      }
    } catch (e) {}
  });
};

module.exports = dashboard;
