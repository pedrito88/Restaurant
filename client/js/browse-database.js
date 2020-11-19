//retrieve library data and populate on page load

    $.ajax({
        url: resURL + '/read-records',
        type: 'get',
        success: function (response) {
            var data = jQuery.parseJSON(response);
            createRestaurantTable(data);
        },
        error: function (err) {
            alert(err);
        }
    });


function createRestaurantTable(restaurantData) {
    var tableHTML = "";
    for (var i = 0; i < restaurantData.length; i++) {
        tableHTML += "<tr>";
        tableHTML += "<td>" + restaurantData[i].ID + "</td>";
        tableHTML += "<td>" + restaurantData[i].RestaurantName + "</td>";
        tableHTML += "<td>" + restaurantData[i].foodType + "</td>";
        tableHTML += "<td>" + restaurantData[i].location + "</td>";
        tableHTML += "<td>" + restaurantData[i].criticRating + "</td>";
        tableHTML += "<td>" + restaurantData[i].patronRating + "</td>";
        tableHTML += "</tr>";
    }
    $('#restaurantTable').html(tableHTML);
}