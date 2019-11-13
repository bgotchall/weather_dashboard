//open weather API key: 69edebd1b8d3d2f77fe9b147a59750e6

//api.openweathermap.org/data/2.5/weather?q={Austin}
//https://api.openweathermap.org/data/2.5/weather?q=Austin,us&appid=69edebd1b8d3d2f77fe9b147a59750e6

var api_key= "69edebd1b8d3d2f77fe9b147a59750e6";
var city_to_search="Austin";
var queryURL='https://api.openweathermap.org/data/2.5/weather?q='+city_to_search+',us&appid='+api_key
var UVqueryURL='http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}'
var my_temp=0;
var lat=0;      //lattitude from searched city
var lon=0;      //longitude from searched city

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#city-name").text(response.name);
    my_temp=response.main.temp;
    my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
    $("#temperature").text(my_temp);
    $("#humidity").text(my_temp);
    $("#wind-speed").text(response.wind.speed);
    lat=response.coord.lat;
    lon=response.coord.lon;
    UVqueryURL='http://api.openweathermap.org/data/2.5/uvi?appid='+api_key+'&lat='+lat+'&lon='+lon;
    console.log(UVqueryURL);
    
    $.ajax({
        url: UVqueryURL,
        method: "GET"
      }).then(function(UVresponse) {
        console.log(UVresponse);
        $("#uv-index").text(UVresponse.value);
    });
  });

