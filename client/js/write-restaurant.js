
//create a JQuerey listener that waits for the user to enter Submit

    $('#data-submit').click(function () {
        var RestaurantName = $('#RestaurantName').val();
        var foodType = $('#foodType').val();
        var location = $('#location').val();
        var criticRating = $('#criticRating').val();
        var patronRating = $('#patronRating').val();

        var d = new Date();
        var ID = "lib" + d.getTime();

        var jsonString = JSON.stringify({
            ID: ID,
            RestaurantName: RestaurantName,
            foodType: foodType,
            location: location,
            criticRating: criticRating,
            patronRating: patronRating
        });

        $.ajax({
            url: resURL + "/write-record",
            type: "post",
            data: {
                data: jsonString
            },
            success: function (response) {
                alert(response);
            },
            error: function (err) {
                alert(err);
            }
        });
    });
