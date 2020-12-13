//create a JQuerey listener that waits for the user to enter Submit

$('#data-submit').click(function () {
    var RestaurantName = $('#RestaurantName').val();
    var foodType = $('#foodType').val();
    var location = $('#location').val();
    var criticRating = $('#criticRating').val();
    var patronRating = $('#patronRating').val();

    var newReview = {
        RestaurantName: RestaurantName,
        foodType: foodType,
        location: location,
        criticRating: criticRating,
        patronRating: patronRating
    };

    $.ajax({
        url: resURL + "/write-record",
        type: "post",
        data: newReview,
        success: function (response) {
            alert(response);
        },
        error: function (err) {
            alert(err);
        }
    });
});
