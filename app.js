var app = angular.module("personalManagerApp", []);

app.controller("TaskController", function ($scope) {
  $scope.priorityFilter = "";
  $scope.sortField = "dueDate";
  $scope.message = "";

  $scope.tasks = [
    {
      title: "Prepare AngularJS practical notes",
      category: "College",
      dueDate: new Date(),
      priority: "High",
      priorityRank: 1,
      completed: false,
    },
    {
      title: "Upload assignment screenshots",
      category: "Project",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      priority: "Medium",
      priorityRank: 2,
      completed: false,
    },
    {
      title: "Review lab experiment output",
      category: "Lab Work",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      priority: "Low",
      priorityRank: 3,
      completed: true,
    },
  ];

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

    $scope.tasks.push({
      title: $scope.newTask.title,
      category: $scope.newTask.category,
      dueDate: $scope.newTask.dueDate,
      priority: $scope.newTask.priority,
      priorityRank: getPriorityRank($scope.newTask.priority),
      completed: false,
    });

    $scope.newTask = {
      title: "",
      category: "",
      dueDate: null,
      priority: "",
    };

    $scope.taskForm.$setPristine();
    $scope.taskForm.$setUntouched();
    $scope.message = "Task added successfully.";
  };

  $scope.deleteTask = function (taskToDelete) {
    let index = $scope.tasks.indexOf(taskToDelete);

    if (index !== -1) {
      $scope.tasks.splice(index, 1);
      $scope.message = "Task deleted.";
    }
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
