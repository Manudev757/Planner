changeTheme(true);
function changeTheme(load = false) {
  var isClicked = document.getElementsByTagName("i");
  if (
    (!load && isClicked[0].className === "fa-regular fa-moon fa-xs") ||
    (load && sessionStorage.getItem("dark") == "fa-solid fa-sun fa-xs")
  ) {
    sessionStorage.setItem("dark", "fa-solid fa-sun fa-xs");
    document.getElementById("toggle").className =
      sessionStorage.getItem("dark");
    document.getElementById("body-tag").style.transition =
      "background-color 0.3s ease-in 0.3s";
    document.querySelector(".navbar").style.transition =
      "background-color 0.3s ease-in 0.3s";
    document.getElementById("body-tag").style.backgroundColor = "rgb(43 41 41)";
    document.querySelector(".text").style.color = "white";
    document.querySelector(".navbar").style.backgroundColor = "#3E4043";
    document.querySelector(".navbar").style.color = "white";
    document.querySelectorAll(".bucket").forEach((e) => {
      e.style.boxShadow =
        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
    });
  } else {
    sessionStorage.setItem("dark", "fa-regular fa-moon fa-xs");
    document.getElementById("toggle").className =
      sessionStorage.getItem("dark");
    document.getElementById("body-tag").style.transition =
      "background-color 0.3s ease-in 0.3s";
    document.querySelector(".navbar").style.transition =
      "background-color 0.3s ease-in 0.3s";
    document.getElementById("body-tag").style.backgroundColor = "white";
    document.querySelector(".text").style.color = "black";
    document.querySelector(".navbar").style.backgroundColor = "white";
    document.querySelector(".navbar").style.color = "black";
  }
}
function getTimeLeft(time) {
  let timeString = ["seconds", "minutes", "hours", "days"];
  let weight = [60, 60, 24];
  let timeLeft = timeString[0];
  for (let i = 0; i < weight.length; i++) {
    if (time > weight[i]) {
      time = time / weight[i];
      timeLeft = timeString[i + 1];
    } else break;
  }
  return Math.floor(time) + " " + timeLeft;
}
function getRemainingTime(start, end, status) {
  if (status == "not-started") {
    const TimeDiff = (new Date(start) - new Date()) / 1000;
    if (TimeDiff >= 0) return getTimeLeft(TimeDiff) + " to start";
    return getTimeLeft(-TimeDiff) + " delay";
  }
  if (status == "in-progress") {
    const TimeDiff = (new Date(end) - new Date()) / 1000;
    if (TimeDiff >= 0) return getTimeLeft(TimeDiff) + " to complete";
    return getTimeLeft(-TimeDiff) + " delay";
  }
  if (status == "completed") {
    const TimeDiff = (new Date(end) - new Date()) / 1000;
    return "completed";
  }
  return "invalid project status";
}

function setPorjects(project, container) {
  var projects = project;
  let renderProject = ``;
  console.log(container);
  document.querySelector("#" + container).innerHTML = ``;
  for (var i = 0; i < projects.length; i++) {
    renderProject = `
      <div class="draggable wrapper" draggable="true" id="${projects[i].id}">
        <div class="dragzone">
          <div id="top" class="top-section dynamic">
            <div>&nbsp;${projects[i].name}</div>
            <div id="completed-div">&nbsp;${projects[i].status}</div>
          </div>

          <div class="mid-section">
            <div class="s-date box">
              <div class="date start">Start Date</div>
              <div class="date s-dateinput">
              ${projects[i].startDate.split("T")[0]}
              </div>
            </div>
            <div class="timer ${
              project[i].status
            }"><div class="icons"><i class="fa-solid fa-clock"></i></div><div class="icons check">${getRemainingTime(
      projects[i].startDate,
      projects[i].endDate,
      projects[i].status
    )}</div></div>
            <div class="e-date box">
              <div class="date end">End Date</div>
              <div class="date e-dateinput">
              ${projects[i].endDate.split("T")[0]}
              </div>
            </div>
          </div>

          <div class="bottom-section">
            <div class="nsbt edit">
              <button onclick="openformedit(${i})">
                Edit&nbsp;<i class="fa-solid fa-pen-to-square fa"></i>
              </button>
            </div>
            <div class="nsbt delete">
              <button onclick="deleteTask(${projects[i].id})">
                Delete&nbsp;<i class="fa-solid fa-trash fa"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      </br>
    


    <div class="form-popup" id="myFormedit${i}">
<div class="form-container">
  <h1>Edit Task</h1>

  <label for="email"><b>Task Name</b></label>
  <input
    id="txt-input${i}"
    class = "txt-input"
    type="text"
    placeholder="Enter the Task Name"
    value="${projects[i].name}"
    required
  />
  <label for="psw"><b>Start Date</b></label>
  <input class="e-input" id="e-input${i}" value="${
      projects[i].startDate
    }" type="datetime-local" name="psw" required />
  <label for="psw"><b>End Date</b></label>
  <input class = "s-input" value="${
    projects[i].endDate
  }" id="s-input${i}" type="datetime-local" name="psw" required />
  <br />
  <br />
  <button onclick="updateTask(${i},${
      projects[i].id
    })" type="submit" class="btn">
    Update Task
  </button>
  <button type="button" class="btn cancel" onclick="closeFormedit(${i})">
    Close
  </button>
</div>
</div>
`;
    if (projects[i].status === "not-started") {
      document.querySelector("#not-started").innerHTML += renderProject;
      var color = document.querySelectorAll("#completed-div");
      color.forEach((e) => {
        if (e.innerHTML.split(";")[1] === "not-started") {
          e.style.backgroundColor = "#2E74EC";
        }
      });
    } else if (projects[i].status === "in-progress") {
      document.querySelector("#in-progress").innerHTML += renderProject;
      var color = document.querySelectorAll("#completed-div");
      color.forEach((e) => {
        if (e.innerHTML.split(";")[1] === "in-progress") {
          e.style.backgroundColor = "#F69C00";
        }
      });
    } else {
      document.querySelector("#completed").innerHTML += renderProject;
      var color = document.querySelectorAll("#completed-div");
      color.forEach((e) => {
        if (e.innerHTML.split(";")[1] === "completed") {
          e.style.backgroundColor = "green";
        }
      });
    }
  }
  handleDrag();
}

function handleDrag() {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", (e) => {
      draggable.classList.remove("dragging");
      fetch("/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token").toString(),
        },
        body: JSON.stringify({
          id: e.target.id,
          container: droppeddiv,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          window.location.reload();
        });
    });
  });
}
fetch("/Dashboard", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    token:
      sessionStorage.getItem("token") != null
        ? sessionStorage.getItem("token").toString()
        : "",
  },
  body: "",
})
  .then((data) => data.json())
  .then((res) => {
    if (res.error) {
      alert(res.error);
      window.location.href = "index.html";
      return;
    }
    var keys = Object.keys(res);
    var array = [];
    for (var i = 0; i < keys.length; i++) {
      array.push(res[keys[i]]);
    }
    setPorjects(array, "completed");

    const containers = document.querySelectorAll(".drag");
    handleDrag();

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        droppeddiv = container.id;
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
  });
let droppeddiv = "";
function createTask() {
  var taskName = document.getElementById("txt-input").value;
  var startDate = document.getElementById("e-input").value;
  var endDate = document.getElementById("s-input").value;
  var start = new Date(startDate);
  var end = new Date(endDate);
  var total_seconds = Math.abs(end - start) / 1000;
  var days_difference = Math.floor(total_seconds / (60 * 60 * 24));
  var project = {};
  project.name = taskName;
  project.startDate = startDate;
  project.endDate = endDate;
  project.remaning = days_difference;
  project.status = "not-started";
  project.id = Date.now();
  fetch("/showTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token").toString(),
    },
    body: JSON.stringify(project),
  })
    .then((data) => data.json())
    .then((res) => {
      window.location.reload();
      alert(res.message);
    });
}

function updateTask(e, id) {
  var taskName = document.getElementById("txt-input" + e).value;
  var startDate = document.getElementById("e-input" + e).value;
  var endDate = document.getElementById("s-input" + e).value;
  var start = new Date(startDate);
  var end = new Date(endDate);
  var total_seconds = Math.abs(end - start) / 1000;
  var days_difference = Math.floor(total_seconds / (60 * 60 * 24));
  var project = {};
  project.name = taskName;
  project.startDate = startDate;
  project.endDate = endDate;
  project.remaning = days_difference;
  project.status = "not-started";
  project.id = id;
  fetch("/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token").toString(),
    },
    body: JSON.stringify(project),
  })
    .then((data) => data.json())
    .then((res) => {
      window.location.reload();
      alert(res.message);
    });
}

function filterTask() {
  var element = document.getElementById("search").value;
  fetch("/searchTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token").toString(),
    },
    body: JSON.stringify({ search: element }),
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.message) {
        alert(res.message);
      } else {
        setPorjects(res, res[0].status);
      }
    });
}
function deleteTask(e) {
  var deleteTask = e;
  if (confirm("Are you sure want you to delete the Task?"))
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token").toString(),
      },
      body: JSON.stringify({ id: deleteTask }),
    })
      .then((data) => data.json())
      .then((res) => {
        window.location.reload();
      });
}

function sortC1(e, container) {
  document.getElementById("myDropdown1").style.display = "none";
  document.getElementById("myDropdown2").style.display = "none";
  var sortType = e;
  fetch("/Dashboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token").toString(),
    },
    body: JSON.stringify({ sort: sortType, container }),
  })
    .then((data) => data.json())
    .then((res) => {
      setPorjects(res, container);
    });
}
