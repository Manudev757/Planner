function button() {
  var div = document.getElementById("popup");
  console.log(div);
  div.style.opacity = "0";
}
function Login() {
  window.location.href = "signup.html";
}
function signUp() {
  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var userData = {};
  userData.username = username;
  userData.password = password;
  userData.email = email;
  fetch("http://localhost:7777/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "User Added") {
        alert("Successfull Signup");
        window.location.href = "index.html";
      } else {
        document.getElementById("popup-msg").innerHTML = data.message;
        document.getElementById("popup").style.opacity = "1";
        document.getElementById("popup").style.backgroundColor = "#0FC1DD";
        document.getElementById("popup").style.visibility = "visible";
      }
    });
}

function loginUser() {
  const username = document.getElementById("l-username").value;
  const password = document.getElementById("l-password").value;
  const user = {};
  user.username = username;
  user.password = password;
  fetch("http://localhost:7777/index", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        document.getElementById("popup-msg").innerHTML =
          "Successfully Loged In!";
        document.getElementById("popup").style.opacity = "1";
        document.getElementById("popup").style.backgroundColor = "#12E535";
        document.getElementById("popup").style.visibility = "visible";
        setTimeout(function () {
          window.location.href = "Dashboard.html";
        }, 2000);
      } else {
        document.getElementById("popup-msg").innerHTML = data.message;
        document.getElementById("popup").style.opacity = "1";
        document.getElementById("popup").style.backgroundColor = "#f44336";
        document.getElementById("popup").style.visibility = "visible";
      }
    });
}

function createProject() {
  const data = document.getElementById("project").value;
  const project = {};
  project.project = data;
  fetch("http://localhost:7777/Dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token").toString(),
    },
    body: JSON.stringify(project),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) alert(data.error);
    });
}
