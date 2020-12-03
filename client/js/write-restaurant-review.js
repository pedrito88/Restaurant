var review = [];
var activeReview = 0;

var app = angular.module("App", []);

app.controller("ctrl", function ($scope, $http) {
    $scope.obj = [];

    $scope.get_reviews = function () {

        $http({
            method: "get",
            url: 'http://localhost:6200/read-records'
        }).then(function (response) {

            review = response.data;
            $scope.obj = review[activeReview];
            $scope.showHide();

        }, function (response) {

            console.log(response);

        });

    };

    $scope.get_reviews();

    $scope.changeReview = function (direction) {
        activeReview += direction;
        $scope.obj = review[activeReview];
        $scope.showHide();
    }

    $scope.showHide = function () {
        $scope.hidePrev = (activeReview === 0) ? true : false;
        $scope.hideNext = (activeReview === review.length - 1) ? true : false;
    }

});
