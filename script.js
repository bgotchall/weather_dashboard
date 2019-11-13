//open weather API key: 69edebd1b8d3d2f77fe9b147a59750e6

//api.openweathermap.org/data/2.5/weather?q={Austin}
//https://api.openweathermap.org/data/2.5/weather?q=Austin,us&appid=69edebd1b8d3d2f77fe9b147a59750e6

var api_key= "69edebd1b8d3d2f77fe9b147a59750e6";
var city_to_search="Austin";
var queryURL='https://api.openweathermap.org/data/2.5/weather?q='+city_to_search+',us&appid='+api_key;
var UVqueryURL='http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}';
var forecastURL='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}';
var my_temp=0;
var todays_date=0;
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
        todays_date=UVresponse.date_iso;
        todays_date=todays_date.split("T")[0];
        $("#todays-date").text('('+todays_date+')');

        $.ajax({
            url: UVqueryURL,
            method: "GET"
          }).then(function(UVresponse) {
            console.log(UVresponse);
            
            $("#uv-index").text(UVresponse.value);
            todays_date=UVresponse.date_iso;
            todays_date=todays_date.split("T")[0];
            $("#todays-date").text('('+todays_date+')');



            forecastURL='http://api.openweathermap.org/data/2.5/forecast?appid='+api_key+'&lat='+lat+'&lon='+lon;
            console.log(forecastURL);
            $.ajax({
                url: forecastURL,
                method: "GET"
              }).then(function(forecastresponse) {
                console.log(forecastresponse);
                var daily_array=[];
                for (i=0;i<5;i++){
                    daily_array.push(forecastresponse.list[i*8]);

                }
                console.log(daily_array);
                
                
            });



    });

    




    });

    


    
  });


  
