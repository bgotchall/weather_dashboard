//open weather API key: 69edebd1b8d3d2f77fe9b147a59750e6

//api.openweathermap.org/data/2.5/weather?q={Austin}
//https://api.openweathermap.org/data/2.5/weather?q=Austin,us&appid=69edebd1b8d3d2f77fe9b147a59750e6

var api_key = "69edebd1b8d3d2f77fe9b147a59750e6";
console.log(this);
var api_key_new = "a75b97241f920de6dae72d5abae96dcb";
var today = new Date();
$("#todays-date").text("(" + (today.getMonth()+1) +'/'+ today.getDate()+ '/'+today.getFullYear()+")");

var city_to_search = "Austin";
var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city_to_search +
    ",us&appid=" +
    api_key;
var UVqueryURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
var forecastURL =
    "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}";
var my_temp = 0;
var todays_date = 0;
var lat = 0; //lattitude from searched city
var lon = 0; //longitude from searched city

function update(city) {
    queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        ",us&appid=" +
        api_key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#city-name").text(response.name);
        my_temp = response.main.temp;
        my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
        $("#temperature").text(my_temp);
        $("#humidity").text(my_temp);
        $("#wind-speed").text(response.wind.speed);
        lat = response.coord.lat;
        lon = response.coord.lon;
        var my_code=response.weather[0].icon;
        var icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";

        $("#main_icon").attr("src",icon_img_url);

        UVqueryURL =
            "http://api.openweathermap.org/data/2.5/uvi?appid=" +
            api_key +
            "&lat=" +
            lat +
            "&lon=" +
            lon;
            
        //                   api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37
        //            http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
        //            http://api.openweathermap.org/data/2.5/uvi?appid=69edebd1b8d3d2f77fe9b147a59750e6&lat=30.27&lon=-97.74

        console.log("here is the first url for the main UV card: ");
        console.log(UVqueryURL);

        $.ajax({
            url: UVqueryURL,
            method: "GET"
        }).then(function (UVresponse) {
            console.log(UVresponse);

            $("#uv-index").text(UVresponse.value);
            todays_date = UVresponse.date_iso;
            todays_date = todays_date.split("T")[0];
            $("#todays-date").text("(" + todays_date + ")");
        });

        forecastURL =
            "http://api.openweathermap.org/data/2.5/forecast?appid=" +
            api_key +
            "&lat=" +
            lat +
            "&lon=" +
            lon;
        console.log("here is the forecast url I am about tosubmit: ");
        console.log(forecastURL);
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (forecastresponse) {
            console.log("here is the 5 day object: ");
            console.log(forecastresponse);
            var daily_array = [];
            for (i = 0; i < 5; i++) {
                daily_array.push(forecastresponse.list[i * 8]);
            }
            console.log(daily_array);
            todays_date = daily_array[0].dt_txt;
            todays_date = todays_date.split(" ")[0];
            todays_date = todays_date.split("-");
            console.log(todays_date);
            $("#c1-date").text(
                todays_date[1] + "/" + todays_date[2] + "/" + todays_date[0]
            );

            todays_date = daily_array[1].dt_txt;
            todays_date = todays_date.split(" ")[0];
            todays_date = todays_date.split("-");
            console.log(todays_date);
            $("#c2-date").text(
                todays_date[1] + "/" + todays_date[2] + "/" + todays_date[0]
            );

            todays_date = daily_array[2].dt_txt;
            todays_date = todays_date.split(" ")[0];
            todays_date = todays_date.split("-");
            console.log(todays_date);
            $("#c3-date").text(
                todays_date[1] + "/" + todays_date[2] + "/" + todays_date[0]
            );

            todays_date = daily_array[3].dt_txt;
            todays_date = todays_date.split(" ")[0];
            todays_date = todays_date.split("-");
            console.log(todays_date);
            $("#c4-date").text(
                todays_date[1] + "/" + todays_date[2] + "/" + todays_date[0]
            );

            todays_date = daily_array[4].dt_txt;
            todays_date = todays_date.split(" ")[0];
            todays_date = todays_date.split("-");
            console.log(todays_date);
            $("#c5-date").text(
                todays_date[1] + "/" + todays_date[2] + "/" + todays_date[0]
            );

            my_temp = daily_array[0].main.temp;
            my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
            $("#c1-temp").text("Temp: " + my_temp);

            my_temp = daily_array[1].main.temp;
            my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
            $("#c2-temp").text("Temp: " + my_temp);

            my_temp = daily_array[2].main.temp;
            my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
            $("#c3-temp").text("Temp: " + my_temp);

            my_temp = daily_array[3].main.temp;
            my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
            $("#c4-temp").text("Temp: " + my_temp);

            my_temp = daily_array[4].main.temp;
            my_temp = Math.round(((my_temp - 273.15) * 9) / 5 + 32, 1) + "°F";
            $("#c5-temp").text("Temp: " + my_temp);

            $("#c1-humidity").text("Humidity: " + daily_array[0].main.humidity);
            $("#c2-humidity").text("Humidity: " + daily_array[1].main.humidity);
            $("#c3-humidity").text("Humidity: " + daily_array[2].main.humidity);
            $("#c4-humidity").text("Humidity: " + daily_array[3].main.humidity);
            $("#c5-humidity").text("Humidity: " + daily_array[4].main.humidity);

            my_code=daily_array[0].weather[0].icon;
            icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";
            $("#c1_icon").attr("src",icon_img_url);

            my_code=daily_array[1].weather[0].icon;
            icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";
            $("#c2_icon").attr("src",icon_img_url);

            my_code=daily_array[2].weather[0].icon;
            icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";
            $("#c3_icon").attr("src",icon_img_url);

            my_code=daily_array[3].weather[0].icon;
            icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";
            $("#c4_icon").attr("src",icon_img_url);

            my_code=daily_array[4].weather[0].icon;
            icon_img_url="http://openweathermap.org/img/wn/"+my_code+"@2x.png";
            $("#c5_icon").attr("src",icon_img_url);

        });
    });
}

update("Austin");

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // debugger;
    var new_city = $("#city-search").val();
    push_item(new_city);
    redraw_table();
    update(new_city);
});

//debugger;
//load up the search list from local storage
$("#table-body").empty();

if (localStorage.length == 0) {
    // debugger;
    push_item("Austin");
    push_item("Chicago");
    push_item("New York");
    push_item("Orlando");
    push_item("San Francisco");
    push_item("Denver");
    push_item("Atlanta");
}
redraw_table();

function push_item(key) {
    //treating local storage like a stack, push the new key on the top position
    //first, load the current stack:
    var storage_array = ["dummy"];
    for (var i = 0; i < localStorage.length; i++) {
        storage_array.push(localStorage.getItem(i));
    }
    //add the new item as item zero:
    storage_array[0] = key;
    //kill the max length item, if any
    localStorage.clear();
    var max_length = storage_array.length;
    if (max_length > 8) {
        max_length = 8;
    }
    for (var i = 0; i < max_length; i++) {
        localStorage.setItem(i, storage_array[i]);
    }
}

function redraw_table() {
    //draw the table from storage
    //redraw the table
    //debugger;
    var storage_array = [];
    $("#table-body").empty();
    for (var i = 0; i < localStorage.length; i++) {
        storage_array.push(localStorage.getItem(i));
    }

    for (var i = 0; i < storage_array.length; i++) {
        var new_thing = $(
            '<tr><td id="history_links">' + storage_array[i] + "</td></tr>"
        );
        //new_thing.on("click",update(new_thing.text()));
        $("#table-body").append(
            $('<tr><td id="history_links">' + storage_array[i] + "</td></tr>")
        );
    }
}
