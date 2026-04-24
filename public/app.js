var app = angular.module("personalManagerApp", []);

app.controller("TaskController", function ($scope, $http) {
  $scope.priorityFilter = "";
  $scope.sortField = "dueDate";
  $scope.message = "";

  $scope.tasks = [];

  $scope.newTask = {
    title: "",
    category: "",
    dueDate: null,
    priority: "",
  };

  function getPriorityRank(priority) {
    if (priority === "High") {
      return 1;
    }

    if (priority === "Medium") {
      return 2;
    }

    return 3;
  }

  $scope.addTask = function () {
    if (
      !$scope.newTask.title ||
      !$scope.newTask.category ||
      !$scope.newTask.dueDate ||
      !$scope.newTask.priority
    ) {
      $scope.message = "Please fill all task details.";
      return;
    }

    $http
      .post("/addTasks", $scope.newTask)
      .then(function (response) {
        if (response.data.message === "Task added successfully.") {
          $scope.newTask = {
            title: "",
            category: "",
            dueDate: null,
            priority: "",
          };

          $scope.message = response.data.message;

          loadTasks();
        }
      })
      .catch(function (error) {
        $scope.message =
          (error.data && error.data.message) ||
          "Failed to add task. Please try again.";
      });

    $scope.taskForm.$setPristine();
    $scope.taskForm.$setUntouched();
  };

  function loadTasks() {
    $http
      .get("/getTasks")
      .then(function (response) {
        $scope.tasks = response.data.tasks.map(function (task) {
          return {
            title: task.title,
            category: task.category,
            dueDate: new Date(task.dueDate),
            priority: task.priority,
            priorityRank: getPriorityRank(task.priority),
            completed: task.completed,
          };
        });
      })
      .catch(function (error) {
        $scope.message =
          (error.data && error.data.message) ||
          "Failed to load tasks. Please try again.";
      });
  }
  loadTasks();

  $scope.deleteTask = function (index) {
    console.log("Deleting task at index:", index);
    $http
      .delete("/deleteTask", {
        data: { index: index },
        //DELETE requests do not always include a body by default in every framework,
        //so this explicit data field is what makes the task index available
        // on the server side as req.body.index.
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        if (response.data.message === "Task deleted successfully.") {
          $scope.deleteMessage = response.data.message;
          loadTasks();
        } else {
          $scope.deleteMessage = response.data.message;
        }
      })
      .catch(function (error) {
        $scope.deleteMessage =
          (error.data && error.data.message) ||
          "Failed to delete task. Please try again.";
      });
  };

  $scope.clearCompleted = function () {
    $scope.tasks = $scope.tasks.filter(function (task) {
      return !task.completed;
    });
    $scope.message = "Completed tasks cleared.";
  };

  $scope.filterByPriority = function (task) {
    return !$scope.priorityFilter || task.priority === $scope.priorityFilter;
  };
});
