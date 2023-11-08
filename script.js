function addTask() {
    var taskInput = document.getElementById("task-input").value;
    var taskDateTime = document.getElementById("task-datetime").value;

    if (taskInput === "" || taskDateTime === "") {
        alert("Please enter task and date/time.");
        return;
    }

    var taskList = document.getElementById("task-list");
    var li = document.createElement("li");
    li.innerHTML = `<strong>${taskInput}</strong> - ${taskDateTime} <button onclick="deleteTask(this)">Delete</button>`;
    taskList.appendChild(li);

    // Schedule notification for the specified date and time
    var taskDateTimeObj = new Date(taskDateTime);
    var now = new Date();
    var timeDiff = taskDateTimeObj - now;
    
    if (timeDiff > 0) {
        setTimeout(function () {
            showNotification(taskInput);
        }, timeDiff);
    }

    // Clear input fields after adding task
    document.getElementById("task-input").value = "";
    document.getElementById("task-datetime").value = "";
}

function deleteTask(element) {
    var taskList = document.getElementById("task-list");
    taskList.removeChild(element.parentNode);
}

function showNotification(taskText) {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("Task Reminder", {
                    body: "Don't forget: " + taskText,
                });
            }
        });
    } else {
        console.error("Notifications not supported in this browser.");
    }
}
