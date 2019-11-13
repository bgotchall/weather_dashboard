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
                todays_date=daily_array[0].dt_txt;
                todays_date=todays_date.split(" ")[0];
                todays_date=todays_date.split("-");
                console.log(todays_date);
                $("#c1-date").text(todays_date[1]+"/"+todays_date[2]+"/"+todays_date[0]);

                todays_date=daily_array[1].dt_txt;
                todays_date=todays_date.split(" ")[0];
                todays_date=todays_date.split("-");
                console.log(todays_date);
                $("#c2-date").text(todays_date[1]+"/"+todays_date[2]+"/"+todays_date[0]);

                todays_date=daily_array[2].dt_txt;
                todays_date=todays_date.split(" ")[0];
                todays_date=todays_date.split("-");
                console.log(todays_date);
                $("#c3-date").text(todays_date[1]+"/"+todays_date[2]+"/"+todays_date[0]);

                todays_date=daily_array[3].dt_txt;
                todays_date=todays_date.split(" ")[0];
                todays_date=todays_date.split("-");
                console.log(todays_date);
                $("#c4-date").text(todays_date[1]+"/"+todays_date[2]+"/"+todays_date[0]);

                todays_date=daily_array[4].dt_txt;
                todays_date=todays_date.split(" ")[0];
                todays_date=todays_date.split("-");
                console.log(todays_date);
                $("#c5-date").text(todays_date[1]+"/"+todays_date[2]+"/"+todays_date[0]);

                my_temp=daily_array[0].main.temp;
                my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
                 $("#c1-temp").text("Temp: "+my_temp);

                my_temp=daily_array[1].main.temp;
                my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
                 $("#c2-temp").text("Temp: "+my_temp);

                 my_temp=daily_array[2].main.temp;
                my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
                 $("#c3-temp").text("Temp: "+my_temp);

                 my_temp=daily_array[3].main.temp;
                my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
                 $("#c4-temp").text("Temp: "+my_temp);

                 my_temp=daily_array[4].main.temp;
                my_temp=Math.round( ((my_temp -273.15) * 9/5 + 32),1)+"°F";
                 $("#c5-temp").text("Temp: "+my_temp);

                 $("#c1-humidity").text("Humidity: "+ daily_array[0].main.humidity);
                 $("#c2-humidity").text("Humidity: "+ daily_array[1].main.humidity);
                 $("#c3-humidity").text("Humidity: "+ daily_array[2].main.humidity);
                 $("#c4-humidity").text("Humidity: "+ daily_array[3].main.humidity);
                 $("#c5-humidity").text("Humidity: "+ daily_array[4].main.humidity);


            });



    });

    




    });

    


    
  });


  
