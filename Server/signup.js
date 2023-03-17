const fs = require("fs");
const signUp = (req, res) => {
  const user = req.body;
  const userData = {};
  const name = user.username;
  var exist = false;
  const email = user.email;
  userData[name] = user;
  let check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  if (!user.username || !user.password || !user.email)
    res.json({ message: "Please fill all fields Properly!" });
  else if (user.password.length < 8)
    res.json({ message: "Password length must be greater than 7!" });
  else if (!check.test(user.password))
    res.json({
      message:
        "Password is Not Strong! Please Provide a Strong password to Protect Your Account :)",
    });
  else if (user.email.indexOf("@") === -1)
    res.json({ message: "Not an Valid Email , Please Verify!" });
  else if (!user.email.endsWith(".com"))
    res.json({ message: "Not an Valid Email, Please Verify!" });
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
        console.log(userAdd);
        for (var i = 0; i < checkUser.length; i++) {
          if (userAdd[checkUser[i]].email === email) exist = true;
        }
        if (checkUser.includes(name))
          res.json({ message: "Username Already Exist!" });
        else if (exist) {
          res.json({ message: "Email Already Exist!" });
        } else {
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
