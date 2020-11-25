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
//******   uncomment below. This is the new code i had done for the delete
$('.deleteButton').click(function () {
    var itemID = this.getAttribute("data-id");

    $.ajax({
        url: resURL + '/delete-records',
        type: 'delete',
        data: {
            ID: itemID
        },
        success: function () {
            $.ajax({
                url: resURL + '/read-records',
                type: 'get',
                success: function (response) {
                    var data = jQuery.parseJSON(response);
                    console.log(data);
                    createRestaurantTable(data);
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
    });

});
// end of new stuff

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
        tableHTML += "<td>" + '<button class="deleteButton" data-id=" + restaurantData[i].ID + ">DELETE</button>' + "</td>";
        tableHTML += "</tr>";
    }
    $('#restaurantTable').html(tableHTML);
}
