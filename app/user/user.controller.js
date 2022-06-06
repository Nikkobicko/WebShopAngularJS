angular.module("user").controller("userController", ["$scope", "$location", "$http", "appServiceFactory", "userFactoryService", "loginServiceFactory","productServiceFactory"
    ,function ($scope, $location, $http, appServiceFactory, userFactoryService, loginServiceFactory, productServiceFactory) {

    var user;
    var userOrders;
    $scope.totalAmount1 = 0;

        var init = function () {
            var userId = loginServiceFactory.getCustomerId();
            if (!userId){
                $location.url("/login");
            }
            else
            {
                userFactoryService.getUserOrders(userId).then(function (response) {

                    userOrders = response.data;
                    var orderProducts = [];
                    var allProducts = [];

                    angular.forEach(userOrders, function (order) {
                        orderProducts.push(order.products);
                    });

                    productServiceFactory.getProductsByCategoryId().then(function (response) {
                        allProducts = response.data;
                        var total = 0;
                        angular.forEach(orderProducts, function (op) {
                            angular.forEach(allProducts, function (p) {
                                if (op[0].productId == p.id) {
                                    total += (p.price * op[0].quantity);
                                }
                            });
                        });
                        $scope.totalAmount1 = total;
                    });

                    $scope.userOrders = userOrders;
                });
            }
        };

        init();


    userFactoryService.getUserInfo(loginServiceFactory.getCustomerId()).then(function (response) {
        $scope.userForm = response.data;

    });

    $scope.updateUser = function () {


        let userId = loginServiceFactory.getCustomerId(); //todo null check
        //userInfo.id=userId;
        $scope.userForm.id = userId;


        userFactoryService.updateUserInfo(userId,  $scope.userForm).then(function (response) {

            delete $scope.userForm['password'];
            loginServiceFactory.setCustomer($scope.userForm);
               });
    };

    $scope.showDetailInfo = function (id) {
        $location.path("/order-details/" + id);
    }

}]);

