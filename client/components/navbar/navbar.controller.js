'use strict';

angular.module('cornerfindApp')
  .controller('NavbarCtrl', function ($state ,$scope, $location, Auth,brand, category,products, $cookieStore, eventEmitter) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];




    $scope.brandList = brand.query();
    $scope.categoryList=category.query();

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.currentUser = Auth.getCurrentUser();

    if(Auth.isLoggedIn()){
      $scope.userFirstName = $scope.currentUser.name.split(" ")[0];
    }

    $scope.genderList = ['Boy', 'Girl'];
    
    $scope.smallerThan = function(){ //navbar breakpoint
      return $scope.windowWidth < 900 ? true:false;
    }

    $scope.logout = function() {
      Auth.logout();
      // $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
    $scope.getCartId=function(){
      return $cookieStore.get('cartId');
    }

    // EVENT EMITTER CODE

    $scope.categoryEmit = function (selected) {
      eventEmitter.emitEvent(selected, 'category');
    };

     $scope.brandEmit = function (selected) {
      eventEmitter.emitEvent(selected, 'brand');
    };

    $scope.genderEmit = function (selected) {
      eventEmitter.emitEvent(selected, 'gender');
    };

  });
