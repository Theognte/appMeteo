$(document).ready(function(){
    // geolocation enabled

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showcityname);

        function showcityname(position) {
            var lat = position.coords.latitude;
            var longit = position.coords.longitude;
            var altitude = position.coords.altitude;
            var apiKey = "ee07e2bf337034f905cde0bdedae3db8";
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + longit + "&appid=" + apiKey +"&units=metric&lang=fr&mode=json", function(data) {
                $("#cityText").html(data.name);
                    $("#descText").html(data.weather[0].description);
                    $("#tempText").html(data.main.temp + "°C");

                    var date = new Date();
                    $("#date").html(('0'+date.getDate()).slice(-2)+"/"+('0'+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear());

                    $("#detailsBoxes").css("visibility","visible");

                    $("#pressText").html(data.main.pressure + " hPa");
                    $("#windText").html(data.wind.speed + " m/s");
                    $("#humText").html(data.main.humidity + " %");
                    $("#visText").html(data.visibility + " m");
            });
        }
    }
});

var url ="";

function apiMeteoPart1() {

    var city = $("#ville").val();
    if (city != "") {
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric&lang=fr&mode=json"

        $.getJSON(url, function(data) {

            $("#cityText").html(data.name);
            $("#descText").html(data.weather[0].description);
            $("#tempText").html(data.main.temp + "°C");

            var date = new Date();
            $("#date").html(('0'+date.getDate()).slice(-2)+"/"+('0'+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear());

            $("#details").css("visibility","visible");

            $("#pressText").html("--");
            $("#humText").html("--");
            $("#visText").html("--");
            $("#windText").html("--");

        });

    }
    
}

function apiMeteoPart2() {
    $.getJSON(url, function(data) {
        
        $("#detailsBoxes").css("visibility","visible");
        $("#pressText").html(data.main.pressure+" hPa");
        $("#humText").html(data.main.humidity+" %");
        $("#visText").html(data.visibility+" m");
        $("#windText").html(data.wind.speed+" m/s");
        $("#details").css("visibility","hidden");

    });
}