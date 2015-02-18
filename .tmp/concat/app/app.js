'use strict';

angular.module('cornerfindApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'firebase',
  'ui.utils',
  'ngTouch',
  'ngAnimate',
  'ngDialog'
])
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('authInterceptor', ["$rootScope", "$q", "$cookieStore", "$location", function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }])

  .run(["$rootScope", "$location", "Auth", function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }]);

'use strict';

angular.module('cornerfindApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.message = 'Hello';
  }]);

'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      });
  }]);
'use strict';

angular.module('cornerfindApp') //look into $urlrouterprovider otherwise method
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('account',{
        url: '/account',
        templateUrl: 'app/account/manageAccount/manageAccount.html',
        controller: 'ManageAccountCtrl'
      })
      .state('account.address',{
        templateUrl: 'app/account/manageAccount/manageAddress.html',
        controller: "EasypostCtrl"
      })
      .state('account.profile',{
        templateUrl: 'app/account/manageAccount/manageProfile.html',
        controller: "ManageProfileCtrl"
      })
      .state('account.settings',{
        templateUrl: 'app/account/manageAccount/changePassword.html',
        controller: 'ChangePasswordCtrl'
      })
      .state('account.listings',{
        templateUrl: 'app/account/manageAccount/manageListings.html',
        controller: 'ManageListingsCtrl'

      })
      .state('account.offers',{
        templateUrl: 'app/account/manageAccount/manageOffers.html',
        controller: 'ManageOffersCtrl'
      })

      .state('login', {
        url: '/logins',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
  }]);
'use strict';

angular.module('cornerfindApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$location", "$window", "$state", function ($scope, Auth, $location, $window, $state) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          //// Logged in, redirect to home
          //$location.path('/');
          console.log('changing state');
          $state.go('main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

'use strict';

angular.module('cornerfindApp')
  .controller('ChangePasswordCtrl', ["$scope", "User", "Auth", function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  }]);

'use strict';

angular.module('cornerfindApp')
	.controller('ManageAccountCtrl',["$scope", "Auth", "User", "$state", function($scope, Auth,User, $state){
		$scope.hello= 'Hello';
		$scope.currentUser = Auth.getCurrentUser();


		$scope.isActive = function(inputState){
			return inputState === $state.current.name;
		}

		// $scope.isMobile = function(){
		// 	if($scope.windowWidth<=768){
		// 		return 's12 m6 l6';
		// 	} return 's2 m2 l2';
		// }
	}])
'use strict';

angular.module('cornerfindApp')
	.directive('manageListingCard',function(){
		return {
			templateUrl: "app/account/manageAccount/manageListing.card.html",
			restrict: 'EA',
			scope:{
				listing: '=info',
				editProduct: '&'
			},
			link: function(scope,element,attrs){
				scope.submitted = false;
				scope.submitButton = function(){
					scope.submitted=true;
				}
			}

		}
	})
'use strict';

angular.module('cornerfindApp')
	.controller('ManageListingsCtrl',["$scope", "products", function($scope, products) {
		// Need to display all products belonging to this user
		products.resource.getUsersListings({id:$scope.currentUser._id},
			function(res, err){
				$scope.usersListings = res;
			});
		
		$scope.submitProductChanges = function(obj){
			products.resource.update({id:obj._id},obj,function(){
				// console.log("submitProductChanges fired with: ",obj)
				$scope.submitted = true;
			})

		}


	}])
'use strict';

angular.module('cornerfindApp')
    .directive('manageOfferView', ["review", function(review) {
        return {
            templateUrl: "app/account/manageAccount/manageOffer.card.html",
            restrict: 'EA',
            scope: {
                offer: '=info',
                currentUser: '=',
                status: '=',
                stripeResult: '=',
                acceptOffer: '&'
                // submitReview: '&'
            },
            link: function(scope, element, attrs) {
                scope.accepted = false;

                scope.submitButton = function() {
                    scope.charged = true;
                     scope.accepted = true;
                }

                scope.showReview = false;
          

                scope.review = function() {
                    scope.showReview = true;
                }

                scope.newReview = {
                    reviewedUserId: scope.offer.buyerId._id,
                    reviewingUserId: scope.offer.sellerId._id,
                    text: "",
                    rating: 0,
                    date: new Date()
                }
                scope.maxStars = [1, 2, 3, 4, 5];

                scope.starClasses = ["", "", "", "", ""];
                scope.setStars = function(num) {
                    scope.newReview.rating = num;
                    for (var i = 0; i < num; i++) {
                        scope.starClasses[i] = "star-color";
                    }
                    for (var i = num; i < 5; i++) {
                        scope.starClasses[i] = "";
                    }
                    
                }
                scope.submitReview = function () {
                	// console.log('FIRED')
                	scope.newReview.text = scope.reviewText;
                    review.resource.save(scope.newReview, function (res,err) {
                    // console.log("REVIEW CLLBACK",res,err)
                    toast('Review submitted!', 3000);
                    });
                }
                scope.$on("success",function(){
                    console.log('Success LISTENER')
                    toast('Success!',3000);
                    scope.reviewable=true;
                })
            }

        }
    }])
'use strict';

angular.module('cornerfindApp')
    .controller('ManageOffersCtrl', ["$scope", "review", "offer", "$state", "Address", "$http", "ngDialog", function($scope,review, offer, $state, Address, $http, ngDialog) {


        $scope.offers = offer.resource.manageOffers({
            id: $scope.currentUser._id
        }, function(offers) {
            // Create digestible stripe order
            $scope.stripeOrder = {
                stripeToken: offers[0].buyerId.billing.stripeToken,
                orderTotal: offers[0].lineItems[0].purchasePrice
            }
            console.log('offer is...', offers);
            $scope.status = {
                status: ['accepted', 'shipped', 'received', 'issues']
            }
        })

        

        $scope.stripeResult = {};
     
        $scope.acceptOffer = function(orderId, orderObj) {
            
            ngDialog.open({
                template: 'templateId'
            });

            var buyerAddress = orderObj.buyerAddress;
            offer.resource.charge($scope.stripeOrder, function(result) {
                // console.log('FIRST')
                    if (result.captured === true) {
                        $scope.stripeResult = result;
                        // console.log('FIRED')

                        Address.getUserAddresses({
                                id: $scope.currentUser._id
                            })
                            .$promise.then(function(data) {

                                var sellerAddress = {
                                    name: data[0].name,
                                    street1: data[0].street1,
                                    street2: data[0].street2 || '',
                                    city: data[0].city,
                                    state: data[0].state,
                                    zip: data[0].zip,
                                    country: data[0].country,
                                    phone: data[0].phone
                                };

                                $http.post('/api/easyposts/createLabel', {
                                    toAddress: buyerAddress,
                                    fromAddress: sellerAddress
                                }).success(function(results) {
                                    // console.log('third')
                                    var labelUrl = results.postage_label.label_url;
                                    offer.resource.acceptOffer({
                                        id: orderId,
                                        url: labelUrl
                                    }, function(res, error) {
                                        console.log('AcceptOffer Callback ', res)
                                        // $scope.offerAccepted = true;
                                        ngDialog.close({
                                            template: 'templateId'
                                        });
                                        $scope.$broadcast('success');
                                        // toast('Success!',4000)
                                    })


                                });
                            })
                    }
                }
            );
        }

        $scope.submitReview = function(reviewObj){
            // console.log('REVIEW OBJ ',reviewObj)
            review.resource.save(reviewObj,function(res,err){
                // console.log('Review Callback ',res,err)
            })
        }
    }])
angular.module('cornerfindApp')
	.controller('ManageProfileCtrl',["$scope", "Auth", "User", function($scope, Auth, User){
		$scope.currentUser = Auth.getCurrentUser();
		$scope.master ={};
		//For form Reset
		angular.copy($scope.currentUser,$scope.master)

		$scope.updateUser = function(userObject){
			User.update(userObject._id,userObject,function(res){
				$scope.success = true;
			})
		}

		$scope.cancelChanges = function(){
			angular.copy($scope.master,$scope.currentUser)
		}

	}])
'use strict';

angular.module('cornerfindApp')
  .factory('review', ["$http", "$location", "$resource", function($http, $location, $resource) {
    return{
      resource: $resource('/api/reviews/:id/:controller', { id: '@_id'}, {
        update: {
          method: 'PUT'
        }
      })
    }
  }])
'use strict';

angular.module('cornerfindApp')
  .controller('SignupCtrl', ["$scope", "Auth", "$location", "$window", function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          username: $scope.user.username,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

'use strict';

angular.module('cornerfindApp')
  .controller('AdminCtrl', ["$scope", "$http", "Auth", "User", function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  }]);

'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      });
  }]);
'use strict';

angular.module('cornerfindApp')
    .factory('brand', ["$resource", function($resource) {
        return $resource('/api/brands/:id/:controller', {
                id: '@_id'
            }
        )
    }]);
'use strict';

angular.module('cornerfindApp')
  .factory('category', ["$resource", function ($resource) {
    return $resource('/api/categorys/:id',{id:'@_id'})
}]);

'use strict';

angular.module('cornerfindApp')
    .controller('ChatCtrl', ["$scope", "$http", "chat", "$firebase", "Auth", "$stateParams", function($scope, $http, chat, $firebase, Auth, $stateParams) {
        // $scope.myDataRef = new Firebase('https://cornerfind.firebaseio.com/');
        $scope.productID = $stateParams.id;
        var ref = new Firebase('https://cornerfind.firebaseio.com/chats/' + $scope.productID);
        var sync = $firebase(ref);
        $scope.chatList = sync.$asObject();
        $scope.newChat = {
            username: '',
            textLine: ''
        };

        $scope.addChat = function(paramNewChatText) {

            $scope.newChat.textLine = paramNewChatText;
            $scope.newChat.username = Auth.getCurrentUser().username;

            console.log('hitting function');
            $http.post('/api/chats', {

                newChat: $scope.newChat,
                productID: $scope.productID

            });
            $scope.newChatText = '';
        };



        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };

        // $scope.addChatFire = function(newChatText){
        //       console.log('NewChatText Variable:', newChatText);
        // sync.$push({name: "Arcadius", text: newChatText});
        //     };



        // $scope.addThing = function() {
        //   if($scope.newThing === '') {
        //     return;
        //   }
        //   $http.post('/api/things', { name: $scope.newThing });
        //   $scope.newThing = '';
        // };

        // $scope.deleteThing = function(thing) {
        //   $http.delete('/api/things/' + thing._id);
        // };

        // $scope.$on('$destroy', function () {
        //   socket.unsyncUpdates('thing');
        // });

    }]);

'use strict';

angular.module('cornerfindApp')
  .directive('chat', function () {
    return {
      templateUrl: 'app/chat/chat.html',
      restrict: 'EA',
      scope: {chatlist: '=',
              addchat: '&'
  		},
      // link: function (scope, element, attrs) {
      // }
    };
  });
'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl'
      });
  }]);
'use strict';

angular.module('cornerfindApp')
  .factory('chat', ["$http", "$q", function ($http, $q) {
    // Service logic
    // ...
    var chatlist = [];

    // Public API here
    return {
      getChatList: function (productID) {
        // console.log('productID:', productID);
        var deferred = $q.defer();

        $http.get('/api/chats/' + productID)
        .success(function(results) {
            deferred.resolve(results);
        }).error(function() {
            console.log('Chat Get Failed');
        });

        return deferred.promise;
      // socket.syncUpdates('chat', $scope.chatlist);
      },

      addChat: function(newChat) {
        chatList = chatList.push(newChat);
        console.log(chatList);
      }
    };

  }]);

'use strict';

angular.module('cornerfindApp')
    .directive('checkoutd', ["User", "$location", function(User, $location) {
        return {
            templateUrl: 'app/checkout/checkoutDirective/checkoutDirective.html',
            restrict: 'EA',
            scope: {
                product: '=',
                showtoken: '=',
                user: '=',
                stripeResponseHandler: "&",
                buttonText: '@',
                saveOrder: '&',
                offerPrice: '='
            },
            link: function(scope, element, attrs) {

                    Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');

                    scope.checkout = function() {
                        var ccArr = scope.ccinfo.expiry.split('/');
                        scope.ccinfo.exp_month = ccArr[0];
                        scope.ccinfo.exp_year = ccArr[1];
                        Stripe.card.createToken(scope.ccinfo, stripeResponseHandler);

                        return true;

                    };

                    function stripeResponseHandler(status, response) {
                        if (response.error) {
                            // show the errors on the form
                            scope.errorMessage = response.error.message;

                            scope.$apply();
                        } else {
                            console.log('STRIPE RESPONSE ',response)
                            // token contains id, last4, and card type
                            scope.user.billing.cardType = response['card']['brand'];
                            scope.user.billing.last4 = response['card']['last4'];
                            scope.user.billing.stripeToken = response['id'];
                            scope.showtoken = false;
                            User.update(scope.user)
                                .$promise.then(function(user) {
                                    scope.saveOrder({offerPrice:scope.offerPrice})
                                });
                        }
                    }


                } //END OF LINK
        };
    }]);
'use strict';

angular.module('cornerfindApp')
    .factory('Like', ["$resource", function($resource) {
        return $resource('/api/likes/:id/:option', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            },
            getUserByName: {
                method: 'GET',
                params: {
                    option: 'products'
                }
            }
            // ,
            // getLikes: {
            //     method: 'GET',
            //     params: {
            //         option: 'products'
            //     }
            // },
            // add: {
            //     method: 'POST',
            //     params: {
            //         option: 'products'
            //     }
            // },
            // showRec: {
            //    method: 'GET'
            // }
        });
    }]);

'use strict';

angular.module('cornerfindApp')
    .directive('successConfirmation', function() {
        return {
            templateUrl: "/app/components/success.view.html",
            restrict: 'EA',
            scope: {
                text: "@"
                // success: "="
            },
            link: function(scope, element, attrs) {
                // scope.toggleSuccess = function() {
                //     if (typeof scope.success === 'undefined' || $scope.success === false) {
                //         scope.success = true;
                //     } else {
                //         scope.success = false;
                //         scope.$apply();
                //     }
                // }
                // $scope.successPopup = function() {
                //     scope.toggleSuccess()
                //     var changeBack = _.debounce($scope.toggleSuccess, 3000)
                //     changeBack();
                // }
                // scope.successPopup();
            }

        }
    })
'use strict';

angular.module('cornerfindApp')
  .factory('condition', ["$resource", function ($resource) {
    return $resource('/api/conditions/:id',{id:'@_id'})
}]);

'use strict';

angular.module('cornerfindApp')
    .factory('Address', ["$resource", function($resource) {
        return $resource('/api/address/:id/:controller', {id: '@_id'}, {

            updateAddress: {
            	method: 'PUT',
            	params: {
            		id: '@id'
            	}
            },
            getUserAddresses:{
                method: "GET",
                isArray: true,
                params: {
                    id: '@id',
                    controller: 'shipping'
                }
            }
        })
    }]);
'use strict';

angular.module('cornerfindApp')
    .controller('EasypostCtrl', ["$scope", "$http", "$cookieStore", "Auth", "Address", "$state", "$stateParams", "offer", function($scope, $http, $cookieStore, Auth, Address, $state,$stateParams, offer) {
        $scope.verifyAddyResult;
        $scope.false = true;
        $scope.buttonText = 'Submit';
        $scope.buttonColor = '';
        $scope.currentUser = Auth.getCurrentUser();

        $scope.address = Address.get({
            id: $scope.currentUser._id
        });

        $scope.saveAddress = function() {
            toast('Confirming Address ...', 1500)
            if ($scope.buttonText == 'Submit') {


                $http.post('/api/easyposts/verify', {
                    fromAddress: $scope.address
                }).success(function(address, status) {
                    console.log('EASYPOST RESPONSE ',address)
                    if (typeof address ==='string') {
                        $scope.badAddress = true;
                        $scope.errorMessage = address;
                        return;
                    }

                    $scope.address = {
                        userId: $scope.currentUser._id,
                        name: address.address.name,
                        street1: address.address.street1,
                        street2: address.address.street2,
                        state: address.address.state,
                        zip: address.address.zip,
                        city: address.address.city,
                        phone: address.address.phone,
                        email: address.address.email
                    }

                    Address.updateAddress({
                        id: $scope.currentUser._id
                    }, $scope.address, null, function(results) {
                        // console.log('RESULTS ', results)
                        console.log('ARGS ', arguments)
                        // offer.addToOrder($scope.address)
                        $cookieStore.put('shippingAddress',$scope.address)
                        
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                        $state.go('products.confirmOrder',{id: $stateParams.id});
                    })

                })
            }
        }


        $scope.createLabel = function(buyerAddress, sellerAddress) {
            console.log(buyerAddress, SellerAddress);
            $http.post('/api/easyposts/createLabel', {
                to_Address: buyerAddress,
                from_address: sellerAddress
            }).success(function(results) {
                $scope.labelURL = results;
            });
        }

        $scope.resetAddy = function() {
            $scope.address = {};
            $scope.badAddress = false;

        }

    }]);
'use strict';

angular.module('cornerfindApp')
  .directive('easypost', function () {
    return {
      templateUrl: 'app/easypost/easypost.html',
      restrict: 'EA',
      scope: {
      	context: '@'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
'use strict';

angular.module('cornerfindApp')
  .factory('eventEmitter', function () {

    // Public API here
    return {

      emitEvent: function(selected, event) {
         radio(event).broadcast(selected);
      },

      subscribeEvent: function(event, callback) {
        // console.log('event in factory is..', event)
        radio(event).subscribe(callback);
      }

    };
  });

'use strict';

angular.module('cornerfindApp')
  .factory('likes', ["$resource", function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    return{

      resource: $resource('/api/likes/:id/:string', { id: '@_id'}, {
        update: {
          method: 'PUT'
        },
        getUserLikes : {
          isArray: true,
          method: 'GET',
          params: {
            string: 'user',
            id: '@id'
          }
        },
        getProductLikes : {
          isArray: true,
          method: 'GET',
          params: {
            string: 'product',
            id: '@id'
          }
        },
        deleteLike : {
          url: '/api/likes/delete',
          method: 'POST'
        }
      }),

    }
}]);

'use strict';

angular.module('cornerfindApp')

    .controller('MainCtrl', ["$scope", "Auth", "$location", "$http", "socket", "products", "brand", "category", "$window", "eventEmitter", function($scope, Auth, $location, $http, socket, products, brand, category, $window, eventEmitter) {
        $scope.productList = products.resource.query();
        $scope.brandList = brand.query();
        $scope.categoryList = category.query();
        $scope.currentUser = Auth.getCurrentUser();
        $scope.loggedin = Auth.isLoggedIn();

        console.log($scope.loggedin);

  $(document).ready(function(){
      $('.slider').slider({full_width: false});
    });

        $scope.searchSubmit = function(searchText) {
            if(searchText == ''){
                $scope.productList = products.resource.query();
            }
          console.log('inside searchSubmit');
            products.resource.search({
                   //searchtext: searchText
                   id: searchText
                }).$promise
                .then(function(results) {
                   //$scope.results = results;
                   $scope.productList = results;
                    console.log('results: ', results);
                    //if ($scope.results.data.length === 1) {
                      if ($scope.results.length === 1) {
                        console.log('There was only one object found..');
                 //   } else if ($scope.results.data.length > 1) {
                     } else if ($scope.results.length > 1) {
                        console.log('There was more than one object found!');

                    }
                    toast('Search complete', 2000);
                })
                .catch(function(err) {
                    console.log('There was an error in search', err);
                });
        };

        $scope.addProduct = function (userId) {
             $location.path('/users/' + $scope.currentUser._id+'/add');
        };

        // EventEmitter code
        eventEmitter.subscribeEvent('category', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'category',name: selected});
        });

         eventEmitter.subscribeEvent('brand', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'brand' ,name: selected});
        });

         eventEmitter.subscribeEvent('gender', function (selected) {
             console.log('selected filter is', selected);
             $scope.productList = products.resource.getFiltered({type:'gender' ,name: selected});
        });

    }]);


'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }) 


  }]);
'use strict';

angular.module('cornerfindApp')
  .controller('OfferCtrl', ["$scope", "$stateParams", "offer", "Auth", function ($scope, $stateParams, offer, Auth) {

    $scope.user = Auth.getCurrentUser().$promise.then(function (user) {
    $scope.offers = offer.resource.getBuyersOffers({id: user._id});
    });

    
    $scope.cancelOffer = function(param){
    	offer.resource.delete({id:param._id},function(res,err){
    		var index = $scope.offers.indexOf(param);
    		$scope.offers.splice(index,1);
    	})
    }

    $scope.modifyOffer = function(obj){
        // Depopulating the model before sending to backend
        // otherwise it will error on save
        //ifs are in case it's modified multiple times in one session
        if(typeof obj.sellerId === 'object'){
            obj.sellerId = obj.sellerId._id;
        };

        for(var i = 0;i<obj.lineItems.length;i++){
            if(typeof obj.lineItems[i].productId==='object'){
                obj.lineItems[i].productId = obj.lineItems[i].productId._id;
            }
        };
        //removing version to prevent errors on multiple modifications
        delete obj.__v; 

        offer.resource.updateOffer({id:obj._id},obj,function(res,err){
            // console.log('RES ',res, err)
      
        });
    }

  }]);

'use strict';

angular.module('cornerfindApp')
    .directive('yourOfferView', ["review", "offer", function(review, offer) {
            return {
                templateUrl: "app/offer/offer.directive.html",
                restrict: 'EA',
                scope: {
                    offer: '=',
                    modifyOffer: '&',
                    cancelOffer: '&'
                },
                link: function(scope, element, attrs) {

                    scope.statusCheck = {
                        status: ['accepted', 'shipped', 'received', 'issues']
                    };

                    scope.showReview = false;
                    scope.finished = false;

                    scope.review = function() {
                        scope.showReview = true;
                    }

                    scope.newReview = {
                        reviewedUserId: scope.offer.sellerId._id,
                        reviewingUserId: scope.offer.buyerId,
                        text: "",
                        rating: 0,
                        date: new Date(),
                    }
                    scope.maxStars = [1, 2, 3, 4, 5];

                    scope.starClasses = ["", "", "", "", ""];
                    scope.setStars = function(num) {
                        scope.newReview.rating = num;
                        for (var i = 0; i < num; i++) {
                            scope.starClasses[i] = "star-color";
                        }
                        for (var i = num; i < 5; i++) {
                            scope.starClasses[i] = "";
                        };
                    }
                    scope.submitReview = function() {

                        scope.newReview.text = scope.reviewText;
                        review.resource.save(scope.newReview, function(result) {
                            if (result) {
                                toast('Review submitted!', 4000);

                            }
                        });


                        // Update Offer object to reviewed equals true
                        offer.updateOffer({id: scope.offer._id}, {reviewed:true}, function(res, err) {
                                console.log("modify Success", res);
                               toast('Success!', 4000);
                               scope.finished = true;
                            })
                    }

                  }
                }}])
'use strict';

angular.module('cornerfindApp')
	.config(["$stateProvider", function ($stateProvider) {
		$stateProvider
			.state('offer',{
				url:'/offers/:userId', 
				templateUrl: 'app/offer/offer.html',
				controller: "OfferCtrl"
			})
	}])
'use strict';

angular.module('cornerfindApp')
    .factory('offer', ["$resource", function($resource) {
        var order = {};
        
        return {

            setOrder: function(orderObject) {
                order = orderObject;
            },
            getOrder: function() {
                return order;
            },
            addToOrder:function(object){
                for(var key in object){
                    if(object.hasOwnProperty(key)){
                        order[key]=object[key]
                    }
                }
            },

            resource: $resource('/api/orders/:id/:trackingUrl/:offers', {
                    id: '@_id'
                },

                {
                    getBuyersOffers: {
                        isArray: true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'offers'
                        }
                    },
                    getAcceptedOffer: {
                        // isArray:true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'getAccepted'
                        }
                    },
                    charge: {
                        method: 'POST',
                        params: {
                            offers: 'charge'
                        }
                    },
                    manageOffers: {
                        isArray: true,
                        method: 'GET',
                        params: {
                            id: '@id',
                            offers: 'manageOffers'

                        }
                    },

                    acceptOffer: {
                        method: 'GET',
                        params: {
                            id: '@id',
                            trackingUrl: '@url',
                            offers: 'acceptOffer'
                        }
                    },
                    updateOffer: {
                        method: 'PUT',
                        params: {
                            id: '@id'
                        }
                    }
                })
        }
    }]);
'use strict';

angular.module('cornerfindApp')
    .controller('ConfirmOrderCtrl', ["$q", "$scope", "$state", "offer", "Auth", "Address", "$cookieStore", function($q, $scope, $state, offer, Auth, Address, $cookieStore) {
        $scope.currentUser = Auth.getCurrentUser();
        // $scope.order = offer.getOrder();
        //if get order returns things, add the cookie
        //otherwise pull the cookie that's already there
        $scope.order = $cookieStore.get('order');
        $scope.shippingAddress = $cookieStore.get('shippingAddress');
        $scope.cardInfo = $cookieStore.get('cardInfo')
        $scope.prodId = $scope.order.lineItems[0].productId;

        $scope.emitter = function() {
            $scope.$emit('checkout', {
                id: $scope.prodId,
                state: $state.current.name
            })
        };
        
        $scope.submitOrder = function() {

            $scope.clicked = true;

            var shipping = $scope.shippingAddress;
            var shippingAddress = {
                userId: $scope.currentUser._id,
                name: shipping.name,
                billing: false,
                street1: shipping.street1,
                street2: shipping.street2,
                city: shipping.city,
                state: shipping.state,
                zip: shipping.zip,
                phone: shipping.phone,
                country: 'US'
            }

            var order = $scope.order;

            //deleting for easypost
            delete shippingAddress.billing;
            delete shippingAddress.userId;
            var orderForCreation = {
                lineItems: order.lineItems,
                sellerId: order.sellerId,
                buyerId: order.buyerId,
                status: 'offer',
                buyerAddress: shippingAddress
            };

            

            offer.resource.save(orderForCreation, function(orderResult) {
                Address.updateAddress({
                    id: $scope.currentUser._id
                }, shippingAddress, null, function(addressResult) {
                    console.log('SUCCESS ', orderResult, addressResult);
                    $cookieStore.remove('order');
                    $cookieStore.remove('cardInfo');
                    $cookieStore.remove('shippingAddress');
                    $scope.orderId = orderResult._id;
                    $scope.$emit('submitted');
                    $scope.submitted = true;
                    
                })
            })



            //This setup isn't writing to DB, no time to troubleshoot
            //Doing it via callbacks for now
            // var orderDeferral = $q.defer();
            // var addressDeferral = $q.defer();

            // offer.resource.save(orderForCreation, function(result) {
            //     orderDeferral.resolve(result);
            // }, function(err) {
            //     if (err) {
            //         console.log('Error ', err)
            //     }
            // })

            // Address.updateAddress({
            //     id: $scope.currentUser._id
            // }, shippingAddress, null, function(results) {
            //     addressDeferral.resolve(results)
            //     console.log('APROMISE ', addressDeferral)
            // })

            // $q.all([orderDeferral.promise, addressDeferral.promise]).then(function(results) {
            //     $cookieStore.remove('order');
            //     $cookieStore.remove('cardInfo');
            //     $cookieStore.remove('shippingAddress');

            //     $scope.orderId = results[0]._id;

            //     // toast('Success!', 4000)
            //     $scope.$emit('submitted');
            //     $scope.submitted = true;
            // }, function(err) {
            //     console.log("ERROR ", err)
            // })
        }

    }])
'use strict';

angular.module('cornerfindApp')
    .controller('OneProductViewCtrl', ["$rootScope", "$scope", "Auth", "User", "Address", "products", "chat", "$stateParams", "offer", "$cookieStore", "$location", "$state", function($rootScope,$scope, Auth, User, Address, products, chat, $stateParams, offer, $cookieStore, $location, $state) {

        $scope.currentUser = Auth.getCurrentUser();
        if (typeof $scope.currentUser._id !== 'undefined') {
            Auth.getCurrentUser().$promise.then(function(user) {
                console.log('USER ',user)
                if (user.billing.stripeToken !== null) {
                    $scope.currentUser = user;
                } else {
                    $scope.currentUser = user;
                }
            })
        };

        products.resource.get({
            id: $stateParams.id
        }).$promise.then(function(product) {
            $scope.product = product;
        });

        chat.getChatList($stateParams.id).then(function(data) {
            $scope.chatlist = data;
        });

        $scope.isMobile = function(width) {
            return width <= 992;
        }

        
        $scope.isPinned = function(width) {
            if (!$scope.isMobile(width) && !$scope.showAddressForm) return 'pinned';
        }

        $scope.submitOffer = function(offerPrice) {

            var prod = $scope.product;
            $scope.isOffering = !$scope.isOffering;
            var orderForCreation = {
                lineItems: [{
                    //This ONLY handles single items as is, will need to be modified for bundling
                    productId: prod._id,
                    name: prod.name,
                    purchasePrice: offerPrice,
                    originalPrice: prod.price
                }],
                sellerId: prod.userId._id,
                buyerId: $scope.currentUser._id,
                status: 'offer'
            }

            // offer.setOrder(orderForCreation);
            $cookieStore.put("order",orderForCreation);
            
            if ($scope.currentUser.billing.stripeToken === null) {
                $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name});
                return $state.go('products.stripeInfo', {id: $stateParams.id});
            } else {
                // offer.addToOrder($scope.currentUser.billing);


                $cookieStore.put("cardInfo",$scope.currentUser.billing);

                //Now need to check if they have a listed address too
                //to see which state to go to
                Address.getUserAddresses({
                        id: $scope.currentUser._id
                    }, function(res) {

                        //Currently hardcoded for one address
                        //this could cause problems with editing addresses
                        //if we fetch the wrong one
                        $cookieStore.put('shippingAddress',res[0])
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                        $state.go("products.confirmOrder",{id: $stateParams.id})
                    }, function(err) {
                        console.log("ERR", err)
                    }
                )
            }
        }


        // $scope.buyNow = function() {
        //     //SHOWS CHECKOUT DIRECTIVE IF USER DOES NOT HAVE A TOKEN ALREADY
        //     if ($scope.currentUser.billing.stripeToken == null) {
        //         $scope.showtoken = true;
        //         return;
        //     }

        //     var prod = $scope.product;
        //     $scope.isOffering = !$scope.isOffering;

        //     var orderForCreation = {
        //         lineItems: [{
        //             //This ONLY handles single items as is, will need to be modified for bundling
        //             productId: prod._id,
        //             name: prod.name,
        //             purchasePrice: $scope.product.price,
        //         }],
        //         sellerId: prod.userId._id,
        //         buyerId: $scope.currentUser._id,
        //         status: 'accepted'
        //     }
        //     offer.save(orderForCreation, function(result) {}, function(err) {
        //         if (err) {
        //             console.log('Error ', err)
        //         };

        //     })

        //     // Create digestible stripe order
        //     $scope.stripeOrder = {
        //         stripeToken: $scope.currentUser.billing.stripeToken,
        //         orderTotal: $scope.product.price
        //     }

        //     offer.charge($scope.stripeOrder).$promise.then(function(result) {

        //         if (result.$resolved) {
        //             $scope.boughtItem = true;

        //         }
        //     })




        // }

        $scope.userRedirect = function() {
            $location.path('/users/' + $scope.product.userId.username);
        }



    }]);
'use strict';

angular.module('cornerfindApp')
    .directive('productCardView', ["Auth", "products", "likes", "$filter", function(Auth, products, likes, $filter) {
        return {
            templateUrl: 'app/products/productCardView/productCardView.html',
            restrict: 'EA',
            scope: {
                product: '=info',
            },
            link: function(scope, element, attrs) {

                //initialize get productlikes, currentuser and currentuserlikes
                var unbindWatcher = scope.$watch('product',function(){
                    likes.resource.getProductLikes({
                        id: scope.product._id
                    }).$promise.then(function(data) {
                        scope.product.likes = data;
                        scope.currentUser = Auth.getCurrentUser();
                    }).then(function() {
                        if (scope.currentUser._id) {
                            likes.resource.getUserLikes({
                                id: scope.currentUser._id
                            }).$promise.then(function(data) {
                                scope.currentUser.likes = data;
                            });
                        }
                    }).then(function(){
                        
                        var match = scope.product.likes.filter(function(el){
                            if(el.userId._id == scope.currentUser._id){
                                return el;
                            }
                        });

                        if (match.length > 0){
                            scope.favorited = true;
                        }
                        else{
                            scope.favorited = false;
                        }
                        
                    });
                         
                    unbindWatcher();
                });

                scope.$watch('product.likes', function() {
                    if(scope.product.likes){
                       scope.textGenerate();
                    }
                    
                }, true);

                scope.textGenerate = function() {

                    if (scope.product.likes.length === 1) {
                        scope.likeText = scope.product.likes[0].userId.username + " likes this";
                        if (scope.likeText.length > 40)
                            scope.likeText = scope.likeText.slice(0, 37) + "..."
                    } else if (scope.product.likes.length > 1) {
                        scope.likeText = scope.product.likes[0].userId.username + " and " + (scope.product.likes.length - 1) + " others like this";
                        if (scope.likeText.length > 40)
                            scope.likeText = scope.likeText.slice(0, 37) + "..."
                    } else {
                        scope.likeText = '';
                    }

                };

                // scope.textGenerate();

                //toggle favorite function to update backend.
                scope.toggleFavorite = function() {
                    if (scope.currentUser._id) {
                        // If already favorited do this
                        if (scope.favorited) {
                            likes.resource.deleteLike({
                                productid: scope.product._id,
                                userid: scope.currentUser._id
                            }).$promise.then(function() {;

                                var productLikeIndex = scope.product.likes.map(function(e) {
                                    return e.userId._id;
                                }).indexOf(scope.currentUser._id);
                                scope.product.likes.splice(productLikeIndex, 1);
                            });

                            scope.favorited = false;
                            // scope.textGenerate();
                        }
                        // If not favorited do this
                        else {
                             //save
                            likes.resource.save({
                                productId: scope.product._id,
                                userId: scope.currentUser._id
                            }).$promise.then(function(){
                                //push like to product likes. userId is actually User object to get username for text
                                scope.product.likes.push({
                                    productId: scope.product._id,
                                    userId: scope.currentUser
                                });
                            });

                            scope.favorited = true;
                            // scope.textGenerate();
                        }
                    }
                }
            }
        }
    }]);

'use strict';

angular.module('cornerfindApp')
  .controller('ProductsCtrl', ["$state", "$scope", "Auth", "$stateParams", function ($state, $scope, Auth, $stateParams) {
    if(!Auth.isLoggedIn()){
        return $state.go('login')
    }

    
    $scope.$on('checkout',function(event,data){
    	$scope.prodId = data.id;
    	$scope.stateName = data.state;
    })

    $scope.$on('submitted',function(){
    	$scope.submitted = true;
    })

  }]);

'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('products',{
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      })
      .state('products.oneProductView', {
        url: '/:id',
        templateUrl: 'app/products/oneProductView/oneProductView.html',
        controller: 'OneProductViewCtrl'
     })
      .state('products.stripeInfo',{
        url: '/:id',
        templateUrl: 'app/products/stripeForm.html',
        controller: 'StripeFormCtrl'
      })
      .state('products.addressForm',{
        url: '/:id',
        templateUrl: 'app/easypost/easypost.html',
        controller: 'EasypostCtrl'
      })
      .state('products.confirmOrder',{
        url: '/:id',
        templateUrl: 'app/products/confirmOrder.html',
        controller: 'ConfirmOrderCtrl'
      })
  }]);

'use strict';

angular.module('cornerfindApp')
  .factory('products', ["$http", "$location", "$resource", function($http, $location, $resource) {
    return{
      
      resource: $resource('/api/products/:id/:controller', { id: '@_id'}, {
        update: {
          method: 'PUT'
        },
        search : {
         // url: '/api/products/search/:query',
          isArray: true,
          method: 'GET',
          params: {
            id: '@searchtext',
            controller: 'search'
          }
        },
        updateQuantity : {
          url: '/api/products/qty/:id',
          method: 'PUT'
        },
        getUsersListings: {
          method: 'GET',
          isArray: true,
          params: {
            id: '@id',
            controller: 'listings'
          }
        },
         getOwner: {
          method: 'GET',
          params: {
            id: '@id',
            listings: 'owner'
          }
        },
         getFiltered: {
          method: 'POST',
           isArray: true,
          params: {
            controller: 'filtered'
          }
        }
      })
    }
  }])



'use strict';

angular.module('cornerfindApp')
    .controller('StripeFormCtrl', ["$stateParams", "$scope", "Auth", "User", "offer", "$state", "$cookieStore", function($stateParams, $scope, Auth,User,offer, $state, $cookieStore) {
    	$scope.currentUser = Auth.getCurrentUser();
        Stripe.setPublishableKey('pk_test_HrMktfRjskOsJMw8RBnfca6X');
        $scope.prodId = $stateParams.id;


        $scope.cancel = function(){
            $state.go('products')  //get the ID from state param
        }

        $scope.checkout = function() {
            var ccArr = $scope.ccinfo.expiry.split('/');
            $scope.ccinfo.exp_month = ccArr[0];
            $scope.ccinfo.exp_year = ccArr[1];
            Stripe.card.createToken($scope.ccinfo, stripeResponseHandler);
            return true;
        };

        function stripeResponseHandler(status, response) {
            if (response.error) {
                // show the errors on the form
                $scope.errorMessage = response.error.message;

                $scope.$apply();
            } else {
                console.log('STRIPE RESPONSE ', response)
                    // token contains id, last4, and card type
                $scope.currentUser.billing.cardType = response['card']['brand'];
                $scope.currentUser.billing.last4 = response['card']['last4'];
                $scope.currentUser.billing.stripeToken = response['id'];

                
                // offer.addToOrder($scope.currentUser.billing);


                User.update($scope.currentUser)
                    .$promise.then(function(user) {
                    	console.log('updated User ',user)
                        $cookieStore.put('cardInfo',$scope.currentUser.billing);
                        $scope.$emit('checkout',{id: $stateParams.id, state:$state.current.name})
                    	$state.go('products.addressForm',{id: $stateParams.id})
                    });
            }
        }





    }]);
'use strict';

angular.module('cornerfindApp')
  .controller('ProfileCtrl', ["$scope", "User", "$http", "Auth", function ($scope, User, $http, Auth) {
     // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  }]);

'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
     .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  }]);
'use strict';

angular.module('cornerfindApp')
  .directive('resizable', ["$window", function ($window) {
    return function($scope) {
      $scope.initializeWindowSize = function() {
        $scope.windowHeight = $window.innerHeight;
        $scope.windowWidth = $window.innerWidth;
      };
      $scope.initializeWindowSize();
       angular.element($window).bind('resize', function() {
        $scope.initializeWindowSize();
        $scope.$apply();
      });
    };
  }]);

'use strict';

angular.module('cornerfindApp')
  .directive('review', function () {
    return {
      templateUrl: 'app/review/review.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
'use strict';

angular.module('cornerfindApp')
    .directive('brandsidenav', ["$mdSidenav", function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/brandSidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav('brands').toggle();
                };
            },
            controller: ["$scope", function($scope) {
            }]
        }
    }]);
'use strict';

angular.module('cornerfindApp')
    .directive('categorysidenav', ["$mdSidenav", function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/categorySidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@',
                    activeCategories: '='
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav("categories").toggle();
                };
                scope.toggleActive =function(category){
                if(scope.activeCategories.indexOf(category)!==-1){
                    // console.log("FIRED")
                    return 'purple accent-1 z-depth-2';
                }
              }




            },
            controller: ["$scope", function($scope) {
              
            }]
        }
    }]);
'use strict';

angular.module('cornerfindApp')
    .directive('conditionsidenav', ["$mdSidenav", function($mdSidenav) {
        return {
            templateUrl: 'app/sidenav/conditionSidenav.html',
            restrict: 'EA',
            scope: {selection:'=',
        			onItemClick: "&",
        			buttonText :'@'
        			},
            link: function(scope, element, attrs) {
                  scope.id = scope.sidebarid;
            	  scope.openLeftMenu = function() {
                    $mdSidenav("conditions").toggle();
                    
                };


            },
            controller: ["$scope", function($scope) {
              
            }]
        }
    }]);

'use strict';

angular.module('cornerfindApp')
    .controller('AddProductCtrl', ["$scope", "brand", "condition", "category", "$q", "products", "Auth", "$state", function($scope, brand, condition, category, $q, products, Auth, $state) {

        if(!Auth.isLoggedIn()){
            return $state.go('login')
        }


        //GET all Brands and Categories
        $scope.availableBrands = brand.query();
        $scope.availableCategories = category.query();
        $scope.availableConditions = condition.query();
        $scope.userId = Auth.getCurrentUser()._id;

        //Add a new product
        $scope.newProduct = {
            userId: $scope.userId,
            category: [],
            photoUrls: []
        };
        $scope.newProductDisplay = {
            category: []
        };

        $scope.showBrands = false;
        $scope.showCategories = false;
        $scope.brandButton = 'Choose a Brand';
        $scope.categoryButton = 'Choose a Category';
        $scope.conditionButton = 'Choose a Condition';

        $scope.chooseBrand = function() {
            $scope.showBrands = true;
        }

        $scope.selectBrand = function(selected) {
            $scope.newProduct.brand = selected;
            $scope.showBrands = false;
            $scope.brandButton = selected;
        }

        $scope.chooseCategory = function() {
            $scope.showCategories = true;
        }

        $scope.selectCategory = function(selected) {
            $scope.newProduct.category = selected;
            $scope.showCategories = false;
            $scope.categoryButton = selected;
        }

         $scope.chooseCondition = function() {
            $scope.showConditions = true;
        }

        $scope.selectCondition = function(selected) {
            $scope.newProduct.condition = selected;
            $scope.showConditions = false;
            $scope.conditionButton = selected;
        }

        $scope.addProduct=function(newProduct){
            products.resource.save(newProduct,function(){
                console.log('Save Callback ',arguments)
                toast('Succesffuly added!', 4000);
            });
        }


        //Run this function when the input is changed
        $scope.upload = function(thing) {
            //Lines 7 and 8 are reliable ways to pull out the file name so it's saved in a friendly manner in the bucket.
            var file_name = angular.element('#file-upload').val().split('\\');
            file_name = file_name[file_name.length - 1];

            console.log('filename',file_name);

            //S3 Upload is a separate client side library I'll attach
            var s3upload = new S3Upload({
                //The file input
                file_dom_selector: 'file-upload',
                //The name from above
                s3_object_name: new Date().getTime() + file_name,
                //The route that will receive the upload and send to S3
                //See below
                s3_sign_put_url: 'api/products/sign_s3',
                //Use this hook for a nice progress bar!
                onProgress: function(percent, message) {
                    console.log('Upload progress: ' + percent + '% ' + message);
                },
                onFinishS3Put: function(public_url) {
                    console.log('Upload completed. Uploaded to: ' + public_url)
                    $scope.$apply(function() {
                        $scope.newProduct.photoUrls.push(public_url);
                    });

                },
                onError: function(status) {
                    console.log('Upload error: ' + status);
                }
            });
        }
    }]);
'use strict';

angular.module('cornerfindApp')
    .controller('FollowersCtrl', ["$scope", "Auth", "User", "$stateParams", function($scope, Auth, User, $stateParams) {
     
        // Get user of current page
        User.getUserByName({
                username: $stateParams.name
            }, function(user) {
                $scope.user = user;
            })


    }]);
'use strict';

angular.module('cornerfindApp')
    .controller('FollowingCtrl', ["$scope", "Auth", "User", "$stateParams", function($scope, Auth, User, $stateParams) {
        // Get user of current page
        User.getUserByName({
                username: $stateParams.name
            }, function(user) {
                $scope.user = user;
            })
    }]);
'use strict';

angular.module('cornerfindApp')
    .controller('UsersCtrl', ["$scope", "products", "Auth", "User", "chat", "review", "$stateParams", "$timeout", function($scope, products, Auth, User, chat, review, $stateParams, $timeout) {

        // Get logged in user object
        $scope.currentUser = Auth.getCurrentUser();

        // Set booleans for follow button text and showing review panel
        $scope.toggleText = 'Following';

        $scope.review = false;

        $scope.buttonText = 'Show Feedback'

        // Get user of current page
        User.getUserByName({
            username: $stateParams.name
        }, function(user) {
            $scope.user = user;

             // Get products listed by user
            products.resource.getUsersListings({id:$scope.user._id},
            function(res, err){
                
                $scope.productList = res;
                console.log('productList is..', $scope.productList)
            });

            // console.log('$scope.currentUser.following is ...', $scope.currentUser.following);

            $scope.reviews = review.resource.query({id:$scope.user._id});
            if ($scope.currentUser.following.indexOf($scope.user._id) !== -1) {
                $scope.followed = true;
                $scope.toggleText = 'Following';
           
            } else {
                $scope.followed = false;
                $scope.toggleText = 'Follow';
            
            }
        })

        $scope.showReviews = function () {
            $scope.review = !$scope.review;

            if ($scope.review) {
                $scope.buttonText = 'Hide Feedback'
            }
            else if (!$scope.review) {
                $scope.buttonText = 'Show Feedback'
            }
        }


        $scope.toggleFollow = function() {

            // If already following do this
            if ($scope.followed) {


                // Update logged in user's following Array
                $scope.currentUser.following.splice($scope.currentUser.following.indexOf($scope.user._id), 1)
                
                $timeout(function() {
                    User.update($scope.currentUser)
                        .$promise.then(function(user) {
                         
                            $scope.followed = false;
                            $scope.toggleText = 'Follow';
                            $scope.$apply;
                        });
                }, 1000);


                $scope.user.followers.splice($scope.user.followers.indexOf($scope.currentUser._id), 1)
                    // Update the user of the page's followers array
                User.update($scope.user)
                    .$promise.then(function(user) {
                        toast('Unfollowed',4000);
                    });

            }
            // If not following yet do this
            else {

                // Update logged in user's following Array
                $scope.currentUser.following.push($scope.user._id)
                User.update($scope.currentUser)
                    .$promise.then(function(user) {
                          toast('Following',4000);
                        $scope.followed = true;
                        $scope.toggleText = 'Following';
                        $scope.$apply;
                    });

                // Update the user of the page's followers array
                $scope.user.followers.push($scope.currentUser._id)
                User.update($scope.user)
                    .$promise.then(function(user) {
                        console.log('Follower pushed to users followers array ..', user)
                    });

            }
        }

        //Responsiveness functions
        $scope.isMobile = function(width) {
            return width <= 992;
        }

         $scope.isPinned = function(width) {
            if (!$scope.isMobile(width) && !$scope.showAddressForm) return 'pinned';
        }


    }]);
'use strict';

angular.module('cornerfindApp')
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users/:name',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('add_product', {
        url: '/users/{name}/add',
        templateUrl: 'app/users/add_product/add_product.html',
        controller: 'AddProductCtrl'
      })
      .state('followers', {
        url: '/users/{name}/followers',
        templateUrl: 'app/users/followers/followers.html',
        controller: 'FollowersCtrl'
      })
       .state('following', {
        url: '/users/{name}/following',
        templateUrl: 'app/users/followers/following.html',
        controller: 'FollowingCtrl'
      })
  }]);
'use strict';

angular.module('cornerfindApp')
  .factory('Auth', ["$location", "$rootScope", "$http", "User", "$cookieStore", "$q", function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          currentUser.$promise.then(function () {
            deferred.resolve(data);
          });
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  }]);

'use strict';

angular.module('cornerfindApp')
    .factory('User', ["$resource", function($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            changeProfilePic: {
                method: 'PUT',
                params: {
                    controller: 'picture'
                }
            },
            changeEmail: {
                method: 'PUT',
                params: {
                    controller: 'email'
                }
            },
            adminChangePassword: {
                method: 'PUT'
            },
            promote: {
                method: 'PUT',
                params: {
                    controller: 'promote'
                }
            },
            demote: {
                method: 'PUT',
                params: {
                    controller: 'demote'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            getUserByName: {
                method: 'POST',
                params: {
                    controller: 'profile'
                }
            },
             getOwner: {
                method: 'POST',
                params: {
                    controller: 'owner'
                }
            },
            update: {
                method: 'PUT',
                params: {
                  controller: 'update'
                }
            } 
        });
    }]);
'use strict';

angular.module('cornerfindApp')
  .controller('DropdownCtrl', ["$scope", "$log", function ($scope, $log) {
  	$scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  	];

  $scope.status = {
    openBrands: false,
    openCategories:false,
    openGenders:false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleBrands = function($event) {
    // $event.preventDefault();
    // $event.stopPropagation();
    $scope.status.openBrands= !$scope.status.openBrands;
  };
  
  $scope.toggleCategories = function($event) {
    // $event.preventDefault();
    $event.stopPropagation(); //Why does this line break the mobile dropdown?
    $scope.status.openCategories= !$scope.status.openCategories;
  };

    $scope.toggleGenders = function($event) {
    // $event.preventDefault();
    $event.stopPropagation(); //Why does this line break the mobile dropdown?
    $scope.status.openGenders = !$scope.status.openGenders;
  };
}])
'use strict';

angular.module('cornerfindApp')
  .factory('Modal', ["$rootScope", "$modal", function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  }]);

'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('cornerfindApp')
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });
'use strict';

angular.module('cornerfindApp')
  .controller('NavbarCtrl', ["$state", "$scope", "$location", "Auth", "brand", "category", "products", "$cookieStore", "eventEmitter", function ($state ,$scope, $location, Auth,brand, category,products, $cookieStore, eventEmitter) {
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

    $scope.genderList = ['Boy', 'Girl'];
    
    $scope.smallerThan768 = function(){ //768 is the twitter navbar breakpoint
      return $scope.windowWidth < 768 ? true:false;
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

  }]);

(function() {

  window.S3Upload = (function() {

    S3Upload.prototype.s3_object_name = 'default_name';

    S3Upload.prototype.s3_sign_put_url = '/signS3put';

    S3Upload.prototype.file_dom_selector = 'file_upload';

    S3Upload.prototype.onFinishS3Put = function(public_url) {
      return console.log('base.onFinishS3Put()', public_url);
    };

    S3Upload.prototype.onProgress = function(percent, status) {
      return console.log('base.onProgress()', percent, status);
    };

    S3Upload.prototype.onError = function(status) {
      return console.log('base.onError()', status);
    };

    function S3Upload(options) {
      if (options == null) options = {};
      for (var option in options) {
        this[option] = options[option];
      }
      this.handleFileSelect(document.getElementById(this.file_dom_selector));
    }

    S3Upload.prototype.handleFileSelect = function(file_element) {
      var f, files, output, _i, _len, _results;
      this.onProgress(0, 'Upload started.');
      files = file_element.files;
      output = [];
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        f = files[_i];
        _results.push(this.uploadFile(f));
      }
      return _results;
    };

    S3Upload.prototype.createCORSRequest = function(method, url) {
      var xhr;
      xhr = new XMLHttpRequest();
      if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        xhr = null;
      }
      return xhr;
    };

    S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
      var this_s3upload, xhr;
      this_s3upload = this;
      xhr = new XMLHttpRequest();
      xhr.open('GET', this.s3_sign_put_url + '?s3_object_type=' + file.type + '&s3_object_name=' + this.s3_object_name, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = function(e) {
        var result;
        if (this.readyState === 4 && this.status === 200) {
          try {
            result = JSON.parse(this.responseText);
          } catch (error) {
            this_s3upload.onError('Signing server returned some ugly/empty JSON: "' + this.responseText + '"');
            return false;
          }
          return callback(result.signed_request, result.url);
        } else if (this.readyState === 4 && this.status !== 200) {
          return this_s3upload.onError('Could not contact request signing server. Status = ' + this.status);
        }
      };
      return xhr.send();
    };

    S3Upload.prototype.uploadToS3 = function(file, url, public_url) {
      var this_s3upload, xhr;
      this_s3upload = this;
      xhr = this.createCORSRequest('PUT', url);
      if (!xhr) {
        this.onError('CORS not supported');
      } else {
        xhr.onload = function() {
          if (xhr.status === 200) {
            this_s3upload.onProgress(100, 'Upload completed.');
            return this_s3upload.onFinishS3Put(public_url);
          } else {
            return this_s3upload.onError('Upload error: ' + xhr.status);
          }
        };
        xhr.onerror = function() {
          return this_s3upload.onError('XHR error.');
        };
        xhr.upload.onprogress = function(e) {
          var percentLoaded;
          if (e.lengthComputable) {
            percentLoaded = Math.round((e.loaded / e.total) * 100);
            return this_s3upload.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
          }
        };
      }
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      return xhr.send(file);
    };

    S3Upload.prototype.uploadFile = function(file) {
      var this_s3upload;
      this_s3upload = this;
      return this.executeOnSignedUrl(file, function(signedURL, publicURL) {
        return this_s3upload.uploadToS3(file, signedURL, publicURL);
      });
    };

    return S3Upload;

  })();

}).call(this);

/* global io */
'use strict';

angular.module('cornerfindApp')
  .factory('socket', ["socketFactory", function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  }]);

angular.module('cornerfindApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/about/about.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"col-md-12\">\n" +
    "\n" +
    "    <!-- Start Full Team Page -->\n" +
    "    <center>\n" +
    "    <section id=\"instructors\" class=\"page\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"row team\">\n" +
    "                <div class=\"span12\">\n" +
    "                    <div class=\"title\"><h1><center>The Team</center></h1></div>\n" +
    "                    <hr>\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "\n" +
    "                               <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424062000450photo_justin.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Justin Cohen</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/justincoh/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/justincoh\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                                    <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424062016133photo_mitsu.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Mitsuaki Uchimoto</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "                                 <li><a href=\"https://www.linkedin.com/in/mitsuakiu/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/muchimoto\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424061972553photo_david.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">David Chang</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/davidjchang/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"https://github.com/wawaontheloose\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                            <div class=\"profile\">\n" +
    "                            <div style='text-align:center;'><img class=\"responsive-img circle profile\" src='http://cornerfind.s3-website-us-west-2.amazonaws.com/1424061553095photo_arcadius_400.jpg' alt=\"\">\n" +
    "                            </div>\n" +
    "                            <div class=\"profile-name\">Arcadius Kazimierski</div>\n" +
    "                            <div class=\"profile-job\">Full-stack Engineer</div>\n" +
    "                            <ul class=\"profile-social-icons\">\n" +
    "\n" +
    "                                <li><a href=\"https://www.linkedin.com/in/arcadiusk/en\"><i class=\"fa fa-linkedin-square\"></i>&nbsp linkedin</a>\n" +
    "                                </li>\n" +
    "                                <li><a href=\"http://github.com/ArcadiusK\"><i class=\"fa fa-github-square\">&nbsp github\n" +
    "    </i></a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                 </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </section>\n" +
    "\n" +
    "  </center>\n" +
    "\n" +
    "    </div>\n"
  );


  $templateCache.put('app/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <h4 id='loginTitle'>Login</h4>\n" +
    "     \n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <form class=\"form\" name=\"form\" ng-submit=\"login(form)\" novalidate>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='email' type=\"email\" class=\"validate\" ng-model=\"user.email\" required/>\n" +
    "            <label for=\"email\" class='active'>Email</label>\n" +
    "          </div>      \n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "           <div class=\"input-field col s12\">\n" +
    "            <input name='password' type=\"password\" class=\"validate\" ng-model=\"user.password\" required/>\n" +
    "            <label for=\"password\" class='active'>Password</label>\n" +
    "          </div> \n" +
    "        </div>\n" +
    "\n" +
    "          \n" +
    "        <div class=\"form-group has-error\">\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">\n" +
    "             Please enter your email and password.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.email && submitted\">\n" +
    "             Please enter a valid email.\n" +
    "          </p>\n" +
    "\n" +
    "          <p class=\"help-block\">{{ errors.other }}</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "          <button class=\"btn btn-inverse btn-lg btn-login\" type=\"submit\">\n" +
    "            Login\n" +
    "          </button>\n" +
    "          <a class=\"btn btn-default btn-lg btn-register\" href=\"/signup\">\n" +
    "            Register\n" +
    "          </a>\n" +
    "        </div>\n" +
    "\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <hr>\n" +
    "</div>\n"
  );


  $templateCache.put('app/account/manageAccount/changePassword.html',
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <h1>Change Password</h1>\n" +
    "  </div>\n" +
    "  <div class=\"col s12\">\n" +
    "    <form class=\"form\" name=\"form\" ng-submit=\"changePassword(form)\" novalidate>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>Current Password</label>\n" +
    "\n" +
    "        <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"user.oldPassword\"\n" +
    "               mongoose-error/>\n" +
    "        <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n" +
    "            {{ errors.other }}\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"form-group\">\n" +
    "        <label>New Password</label>\n" +
    "\n" +
    "        <input type=\"password\" name=\"newPassword\" class=\"form-control\" ng-model=\"user.newPassword\"\n" +
    "               ng-minlength=\"3\"\n" +
    "               required/>\n" +
    "        <p class=\"help-block\"\n" +
    "           ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">\n" +
    "          Password must be at least 3 characters.\n" +
    "        </p>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"help-block\"> {{ message }} </p>\n" +
    "\n" +
    "      <button class=\"btn\" type=\"submit\">Save changes</button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageAccount.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div resizable class='container'>\n" +
    "\n" +
    "\n" +
    "    <div class='row'>\n" +
    "\n" +
    "        <div class='col s12 m3 l3'>\n" +
    "            <a class='col s12' ui-sref-active='active' id='my-collection' ui-sref='account.profile'>Account Info</a>\n" +
    "             <a class='col s12' ui-sref-active='active' id='my-collection' ui-sref='account.address'>Manage Address</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.settings')}\" id='my-collection' ui-sref=\"account.settings\">Change Password</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.listings')}\" id='my-collection' ui-sref=\"account.listings\">View Listings</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.offers')}\" id='my-collection' ui-sref=\"account.offers\">View Orders</a>\n" +
    "            <a class='col s12 ' ng-class=\"{active: isActive('account.balance')}\" id='my-collection' ui-sref=\"account.balance\">View Balance</a>\n" +
    "        </div>\n" +
    "        <div class='col s1 m1 l1'></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class='col s12 m8 l8 offset-l1 offset-m1' ui-view>{{hello}} {{currentUser.name}}! Manage your account via the tabs on the left.</div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageAddress.html',
    "<h3>Billing Address</h3>\n" +
    "<easypost addyType='billing'></easypost>\n" +
    "<!-- \n" +
    "<h3>Shipping Address</h3>\n" +
    "<easypost saveAddy='shipping'></easypost>\n" +
    "\n" +
    " -->"
  );


  $templateCache.put('app/account/manageAccount/manageListing.card.html',
    "<div class=\"card\">\n" +
    "    <div class=\"card-image waves-effect waves-block waves-light\" style=\"width:100%\">\n" +
    "        <img class=\"activator\" src=\"{{listing.photoUrls[0]}}\">\n" +
    "    </div>\n" +
    "    <div class=\"card-content\">\n" +
    "        <span class=\"card-title activator grey-text text-darken-4\">{{listing.name}} <i class=\"mdi-navigation-more-vert right\"></i></span>\n" +
    "        <p><a href=\"#\">This is a link</a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- hidden stuff -->\n" +
    "    <div class=\"card-reveal\">\n" +
    "        <span class=\"card-title grey-text text-darken-4\">Edit {{listing.name}} <i class=\"mdi-navigation-close right\"></i></span>\n" +
    "        <success-confirmation ng-show='submitted' text='edited {{listing.name}}'></success-confirmation ng-show='success'>\n" +
    "        <div class='input-form' ng-show='!submitted'>\n" +
    "            <form ng-submit=\"editProduct({listing:listing})\">\n" +
    "                \n" +
    "                <input type='text' ng-model='listing.name'></input>\n" +
    "                <label>Description</label>\n" +
    "                <textarea ng-model='listing.desc'></textarea>\n" +
    "                \n" +
    "                <div class='col s6 m6 l6'>\n" +
    "\t                <label>Price</label>\n" +
    "\t                <input type=\"number\" ng-model=\"listing.price\"></input>\n" +
    "                </div>\n" +
    "                <div class='col s6 m6 l6'>\n" +
    "                \tPlaceholder\n" +
    "                </div>\n" +
    "                <button class='btn purple accent-3 waves-effect' ng-click='submitButton()'>Submit Changes</button>\n" +
    "                <button type='button' class='btn red accent-4'>Cancel</button>\n" +
    "                <!-- how can i make the cancel button wipe the changes that were made? -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageListings.html',
    "<div class=\"row\">\n" +
    "\n" +
    "  \t<h1>LISTINGS VIEW {{currentUser.name}}</h1>\n" +
    "  \t\n" +
    "  \t<div class='col s12 m12 l6' ng-repeat=\"listing in usersListings\">\n" +
    "  \t<!-- need to get offers on this product and display-->\n" +
    "  \t<manage-listing-card info='listing' edit-product=\"submitProductChanges(listing)\"></manage-listing-card>\n" +
    "\n" +
    "  \t</div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageOffer.card.html',
    "<div class=\"row\" id='manageOfferCard'>\n" +
    "    <div class=\"col s12 m11 l10 offset-l1 offset-m1\">\n" +
    "        <div class=\"card blue lighten-3\">\n" +
    "            <div class=\"card-content black-text\"><!-- remove inline styles -->\n" +
    "                <a ui-sref='user({name: offer.buyerId.username})' style=\"text-decoration:none; font-size: 1.5rem; \"><span class=\"card-title black-text buyerName\" >Buyer: {{offer.buyerId.name}} </span></a>\n" +
    "                <ul>\n" +
    "                    <p class='offerStatus'>Offer Status: {{offer.status}}</p>\n" +
    "                    <h5 class='offerTitle'>Items in this offer:</h5>\n" +
    "                    <li ng-repeat='product in offer.lineItems' class='offerItems'>\n" +
    "                        {{product.name}} - Listed Price: {{product.originalPrice | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <div class='total'>Offer Total: {{offer.orderTotal | currency}}</div>\n" +
    "            </div>\n" +
    "            <div class=\"card-action\">\n" +
    "                <form ng-hide=\"status.status.indexOf(offer.status) > -1 \" ng-submit=\"acceptOffer({offerId: offer._id, orderObj:offer})\">\n" +
    "                    <button ng-hide='accepted' class='btn' ng-click=\"submitButton()\">Accept Offer</button>\n" +
    "                    <!-- <button ng-hide='accepted' type='button' class='btn'>Reject button?</button> -->\n" +
    "                </form>\n" +
    "                <button ng-show= 'reviewable' class='btn' ng-click=\"review()\">Leave a Review!</button>\n" +
    "                <form ng-show='showReview' ng-submit=\"submitReview()\">\n" +
    "                    <div class=\"form-panel\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-7\">\n" +
    "                                <p>How was your experience with {{offer.buyerId.name}}?</p>\n" +
    "                                <input type=\"text\" ng-model=\"reviewText\" ng-required=\"true\">\n" +
    "                                <br/>\n" +
    "                                <p>How many stars?</p>\n" +
    "                                <span ng-repeat='star in starClasses track by $index'>\n" +
    "                            <span class=\"glyphicon glyphicon-star\" ng-class=\"star\" ng-click=\"setStars($index+1)\"></span>\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <button class='btn'>Submit</button>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageOffers.html',
    "<div ng-hide=\"offers.length\">\n" +
    "    <h4>There are no pending offers on your listings</h4>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<manage-offer-view ng-hide='showModal' currentUser='currentUser' status='status' info=\"offer\" accept-offer=\"acceptOffer(offerId,orderObj)\" ng-repeat='offer in offers' stripe-result='stripeResult'></manage-offer-view>\n" +
    "\n" +
    "<div>\n" +
    "    <script type=\"text/ng-template\" id=\"templateId\">\n" +
    "        \t<h3 style=\"text-align: center; color: white;\">Your order is processing</h3>\n" +
    "        \t<p style=\"text-align: center; color: white;\">Please hold on a few seconds</p>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "</div>"
  );


  $templateCache.put('app/account/manageAccount/manageProfile.html',
    "<div class=\"row\">\n" +
    "    <success-confirmation ng-show='success' text='edited profile!'></success-confirmation>\n" +
    "    <form ng-hide='success' class=\"col s12\" ng-submit=\"updateUser(currentUser)\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class='input-field col s4'>\n" +
    "                <img class='thumbnail' width = '100%' src='{{currentUser.picture}}'>\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-action-account-circle prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.name' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-communication-email prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.email' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s8\">\n" +
    "                <i class=\"mdi-communication-phone prefix\"></i>\n" +
    "                <input id=\"icon_telephone\" type=\"tel\" ng-model='currentUser.phoneNumber' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-create prefix\"></i>\n" +
    "                <textarea id=\"icon_prefix\" type=\"text\" ng-model='currentUser.description' class=\"validate\" />\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-mail prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.billAddy' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class=\"input-field col s12\">\n" +
    "                <i class=\"mdi-content-send prefix\"></i>\n" +
    "                <input id=\"icon_prefix\" type=\"text\" ng-model='currentUser.shipAddy' class=\"validate\">\n" +
    "            </div>\n" +
    "            <div class='col s6'>\n" +
    "                <button class='btn blue'>Submit Changes</button>\n" +
    "                <button type='button' class='btn red' ng-click='cancelChanges()'>Reset Form</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "       <h4 id='loginTitle'>Sign Up</h4>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <form class=\"form\" name=\"form\" ng-submit=\"register(form)\" novalidate>\n" +
    "\n" +
    "     \n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\">\n" +
    "          \n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='name' type=\"text\" class=\"validate\" ng-model=\"user.name\" required/>\n" +
    "            <label for='name' class='active'>Name</label>\n" +
    "          </div>\n" +
    "          <p class=\"help-block\" ng-show=\"form.name.$error.required && submitted\">\n" +
    "            A name is required\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "     <div class=\"form-group\" ng-class=\"{ 'has-success': form.username.$valid && submitted,\n" +
    "                                            'has-error': form.username.$invalid && submitted }\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='username' type=\"text\" class=\"validate\" ng-model=\"user.username\" required/>\n" +
    "            <label for=\"username\" class='active'>Username (lowercase and numbers only)</label>\n" +
    "          </div>\n" +
    "          <p class=\"help-block\" ng-show=\"form.username.$error.required && submitted\">\n" +
    "            A username is required - lowercase and numbers only, no spaces\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.username.$error.mongoose\">\n" +
    "            {{ errors.username }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\">\n" +
    "          \n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='email' type=\"email\" class=\"validate\" ng-model=\"user.email\" required mongoose-error/>\n" +
    "            <label for=\"email\" class='active'>Email</label>\n" +
    "          </div>                                   \n" +
    "\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.email && submitted\">\n" +
    "            Doesn't look like a valid email.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.required && submitted\">\n" +
    "            What's your email address?\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.email.$error.mongoose\">\n" +
    "            {{ errors.email }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\">\n" +
    "          <div class=\"input-field col s12\">\n" +
    "            <input name='password' type=\"password\" class=\"validate\" ng-model=\"user.password\" ng-minlength=\"3\"\n" +
    "                 required\n" +
    "                 mongoose-error>\n" +
    "            <label for=\"password\" class='active'>Password</label>\n" +
    "          </div>     \n" +
    "\n" +
    "          <p class=\"help-block\"\n" +
    "             ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">\n" +
    "            Password must be at least 3 characters.\n" +
    "          </p>\n" +
    "          <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n" +
    "            {{ errors.password }}\n" +
    "          </p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "          <button class=\"btn btn-inverse btn-lg btn-login\" type=\"submit\">\n" +
    "            Sign up\n" +
    "          </button>\n" +
    "         <!--\n" +
    "         <a class=\"btn btn-default btn-lg btn-register\" href=\"/login\">\n" +
    "            Login\n" +
    "          </a>\n" +
    "          -->\n" +
    "        </div>\n" +
    "\n" +
    "        <hr>\n" +
    "        <div>\n" +
    "          <a class=\"btn btn-facebook\" href=\"\" ng-click=\"loginOauth('facebook')\">\n" +
    "            <i class=\"fa fa-facebook\"></i> Connect with Facebook\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-google-plus\" href=\"\" ng-click=\"loginOauth('google')\">\n" +
    "            <i class=\"fa fa-google-plus\"></i> Connect with Google+\n" +
    "          </a>\n" +
    "          <a class=\"btn btn-twitter\" href=\"\" ng-click=\"loginOauth('twitter')\">\n" +
    "            <i class=\"fa fa-twitter\"></i> Connect with Twitter\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <hr>\n" +
    "</div>\n"
  );


  $templateCache.put('app/admin/admin.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "  <p>The delete user and user index api routes are restricted to users with the 'admin' role.</p>\n" +
    "  <ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"user in users\">\n" +
    "        <strong>{{user.name}}</strong><br>\n" +
    "        <span class=\"text-muted\">{{user.email}}</span>\n" +
    "        <a ng-click=\"delete(user)\" class=\"trash\"><span class=\"glyphicon glyphicon-trash pull-right\"></span></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );


  $templateCache.put('app/chat/chat.html',
    "\n" +
    "<div class=\"row chat section\">\n" +
    "      <div class=\"col l12 s12\" ng-controller=\"ChatCtrl\">\n" +
    "          <div class=\"card-panel pink lighten-5\"  ng-repeat=\"chat in chatList\">\n" +
    "            <h3 id='chatUsername'>{{chat.username}}</h3>\n" +
    "            <h4 id=\"chatText\">{{chat.textLine}}</h4>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-controller=\"ChatCtrl\" ng-show=\"isLoggedIn()\">\n" +
    " <div class=\"card-panel blue lighten-4\">\n" +
    "  <form ng-submit=\"addChat(newChatText)\">\n" +
    "\n" +
    "    <div class=\"input-field\">\n" +
    "\n" +
    "      <i class=\"mdi-editor-mode-edit prefix\"></i>\n" +
    "      <textarea id=\"icon_prefix2\" class=\"materialize-textarea\" ng-model=\"newChatText\"></textarea>\n" +
    "      <label for=\"icon_prefix2\">New Message</label>\n" +
    "\n" +
    "      <button type=\"submit\" class=\"btn btn-primary center-align\">Submit</button>\n" +
    "\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--\n" +
    " <input type='text' id='nameInput' placeholder='Name' >\n" +
    "    <input type='text' id='messageInput' placeholder='Message'>\n" +
    "\n" +
    "    <script>\n" +
    "    var myDataRef = new Firebase('https://cornerfind.firebaseio.com/');\n" +
    "      $('#messageInput').keypress(function (e) {\n" +
    "        if (e.keyCode == 13) {\n" +
    "          var name = $('#nameInput').val();\n" +
    "          var text = $('#messageInput').val();\n" +
    "          console.log(\"name: \", name)\n" +
    "          myDataRef.set('User ' + name + ' says ' + text);\n" +
    "          $('#messageInput').val('');\n" +
    "        }\n" +
    "      });\n" +
    "\n" +
    "      myDataRef.on('child_added', function(snapshot) {\n" +
    "        var message = snapshot.val();\n" +
    "        displayChatMessage(message.name, message.text);\n" +
    "      });\n" +
    "\n" +
    " function displayChatMessage(name, text) {\n" +
    "        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));\n" +
    "        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;\n" +
    "      };\n" +
    "    </script>\n" +
    "\n" +
    "<div id=\"#messagesDiv\" >\n" +
    "</div>\n" +
    " -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!--\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col l12\">\n" +
    "      <h1 class=\"page-header\">Chat</h1>\n" +
    "      <ul class=\"nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6\" ng-repeat=\"chat in chatlist\">\n" +
    "        <li><a href=\"#\">{{chat.username}}</a></li>\n" +
    "        <li><a href=\"#\">{{chat.textLine}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div> -->\n" +
    "\n" +
    "\n" +
    " <!--  <form class=\"chat-form\">\n" +
    "      <label>Comment</label>\n" +
    "      <p class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Your Name:\" ng-model=\"newChat.name\">\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Comment here...\" ng-model=\"newChat.text\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"addchat({newChat:newChat})\">Add New</button>\n" +
    "        </span>\n" +
    "\n" +
    "      </p>\n" +
    "  </form>\n" +
    "\n" +
    "</div> -->\n"
  );


  $templateCache.put('app/checkout/checkoutDirective/checkoutDirective.html',
    "<form name=\"checkoutForm\" ng-submit=\"checkout()\">\n" +
    "\n" +
    "    <div class='form-group'>\n" +
    "        <h5>Before putting in an offer, you must provide payment details. All offers expire after 24 hours, and your card <em>will not</em> be charged unless the seller accepts your bid within the 24 hour period.</h5>\n" +
    "    </div>\n" +
    "    <div class=\"form-panel\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input type=\"text\" class=\"form-control credit\" ng-model=\"ccinfo.number\" payments-validate=\"card\" payments-format=\"card\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>CVC</label>\n" +
    "                <input type=\"text\" class=\"form-control cvc\" ng-model=\"ccinfo.cvc\" payments-validate=\"cvc\" payments-format=\"cvc\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>Expiration</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"ccinfo.expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" ng-required=\"true\" placeholder='mm/yy'>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group center-align\">\n" +
    "        <button type=\"submit\" class=\"waves-effect waves-light btn blue darken-2\" ng-disabled=\"checkoutForm.$invalid\">Submit</button>\n" +
    "        <button type=\"button\" class=\"btn red darken-2\"  ng-click='showtoken =!showtoken'>Cancel</button>\n" +
    "    </div>\n" +
    "</form>"
  );


  $templateCache.put('app/components/success.view.html',
    "<div class=\"col s12\">\n" +
    "\t<h3>Successfully {{text}}</h3>\n" +
    "</div>"
  );


  $templateCache.put('app/easypost/easypost.html',
    "<div class=\"easy-post\">\n" +
    "    <div class=\"row\" ng-controller='EasypostCtrl'>\n" +
    "        <div class='col s12'>\n" +
    "            <div ng-show='badAddress' class=\"error\">\n" +
    "                <h4>Error Verifying Address:</h4>{{errorMessage}} Please re-renter your information.</div>\n" +
    "        </div>\n" +
    "        <form class=\"col s12\" ng-submit='saveAddress(address)' ng-model='address'>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"first_name\" type=\"text\" class=\"validate\" ng-model='address.name'>\n" +
    "                    <label class='active' for=\"first_name\">Full Name</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"address1\" type=\"text\" class=\"validate\" ng-model='address.street1'>\n" +
    "                    <label class='active' for=\"address1\">Address Line 1 (Street address, P.O. box, company name, etc.)</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"address2\" type=\"text\" class=\"validate\" ng-model='address.street2'>\n" +
    "                    <label class='active' for=\"address2\">Address Line 2 (Apartment., suite, unit, floor, etc.)</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s7\">\n" +
    "                    <input id=\"city\" type=\"text\" class=\"validate\" ng-model='address.city'>\n" +
    "                    <label class='active' for=\"city\">City</label>\n" +
    "                </div>\n" +
    "                <div class=\"input-field col s2\">\n" +
    "                    <input id=\"password\" type=\"text\" class=\"validate\" ng-model='address.state'>\n" +
    "                    <label class='active' for=\"password\">State</label>\n" +
    "                </div>\n" +
    "                <div class=\"input-field col s3\">\n" +
    "                    <input id=\"zipcode\" type=\"text\" class=\"validate\" ng-model='address.zip'>\n" +
    "                    <label class='active' for=\"zipcode\">Zip</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"phone\" type=\"text\" class=\"validate\" ng-model='address.phone'>\n" +
    "                    <label class='active' for=\"phone\">Phone Number</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col s12\">\n" +
    "                    <input id=\"email\" type=\"email\" class=\"validate\" ng-model='address.email'>\n" +
    "                    <label class='active' for=\"email\">Email</label>\n" +
    "                </div>\n" +
    "                <!-- <div class=\"input-field col s6\"> -->\n" +
    "                <button class=\"col s5 btn waves-effect waves-light red \" type=\"button\" name=\"action\" ng-class='buttonColor' ng-click='resetAddy()'>Clear Form\n" +
    "                </button>\n" +
    "                <!-- </div> -->\n" +
    "                <!-- <div class=\"input-field col s6\"> -->\n" +
    "                <button class=\" col s5 btn waves-effect waves-light right\" type=\"submit\" name=\"action\" ng-class='buttonColor'>Confirm\n" +
    "                </button>\n" +
    "                <!-- </div> -->\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/main/main.html',
    "\n" +
    "<div ng-include=\"'components/navbar/navbar.html'\" class=\"pink\"></div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"slider\">\n" +
    "    <ul class=\"slides\">\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424057659479dark_front_bench.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption center-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for all baby products</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424059325413dark_front_squares33.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption left-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for clothes, toys, books, cribs, strollers...</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <img src=\"http://cornerfind.s3-website-us-west-2.amazonaws.com/1424057894921dark_front_standing.jpg\"> <!-- random image -->\n" +
    "        <div class=\"caption right-align\">\n" +
    "          <h3>Welcome to Cornerfind!</h3>\n" +
    "          <h5 class=\"light grey-text text-lighten-3\">The marketplace for all baby products</h5>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      <div ng-show='loggedin' class=\"fixed-action-btn\" style=\"bottom: 45px; right: 24px;\">\n" +
    "          <a class=\"btn-floating btn-large arc-was-red\" ng-click=\"addProduct()\">\n" +
    "              <i class=\"large mdi-content-add\"></i>\n" +
    "          </a>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"input-field col l8 m9 s12\">\n" +
    "        <form class=\"form\" role=\"form\" ng-submit='searchSubmit(searchText)'>\n" +
    "            <i class=\"mdi-action-search prefix\"></i>\n" +
    "            <input type=\"text\" ng-model=\"searchText\" class=\"form-control btn-block\" id=\"searchbox\" ng-change=\"searchSubmit(searchText)\" ng-model-options=\"{debounce:500}\">\n" +
    "            <label for=\"icon_prefix\">Search</label>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "    <div ng-repeat=\"product in productList\">\n" +
    "        <div ng-switch='' on='$index % 3'>\n" +
    "            <div class=\"row\" ng-switch-when=\"0\">\n" +
    "                <product-card-view info=\"productList[$index+0]\" ng-show=\"productList[$index+0]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "\n" +
    "                <product-card-view info=\"productList[$index+1]\" ng-show=\"productList[$index+1]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "\n" +
    "                <product-card-view info=\"productList[$index+2]\" ng-show=\"productList[$index+2]\" class=\"col l4 m6 s12 list-unstyled\"></product-card-view>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/offer/offer.directive.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col s12 m12 l12\">\n" +
    "\n" +
    "        <!-- Main Card Content -->\n" +
    "        <div class=\"card blue lighten-3\" ng-hide=\"isBeingModified\">\n" +
    "\n" +
    "            <div class=\"card-content black-text\">\n" +
    "                <span class=\"card-title black-text\">Seller: {{::offer.sellerId.name}}</span>\n" +
    "                <ul>\n" +
    "                    <h5>Items in this offer:</h5>\n" +
    "                    <li ng-repeat='product in offer.lineItems'>\n" +
    "                        {{product.name}} - Listed Price: {{::product.productId.price | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <hr>\n" +
    "                <div>Offer Total: {{offer.orderTotal | currency}}</div>\n" +
    "                <div>Offer Status: {{offer.status}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-hide='statusCheck.status.indexOf(offer.status) > -1' class=\"card-action\" id=\"offer-card-action\">\n" +
    "                <button class='col s6 btn' ng-click=\"isBeingModified=true\">Modify Offer</button>\n" +
    "                <button type='button' class=' col s6 btn red darken-2' ng-click=\"cancelOffer({offerId: offer})\">Cancel Offer</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <button ng-show=\"statusCheck.status.indexOf(offer.status) > -1 && !offer.reviewed &&!finished\" class='btn' ng-click=\"review()\">Leave a Review!</button>\n" +
    "            <form ng-show='showReview && !offer.reviewed && !finished' ng-submit=\"submitReview()\">\n" +
    "                <div class=\"form-panel\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-7\">\n" +
    "                            <p>How was your experience with {{offer.buyerId.name}}?</p>\n" +
    "                            <input type=\"text\" ng-model=\"reviewText\" ng-required=\"true\">\n" +
    "                            <br/>\n" +
    "                            <p>How many stars?</p>\n" +
    "                            <span ng-repeat='star in starClasses track by $index'>\n" +
    "                            <span class=\"glyphicon glyphicon-star\" ng-class=\"star\" ng-click=\"setStars($index+1)\"></span>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button type='submit' class='btn'>Submit</button>\n" +
    "            </form>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        <!-- End Main Cart Content -->\n" +
    "\n" +
    "        <!-- Modify Order Form -->\n" +
    "        <div class=\"card  blue lighten-3\" ng-show=\"isBeingModified\">\n" +
    "            <div class=\"card-content black-text\">\n" +
    "                <span class=\"card-title black-text\">Change Your Offer</span>\n" +
    "                <ul>\n" +
    "                    <h3>Items in this offer:</h3>\n" +
    "                    <li ng-repeat='product in offer.lineItems'>\n" +
    "                        {{::product.productId.name}} - Listed Price: {{::product.productId.price | currency}}\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <hr style='border-top: black;'>\n" +
    "            </div>\n" +
    "            <div class=\"card-action\" id=\"offer-card-action\">\n" +
    "                <form name='offerForm'>\n" +
    "                    <div class=\"input-field col s12\">\n" +
    "                        <!--validation is hardcoded to orders with 1 item-->\n" +
    "                        <i class='tiny mdi-editor-attach-money prefix' style=\"color:black;\"></i>\n" +
    "                        <input id=\"modify-input\" name='offerCtrl' class='black-text validate' type='text' placeholder='00' ng-model='offer.orderTotal' ui-validate=\"'$value <= offer.lineItems[0].productId.price && $value>0 && $value %1 ===0 '\"></input>\n" +
    "                        <div ng-show=\"offerForm.$invalid && offerForm.offerCtrl.$touched\" class=\"col s12 center-align\">Offers must be whole dollar values less than or equal to the listed price.</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <button ng-disabled='!offerForm.$valid' class='btn col s6' ng-click=\"modifyOffer({offer: offer}); isBeingModified=false\">Submit</button>\n" +
    "                </form>\n" +
    "                <button type='button' ng-click=\"isBeingModified=false\" class='btn red darken-2 col s6'>Don't Modify</button>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- End Modify Form -->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/offer/offer.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class='container'>\n" +
    "\t<h1>Your Offers:</h1>\n" +
    "  <div class='row'>\n" +
    " \n" +
    "      <your-offer-view class=\"col s12 m12 l6\" offer=\"offer\" modify-offer=\"modifyOffer(offer)\" cancel-offer='cancelOffer(offerId)' toggle-form=\"toggleCard()\" ng-repeat='offer in offers'></your-offer-view>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/products/confirmOrder.html',
    "<div class=\"container confirm-order\">\n" +
    "    <div ng-hide='submitted' class=\"row center-align\">\n" +
    "        <div>\n" +
    "            <h3>Confirm Your Offer</h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col s12 m12 l12\">\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Product Information</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">{{order.lineItems[0].name}}</div>\n" +
    "\n" +
    "                <div class=\"col s12 center-align\">Offer: {{order.lineItems[0].purchasePrice | currency}}</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.oneProductView({id: prodId})' class='btn red darken-2 col s12 center-align '>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Payment Information</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">Card Type: {{cardInfo.cardType}} </div>\n" +
    "                <div class=\"col s12 center-align\">Last Four Digits: {{cardInfo.last4}}</div>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.stripeInfo({id: prodId})' class='btn red darken-2 col s12 center-align'>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <h5>Shipping Address</h5>\n" +
    "            </div>\n" +
    "            <div class=\"col s12 center-align\">\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.name}} </div>\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.street1}} {{shippingAddress.street2}} </div>\n" +
    "                <div class=\"col s12 center-align\">{{shippingAddress.city}} {{shippingAddress.state}} {{shippingAddress.zip}}</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <button ng-click=\"emitter()\" ui-sref='products.addressForm({id:prodId})' class='btn red darken-2 col s12 center-align'>Modify</button>\n" +
    "            <hr class='col s12'>\n" +
    "\n" +
    "\n" +
    "            <button id='submit' ng-disabled=\"clicked\" ng-click=\"submitOrder()\" class='col s12 center-align btn'>Submit Offer</button>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" ng-show='submitted'>\n" +
    "        <div class=\"col s12\">\n" +
    "            <h5>Sucess! Your offer has been submitted, and the seller now has 24 hours to respond. If your offer is accepted, your card will be charged {{order.lineItems[0].purchasePrice | currency}} and you will receive a confirmation email. Good luck!</h5> <!-- {{orderId}} -->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/oneProductView/oneProductView.html',
    "<div class=\"row oneProductView\" resizable>\n" +
    "    <div ng-class='isPinned(windowWidth)' class=\"col s12 l3 m12\">\n" +
    "        <div class=\"card #ea80fc purple accent-1\" ng-hide='showtoken'>\n" +
    "            <div class=\"card-content grey-text text-darken-4 row\" ng-hide='confirmationMenu'>\n" +
    "                <span class=\"col s12 productName grey-text text-darken-4\"> {{product.name}} </span>\n" +
    "                <!-- <div class=\"col s12\">Seller: {{product.userId.username}}</div> -->\n" +
    "                <p class=\"col s12 desc grey-text text-darken-4\">{{product.desc}} </p>\n" +
    "                <div class='col s12'>\n" +
    "                    <h4 class=\"price\">List:  ${{product.price}} </h4>\n" +
    "                    <h4 class=\"strike\">Retail: ${{product.retailPrice}}</h4>\n" +
    "                </div>\n" +
    "                <div ng-hide='boughtItem' class='col s12'>\n" +
    "                    <form name='offerForm'>\n" +
    "                        <div class='input-field col s12'>\n" +
    "                            <i class='tiny mdi-editor-attach-money prefix'></i>\n" +
    "                            <input type='text' name='offer' class='validate' ng-model='offerPrice' placeholder='Your Offer Here' ui-validate=\"'$value <= product.price && $value > 0 && $value %1 === 0'\"></input>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"offerForm.$invalid && offerForm.offer.$touched\"class=\"col s12 center-align\">Offers must be whole dollar values less than or equal to the listed price.</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button ng-disabled='!offerForm.$valid' ng-click=\"submitOffer(offerPrice)\" class=\"offerButton col s8 offset-s2 waves-effect btn blue lighten-2 grey-text text-darken-4\"><i class=\"mdi-action-shopping-cart\"></i> &nbsp Offer</button>\n" +
    "                <form>\n" +
    "\n" +
    "                <a class=\"col s12 userLink blue-grey-text darken-4 btn-flat center-align\" ng-click='userRedirect()'>More From {{product.userId.username}}</a>\n" +
    "\n" +
    "             </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <!-- <button ng-click=\"userRedirect()\" class=\"col s12 waves-effect btn blue lighten-2 grey-text text-darken-4\">More from {{product.userId.username}}\n" +
    "        </button> -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col l6 offset-l6 s12 m12\">\n" +
    "        <div class='row'>\n" +
    "            <div ng-repeat=\"onePhotoUrl in product.photoUrls\">\n" +
    "                <div class='col l6 m6 s12 center'>\n" +
    "                    <img class=\"responsive-img\" src=\"{{onePhotoUrl}}\" />\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-controller='OneProductViewCtrl'>\n" +
    "            <chat chatlist='chatlist' addchat='addChat(newChat)'></chat>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/products/productCardView/productCardView.html',
    "<div class='productCard'>    \n" +
    "    <div class=\"card-directive\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12 m12 l12\">\n" +
    "                <div class=\"card\">\n" +
    "          \n" +
    "                    <a ng-href='products/{{product._id}}'>\n" +
    "                        <div class=\"card-image\">\n" +
    "                            <img ng-src=\"{{product.photoUrls[0]}}\">\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"card-action\" id=\"productSubtitle\">\n" +
    "                            <h6 class=\"username\"><a href='/users/{{product.userId.username}}'>by {{product.userId.username}}</a></h6>\n" +
    "                            <h3 class=\"productName\">{{product.name}}</h3>\n" +
    "                            <h3 class=\"productName\"><em>Condition:</em> {{product.condition}}</h3>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"card-action\" id=\"productDescInCard\">\n" +
    "                            <p class=\"description\">{{product.desc}}</p>\n" +
    "                            <h4 class='price'>{{product.price | currency:undefined:0}}</h4>\n" +
    "                            <h4 class='strike'>{{product.retailPrice | currency:undefined:0}}</h4>\n" +
    "                        </div>\n" +
    "                    </a>\n" +
    "\n" +
    "                    <div class=\"card-action\" id=\"productFavInCard\">\n" +
    "                        <div>\n" +
    "                            <a><i class='mdi-action-favorite' id='favoriteIcon' ng-class=\"{favorited: favorited}\" ng-click=\"toggleFavorite()\"></i></a>\n" +
    "                            <p id='productFavoriteDisplay'>{{likeText}}</p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/products.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "<div class='container'>\n" +
    "\t<div ng-show='stateName && !submitted' class='center-align'>\n" +
    "\t\t<!-- <div  ng-hide='submitted' class='center-align'> -->\n" +
    "\t\tStep 1: <a ui-sref='products.stripeInfo({id: prodId})'>Payment Info</a> --\n" +
    "\t\tStep 2: <a ui-sref='products.addressForm({id: prodId})'>Shipping Address</a> --\n" +
    "\t\tStep 3: <a ui-sref='products.confirmOrder({id: prodId})'>Confirm Offer</a>\n" +
    "\t</div>\n" +
    "\t<div ui-view></div>\n" +
    "</div>"
  );


  $templateCache.put('app/products/stripeForm.html',
    "<div class='col s12' >\n" +
    "    <form name=\"checkoutForm\" ng-submit=\"checkout()\">\n" +
    "\n" +
    "    <div class='form-group'>\n" +
    "        <h5>Before putting in an offer, you must provide payment details. All offers expire after 24 hours, and your card <em>will not</em> be charged unless the seller accepts your bid within the 24 hour period.</h5>\n" +
    "    </div>\n" +
    "    <div class=\"form-panel\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col s12\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input type=\"text\" class=\"form-control credit\" ng-model=\"ccinfo.number\" payments-validate=\"card\" payments-format=\"card\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>CVC</label>\n" +
    "                <input type=\"text\" class=\"form-control cvc\" ng-model=\"ccinfo.cvc\" payments-validate=\"cvc\" payments-format=\"cvc\" payments-type-model=\"type\" ng-required=\"true\">\n" +
    "                <br/>\n" +
    "                <label>Expiration</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"ccinfo.expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" ng-required=\"true\" placeholder='mm/yy'>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group center-align\">\n" +
    "        <button type=\"submit\" class=\"waves-effect waves-light btn blue darken-2\" ng-disabled=\"checkoutForm.$invalid\">Submit</button>\n" +
    "        <button type=\"button\" class=\"btn red darken-2\" ui-sref='products.oneProductView({id:prodId})'>Cancel</button>\n" +
    "    </div>\n" +
    "</form>\n" +
    "</div>"
  );


  $templateCache.put('app/profile/profile.html',
    "<div class=\"container\">\n" +
    "  This is the Profile View\n" +
    "  <p>The delete user and user index api routes are restricted to users with the 'admin' role.</p>\n" +
    "  <ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"user in users\">\n" +
    "        <strong>{{user.name}}</strong><br>\n" +
    "        <span class=\"text-muted\">{{user.email}}</span>\n" +
    "        <a ng-click=\"delete(user)\" class=\"trash\"><span class=\"glyphicon glyphicon-trash pull-right\"></span></a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>"
  );


  $templateCache.put('app/review/review.html',
    "<div>this is the review directive</div>"
  );


  $templateCache.put('app/sidenav/brandSidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='brands' class=\"md-sidenav-left\">\n" +
    "    <h1>Brands</h1>\n" +
    "  <ul >\n" +
    "    <li ng-click=\"onItemClick({selection: item})\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/categorySidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='categories' class=\"md-sidenav-left\">\n" +
    "    <h1>Categories</h1>\n" +
    "    <h4>Click to add or remove</h4>\n" +
    "  <ul>\n" +
    "    <li ng-class='toggleActive(item.name)'ng-init\"toggleActive()\" ng-click=\"onItemClick({selection: item}) ; toggleActive()\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/conditionSidenav.html',
    "<div layout=\"row\">\n" +
    "  <md-sidenav class='col l4 m6 s8' md-component-id='conditions' class=\"md-sidenav-left\">\n" +
    "    <h1>Condition</h1>\n" +
    "  <ul>\n" +
    "    <li ng-click=\"onItemClick({selection: item})\" ng-repeat='item in selection'>{{item.name}}</li>\n" +
    "  </ul>\n" +
    "  </md-sidenav>\n" +
    "  <md-content>\n" +
    "    <md-button type='button' class='btn purple' ng-click=\"openLeftMenu()\">\n" +
    "      {{buttonText}}\n" +
    "    </md-button>\n" +
    "\n" +
    "  </md-content>\n" +
    "</div>"
  );


  $templateCache.put('app/sidenav/userSidenav.html',
    ""
  );


  $templateCache.put('app/users/add_product/add_product.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "<!-- need to workout conflicts with this and sidenavs -->\n" +
    "\n" +
    "<script>\n" +
    "$(document).ready(function() {\n" +
    "    $('ul.tabs').tabs();\n" +
    "});\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class='row'>\n" +
    "        <div>\n" +
    "            <h5><i class=\"mdi-action-loyalty\"></i> Add a Product</h5>\n" +
    "            <h6><i class='mdi-action-star-rate'></i> = Required Field</h4h6>\n" +
    "        </div>\n" +
    "          \n" +
    "        <br></br>\n" +
    "        <div class=\"row\">\n" +
    "          <form name='addProductForm' class=\"col l8 m7 s12\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col l12 m12 s12\">\n" +
    "                  <label class=\"custom-file-upload btn btn-primary purple lighten-2\">\n" +
    "                        <input id=\"file-upload\" type=\"file\" capture='camera' accept=\"image/*\" onchange=\"angular.element(this).scope().upload()\"></input>\n" +
    "                        <i class=\"mdi-image-add-to-photos\"></i> Upload Photos\n" +
    "                  </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\"> \n" +
    "                <div class=\"col l12 m12 s12\">\n" +
    "                    <div class='col s12 m6 l6' ng-repeat='photo in newProduct.photoUrls'>\n" +
    "                        <img class='uploadWidth' ng-src=\"{{photo}}\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <input id=\"productName\" name='name' type=\"text\" class=\"validate\" ng-model='newProduct.name' ng-required=\"true\">\n" +
    "                <label for=\"productName\">Product Name *</label>\n" +
    "\n" +
    "                <span ng-show='addProductForm.name.$error.required && addProductForm.name.$touched'>Requires product name</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\">  \n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <input id=\"description\" name='desc' type=\"text\" class=\"validate\" ng-model=\"newProduct.description\" ng-required='true'ui-validate=\"'$value.length > 10'\">\n" +
    "                <label for=\"description\" >Desciption *</label>\n" +
    "\n" +
    "                 <span ng-show='addProductForm.desc.$error.required && addProductFor.desc.$touched'>Requires product description</span>\n" +
    "                 <span ng-show='addProductForm.desc.$invalid && addProductForm.desc.$touched'>Description needs to be longer than 10 characters</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"input-field col l12 m12 s12\">\n" +
    "                <button type='brand' ng-click='chooseBrand()' class='col s12 m12 l12 btn btn-primary light-blue'>{{brandButton}}</button>\n" +
    "                <div ng-show='showBrands' class=\"row\">\n" +
    "                    <div class=\"col s12\">\n" +
    "                        <ul ng-repeat='brand in availableBrands' class=\"tabs\">\n" +
    "                            <li class=\"tab col s3\"><a ng-click='selectBrand(brand.name)'>{{brand.name}}</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col l12 m12 s12\">\n" +
    "                    <button ng-click='chooseCategory()' class='col s12 m12 l12 btn btn-primary purple lighten-1'>{{categoryButton}} </button>\n" +
    "                    <div ng-show='showCategories' class=\"row\">\n" +
    "                        <div class=\"col s12\">\n" +
    "                            <ul ng-repeat='category in availableCategories' class=\"tabs\">\n" +
    "                                <li class=\"tab col s3\"><a ng-click='selectCategory(category.name)'>{{category.name}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"input-field col l12 m12 s12\">\n" +
    "                <button ng-click='chooseCondition()' class='col s12 m12 l12 btn btn-primary green lighten-1'>{{conditionButton}}</button>\n" +
    "                    <div ng-show='showConditions' class=\"row\">\n" +
    "                        <div class=\"col s12\">\n" +
    "                            <ul ng-repeat='condition in availableConditions' class=\"tabs\">\n" +
    "                                <li class=\"tab col s3\"><a ng-click='selectCondition(condition.name)'>{{condition.name}}</a>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">  \n" +
    "              <div class=\"input-field col l6 m6 s6\">\n" +
    "                <i class='mdi-editor-attach-money prefix'></i>\n" +
    "                <input id=\"retailPrice\" name='retailPrice' type=\"tel\" class=\"validate\" ng-model=\"newProduct.retailPrice\" ng-required=\"true\" ng-pattern=\"/^[1-9]\\d*$/\">\n" +
    "                <label for=\"retailPrice\">Retail Price*</label>\n" +
    "                <span ng-show='addProductForm.retailPrice.$error.pattern'>Prices must be a positive number</span> \n" +
    "                <span ng-show='addProductForm.retailPrice.$error.required && addProductForm.retailPrice.$touched'>Requires retail price</span>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"input-field col l6 m6 s6\">\n" +
    "                <i class='mdi-editor-attach-money prefix'></i>\n" +
    "                <input id=\"price\"name='price' type=\"tel\" class=\"validate\" ng-model=\"newProduct.price\" ng-required=\"true\" ng-pattern=\"/^[1-9]\\d*$/\">\n" +
    "                <label for=\"price\">Selling Price*</label>\n" +
    "\n" +
    "                <span ng-show='addProductForm.price.$error.pattern && addProductForm.price.$touched'>Prices must be a positive number</span> \n" +
    "                <span ng-show='addProductForm.price.$error.required && addProductForm.price.$touched'>Requires retail price</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col s12\">\n" +
    "               <button ng-click='addProduct(newProduct)' class='btn btn-primary' ng-disabled=\"addProductForm.$invalid\">Add Product</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/followers/followers.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <h4>{{user.username}}'s Followers</h4>\n" +
    "    <br>\n" +
    "   <div class=\"col s12 m8 offset-m2 l6 offset-l3\" ng-repeat='user in user.followers'>\n" +
    "        <div class=\"card-panel purple lighten-3 z-depth-1\" id='followerCard'>\n" +
    "          <div class=\"row valign-wrapper\">\n" +
    "            <div class=\"col s2\">\n" +
    "              <img src=\"{{user.picture}}\" alt=\"\" class=\"circle responsive-img profile\"> <!-- notice the \"circle\" class -->\n" +
    "            </div>\n" +
    "            <div class=\"col s10\">\n" +
    "              <span class=\"black-text\">\n" +
    "                <h5>{{user.username}}</h5>\n" +
    "                <h6>{{user.description}}</h6>\n" +
    "                 <h6>Blog: <a href='{{user.blog}}'>{{user.blog}}</a></h6>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/followers/following.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <h4>{{user.username}}'s Following</h4>\n" +
    "    <br>\n" +
    "   <div class=\"col s12 m8 offset-m2 l6 offset-l3\" ng-repeat='user in user.following'>\n" +
    "        <div class=\"card-panel purple lighten-3 z-depth-1\" id='followerCard'>\n" +
    "          <div class=\"row valign-wrapper\">\n" +
    "            <div class=\"col s2\">\n" +
    "              <img src=\"{{user.picture}}\" alt=\"\" class=\"circle responsive-img profile\"> <!-- notice the \"circle\" class -->\n" +
    "            </div>\n" +
    "            <div class=\"col s10\">\n" +
    "              <span class=\"black-text\">\n" +
    "                <h5>{{user.username}}</h5>\n" +
    "                <h6>{{user.description}}</h6>\n" +
    "                <h6>Blog: <a href='{{user.blog}}'>{{user.blog}}</a></h6>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</div>\n"
  );


  $templateCache.put('app/users/users.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div>\n" +
    "\n" +
    "\n" +
    "<div class='userview'>\n" +
    "<div class=\"container\" ng-controller=\"UsersCtrl\" resizable>\n" +
    "    <div class=\"row\">\n" +
    "        <div ng-class='isPinned(windowWidth)' class=\"col s12 l3 m12\">\n" +
    "            <div class=\"card #ea80fc purple accent-1\">\n" +
    "                <div class=\"card-content  grey-darken-4-text \">\n" +
    "                    <div class='profile'>\n" +
    "                        <img class=\"responsive-img circle profile\" src=\"{{user.picture}}\">\n" +
    "                        <p class=\"card-title grey-text text-darken-4\" id=\"username\">{{user.username}} </p>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <p id='aboutMeTitle'>About me:</p>\n" +
    "                    <p id='aboutMeText'>{{user.description}} </p>\n" +
    "                    <p id='aboutMeBlog'>Blog: <a href='{{user.blog}}'> {{user.blog}}</a> </p>\n" +
    "                    <br/>\n" +
    "\n" +
    "                        <table id='tableStats'>\n" +
    "                            <thead id='theadintable'>\n" +
    "                                <tr>\n" +
    "                                    <th class='tableTitle' data-field=\"listing\">Listings</th>\n" +
    "                                    <th class='tableTitle' data-field=\"followers\">Followers</th>\n" +
    "                                    <th class='tableTitle' data-field=\"following\">Following</th>\n" +
    "                                </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                                <tr>\n" +
    "                                    <td class='tableData'>{{user.listedProducts.length}}</td>\n" +
    "                                    <td class='tableData'><a href='/users/{{user.username}}/followers'>{{user.followers.length}}</a></td>\n" +
    "                                    <td class='tableData'><a href='/users/{{user.username}}/following'>{{user.following.length}}</a></td>\n" +
    "                                </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"section followingButtons\">\n" +
    "                        <a ng-click='toggleFollow()' class=\"waves-effect btn blue lighten-2 grey-text text-darken-4 followText\">\n" +
    "                            <i class=\"mdi-action-favorite-outline\"></i> &nbsp {{toggleText}}\n" +
    "                            <i ng-show='followed' class='mdi-action-done'></i>\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-click='showReviews()' class=\"waves-effect waves-purple btn blue lighten-2 grey-text text-darken-4 sellerFeedback\"><i class=\"mdi-action-face-unlock\"></i>&nbsp {{buttonText}}</a>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div ng-show='review' class=\"card pink lighten-3\">\n" +
    "                <div ng-repeat='review in reviews' class=\"card-content grey-text text-darken-4\">\n" +
    "                    <img class=\"responsive-img profile circle\" src=\"{{review.reviewingUserId.picture}}\">\n" +
    "                    <p class=\"card-title grey-text text-darken-4\" id=\"username\">{{review.reviewingUserId.username}}</p>\n" +
    "                    <p id='reviewText'>{{review.text}} </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row col s12 m6 l6 offset-l6\">\n" +
    "            <ul class=\"col l12 m12 s12 list-unstyled\" ng-repeat=\"product in productList\">\n" +
    "                <product-card-view info=\"product\"></product-card-view>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('components/footer/footer.html',
    "<footer class=\"page-footer #ea80fc purple accent-1 site-footer\" >\n" +
    "     <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col l4 s12\">\n" +
    "                <h5 class=\"white-text\">Contact Us</h5>\n" +
    "                 <p><a class=\"grey-text text-lighten-3\" href=\"/about\">About Us</a></p>\n" +
    "                <p><a class=\"grey-text text-lighten-4\" href=\"mailto:sayHello@cornerfind.com\">sayHello@cornerFind.com</a></p>\n" +
    "                <p><a class=\"grey-text text-lighten-3\" href=\"/logins\">Login</a></p>\n" +
    "                <a class=\"grey-text text-lighten-3\" href=\"/signup\">Sign Up</a>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"footer-copyright\">\n" +
    "        <div class=\"container\">\n" +
    "               © 2015 CornerFind.com\n" +
    "            <div class=\"grey-text text-lighten-4 right\" >All rights reserved</div>\n" +
    "            <br>\n" +
    "            <br>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</footer>\n"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=\"modal-header\">\n" +
    "  <button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button>\n" +
    "  <h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p>\n" +
    "  <div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button>\n" +
    "</div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div resizable class=\"navbar navbar-default navbar-static-top purple accent-1\"  ng-controller=\"NavbarCtrl\">\n" +
    " <!--  <div class=\"container\"> -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button class=\"navbar-toggle\" type=\"button\" ng-click=\"isCollapsed = !isCollapsed\">\n" +
    "        <span class=\"navbar-text sr-only\" id=\"whiten\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a href=\"/\" class=\"navbar-brand\" id=\"whiten\"><img src=\"assets/images/logo_cornerfind.png\" width=\"42\"/>&nbsp <div id='appname'>Cornerfind</div></a>\n" +
    "    </div>\n" +
    "    <div collapse=\"isCollapsed\" class=\"navbar-collapse collapse\" id=\"navbar-main\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <!-- keeping below line for ng-class reference\n" +
    "        <li ng-repeat=\"item in menu\" ng-class=\"{active: isActive(item.link)}\">\n" +
    "        </li>\n" +
    "        -->\n" +
    "\n" +
    "        <!--dropdowns-->\n" +
    "\n" +
    "        <!-- CATEGORY DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if=\"!smallerThan768()\" class=\"btn-group\" dropdown is-open=\"status.openCategories\">\n" +
    "              <a  class =\"whiten\" id='custom-dropdown' ng-mouseover='toggleCategories($event)' ng-mouseleave='toggleCategories($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                Categories <span class=\"caret\"></span>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\"  ng-mouseleave='toggleCategories($event)'>\n" +
    "                <li  ng-repeat='category in categoryList'><a ng-click='categoryEmit(category.name)' ng-click='categoryEmit(category.name)'>{{category.name}}</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleCategories()' dropdown is-open=\"status.openCategories\">\n" +
    "              <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                Categories <span class=\"caret\"></span>\n" +
    "              </a>\n" +
    "              <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                <li  ng-repeat='category in categoryList'><a ng-click='categoryEmit(category.name)'>{{category.name}}</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "        <!-- BRAND DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if='!smallerThan768()' class=\"btn-group\" dropdown is-open=\"status.openBrands\">\n" +
    "            <a  class='whiten' id='custom-dropdown' ng-mouseover='toggleBrands($event)' ng-mouseleave='toggleBrands($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Brands <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-mouseleave='toggleBrands($event)'>\n" +
    "              <li ng-repeat='brand in brandList'><a ng-click='brandEmit(brand.name)'>{{brand.name}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleCategories()' dropdown is-open=\"status.openBrands\">\n" +
    "            <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Brands <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "              <li  ng-repeat='brand in brandList'><a ng-click='brandEmit(brand.name)'>{{brand.name}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "        <!-- Gender DROPDOWN -->\n" +
    "        <li ng-controller='DropdownCtrl'>\n" +
    "          <div ng-if='!smallerThan768()' class=\"btn-group\" dropdown is-open=\"status.openGenders\">\n" +
    "            <a  class='whiten' id='custom-dropdown' ng-mouseover='toggleGenders($event)' ng-mouseleave='toggleGenders($event)' dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Gender <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" ng-mouseleave='toggleGenders($event)'>\n" +
    "              <li ng-repeat='gender in genderList'><a ng-click='genderEmit(gender)'>{{gender}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"smallerThan768()\" class=\"btn-group\" ng-click='toggleGenders()' dropdown is-open=\"status.openGenders\">\n" +
    "            <a  class =\"whiten\" id='custom-dropdown'  dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              Gender <span class=\"caret\"></span>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "              <li  ng-repeat='gender in genderList'><a ng-click='genderEmit(gender)'>{{gender}}</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "        <!--end dropdowns-->\n" +
    "\n" +
    "        <li ng-show=\"isAdmin()\" ng-class=\"{active: isActive('/admin')}\"><a href=\"/admin\">Admin</a></li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/signup')}\"><a ui-sref=\"signup\" id='whiten'>Sign up</a></li>\n" +
    "        <li ng-hide=\"isLoggedIn()\" ng-class=\"{active: isActive('/login')}\"><a ui-sref=\"login\" id='whiten'>Login</a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><p id='whiten' class=\"navbar-text\">Hi {{currentUser.name}}!</p> </li>\n" +
    "        <!-- <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a class='whiten' id='whiten' ui-sref=\"offer\">Your Offers</a></li> -->\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/settings')}\"><a ui-sref='account'><span class=\"glyphicon glyphicon-cog whiten\"></span></a></li>\n" +
    "        <li ng-show=\"isLoggedIn()\" ng-class=\"{active: isActive('/logout')}\"><a class='whiten' id='whiten' href=\"\" ng-click=\"logout()\">Logout</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "<!--   </div> -->\n" +
    "</div>\n"
  );

}]);

