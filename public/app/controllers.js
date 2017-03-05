(function () {
  'use strict';

  angular
  .module('app')
  .controller('HomeController', HomeController)
  .controller('NewController', NewController)
  .controller('ProfileController', ProfileController)
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController)
  .controller('LogoutController', LogoutController)
  .controller('MenuController', MenuController);

  function NewController($scope, $http, IdeaService) {
    var vm = this;

    vm.createIdea = createIdea;
    vm.deleteIdea = deleteIdea;

    IdeaService.get()
    .success(function(data) {
      data.reverse();
      vm.ideas = data;
    });

    function createIdea() {
      if (vm.idea.text != undefined) {
        IdeaService.create(vm.idea)
        .success(function(data) {
          data.reverse();
          vm.idea = {};
          vm.ideas = data;
        });
      }
    };

    function deleteIdea(id) {
      IdeaService.delete(id)
      .success(function(data) {
        data.reverse();
        vm.ideas = data;
      });
    };

  }

  function HomeController($scope, $http) {}

  function ProfileController($scope, $http) {}

  function RegisterController($scope, $http, UserService) {
    var vm = this;
    vm.saveUser = saveUser;
      // vm.user = {};
      // vm.user.username = vm.user.password = 'jack';
      // vm.user.email = 'jack@mail.com';

      function saveUser() {
        var isCorrect = vm.user.username != undefined 
        && vm.user.password != undefined
        && vm.user.email != undefined;
        if (isCorrect) {
          UserService.create(vm.user)
          .success(function(data) {
            vm.user = {};
            alert("User successfully saved");
          });
        }
      }

    }

    function LoginController($location, AuthService) {
      var vm = this;
      vm.login = login;
      vm.username = vm.password = 'test';
      // initController();

      // function initController() {
      //   AuthService.logout();
      // };

      function login() {
        vm.loading = true;
        AuthService.login(vm.username, vm.password, function (result) {
          if (result === true) {
            $location.path('/');
          } else {
            vm.error = 'Username or password is incorrect';
            vm.loading = false;
          }
        });
      };

    }

    function LogoutController($location, AuthService) {
      AuthService.logout();
      $location.path('/home');
    }

    function MenuController ($scope, $location, AuthService) {
      $scope.isLoggedIn = AuthService.isLoggedIn();

      $scope.getClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
      };   

    }

  })();

