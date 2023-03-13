const fs = require("fs");
const signUp = (req, res) => {
  const user = req.body;
  const userData = {};
  const name = user.username;
  userData[name] = user;

  if (!user.username || !user.password || !user.email)
    res.json({ message: "Please fill all fields Properly!" });
  else if (user.password.length < 5)
    res.json({ message: "Password length must be greater than 4!" });
  else {
    fs.readFile("./Database/userDb.json", (err, data) => {
      if (err) {
        fs.writeFile(
          "./Database/userDB.json",
          JSON.stringify(userData, null, 2),
          (err) => {
            if (!err) res.json({ message: "User Added" });
          }
        );
      } else {
        let userAdd = JSON.parse(data);
        let checkUser = Object.keys(userAdd);
        if (checkUser.includes(name))
          res.json({ message: "Username Already Exist!" });
        else {
          userAdd = { ...userAdd, ...userData };
          fs.writeFile(
            "./Database/userDb.json",
            JSON.stringify(userAdd, null, 2),
            (err) => {
              if (!err) res.json({ message: "User Added" });
              else res.status(201);
            }
          );
        }
      }
    });
  }
};

module.exports = signUp;
