const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  var token = req.headers.token;
  if (!token) {
    res.json({
      error: "You are not Authorized to this Page... Login First!!🧐",
    });
    res.status(401);
  } else {
    jwt.verify(token, "key1000", (err, data) => {
      if (data) {
        req.user = data;
        next();
      } else {
        res.json({
          error: "You Are Not an Authorized User-Login First!!",
        });
        res.status(421);
      }
    });
  }
};

module.exports = verifyUser;
