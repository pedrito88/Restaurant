//retrieve library data and populate on page load
var app = angular.module("restBrowseApp", []);

app.controller("ctrl", function ($scope, $http) {
    $scope.reviews = [];
    $scope.locations = [];
    $scope.get_reviews = function () {

        $http({
            method: "get",
            url: resURL + '/read-records'
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.reviews = response.data.reviews;
                $scope.locations = getLocations(response.data.reviews);
                $scope.selectedLocation = $scope.locations[0];
            } else {
                console.log(response.data.msg);
            }

        }, function (response) {
            console.log(response);
        });

    };

    $scope.get_reviews();

    $scope.redrawTable = function () {
        var location = $scope.selectedLocation.value;

        $http({
            method: "get",
            url: resURL + '/get-reviewsBYType',
            params: {
                location: location
            }
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.reviews = response.data.reviews;
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    }

    $scope.deleteReview = function (reviewId) {
        $http({
            method: "delete",
            url: resURL + '/delete-records',
            params: {
                reviewId: reviewId
            }

        }).then(function (response) {

            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        });
    }

    $scope.editReview = function (reviewNumber) {
        $scope.reviewId = $scope.reviews[reviewNumber]["_id"];
        $scope.RestaurantName = $scope.reviews[reviewNumber].RestaurantName;
        $scope.foodType = $scope.reviews[reviewNumber].foodType;
        $scope.location = $scope.reviews[reviewNumber].location;
        $scope.criticRating = $scope.reviews[reviewNumber].criticRating;
        $scope.patronRating = $scope.reviews[reviewNumber].patronRating;

        $scope.hideTable = true;
        $scope.hideForm = false;
    }

    $scope.updateReview = function () {
        $http({
            method: "put",
            url: resURL + '/update-review',
            data: {
                reviewId: $scope.reviewId,
                RestaurantName: $scope.RestaurantName,
                foodType: $scope.foodType,
                location: $scope.location,
                criticRating: $scope.criticRating,
                patronRating: $scope.patronRating

            }
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.redrawTable();
                $scope.closeForm();

            } else {
                console.log(response.data.msg);
            }
        }, function (response) {
            console.log(response);
        })
    }


    $scope.closeForm = function () {
        $scope.hideForm = true;
        $scope.hideTable = false;

        $scope.RestaurantName = "";
        $scope.foodType = "";
        $scope.location = "";
        $scope.effect = "";
        $scope.criticRating = "";
        $scope.patronRating = "";
    }



});

function getLocations(reviewDataArray) {
    var locationExists;

    var locationsArray = [{
        value: "",
        display: "ALL"
    }];
    for (var i = 0; i < reviewDataArray.length; i++) {
        locationExists = locationsArray.find(function (element) {
            return element.value === reviewDataArray[i].location;
        })

        if (locationExists) {
            continue;
        } else {
            locationsArray.push({
                value: reviewDataArray[i].location,
                display: reviewDataArray[i].location.toUpperCase()
            });
        }
    }

    return locationsArray;

}
