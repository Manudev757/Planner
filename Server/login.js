const fs = require("fs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const user = req.body;
  if (!user.username || !user.password)
    res.json({ message: "Please fill all fields to Login!" });
  else {
    fs.readFile("./Database/userDb.json", (err, data) => {
      const user_db = JSON.parse(data);
      const username = Object.keys(user_db);
      if (username.includes(user.username)) {
        if (user_db[user.username].password === user.password) {
          var token = jwt.sign(
            {
              username: user.username,
              email: user_db[user.username].email,
            },
            "key1000",
            { expiresIn: "1d" }
          );
          res.json({
            token: token,
            username: user.username,
          });
        } else res.json({ message: "Wrong Password" });
      } else {
        res.json({ message: "Username does not Exist! please Signup" });
      }
    });
  }
};

module.exports = login;
