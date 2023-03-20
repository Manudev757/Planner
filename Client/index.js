var username = "";

function button() {
  var div = document.getElementById("popup");
  console.log(div);
  div.style.opacity = "0";
}
function Login() {
  window.location.href = "signup.html";
}
function logOut() {
  if (confirm("Are you sure you want to Logout ?")) {
    window.location.href = "index.html";
    sessionStorage.clear();
  }
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.querySelector(".flex-wrapper").style.filter = "blur(10px)";
}
function openformedit(e) {
  document.getElementById("myFormedit" + e).style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.querySelector(".flex-wrapper").style.filter = "none";
}
function closeFormedit(e) {
  document.getElementById("myFormedit" + e).style.display = "none";
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
        console.log(data.username);
        sessionStorage.setItem("user", data.username);
        console.log(data);
        sessionStorage.setItem("token", data.token);
        document.getElementById("popup-msg").innerHTML =
          "Successfully Logged In!";
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

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle("show1");
  document.getElementById("myDropdown1").style.display = "block";
}
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show2");
  document.getElementById("myDropdown2").style.display = "block";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
function showPassword() {
  var tog = document.querySelector("#pass");
  if (tog.className === "open") {
    document.getElementById("image").src = "./Assets/eyeclose.png";
    document.getElementById("l-password").type = "text";
    tog.setAttribute("class", "close");
  } else {
    document.getElementById("image").src = "./Assets/eye.png";
    document.getElementById("l-password").type = "password";
    tog.setAttribute("class", "open");
  }
}
function showPasswords() {
  var tog = document.querySelector("#pass-s");
  if (tog.className === "open") {
    document.getElementById("image").src = "./Assets/eyeclose.png";
    document.getElementById("password").type = "text";
    tog.setAttribute("class", "close");
  } else {
    document.getElementById("image").src = "./Assets/eye.png";
    document.getElementById("password").type = "password";
    tog.setAttribute("class", "open");
  }
}
