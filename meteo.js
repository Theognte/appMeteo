var url = ""
function apiMeteoPart1() {
    var city = document.getElementById("ville").value;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",fr&APPID=ee07e2bf337034f905cde0bdedae3db8&units=metric&lang=fr&mode=json"
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', url, true);
    httpRequest.send(null);

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState != 4) {
            return;
        }
        
        if (httpRequest.status == 200) {

            var data = JSON.parse(httpRequest.response)
            var date = new Date();

            console.log(data)

            document.getElementById("cityText").innerHTML=data.name;
            document.getElementById("tempText").innerHTML=data.main.temp+"°C";
            document.getElementById("descText").innerHTML=data.weather[0].description;
            document.getElementById("pressText").innerHTML="--";
            document.getElementById("humText").innerHTML="--";
            document.getElementById("visText").innerHTML="--";
            document.getElementById("windText").innerHTML="--";
            document.getElementById("date").innerHTML=(('0'+date.getDate()).slice(-2)+"/"+('0'+(date.getMonth()+1)).slice(-2)+"/"+date.getFullYear());
            document.getElementById('details').style.visibility = 'visible';
        } else if (httpRequest == 400) {
            console.log('Error 400');
        } else {
           console.log('problème de requête. ' + httpRequest.status);
        }
    }
}

function apiMeteoPart2() {
    if (url != "") {
        var httpRequest = new XMLHttpRequest();

        httpRequest.open('GET', url, true);
        httpRequest.send(null);

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState != 4) {
                return;
            }
            
            if (httpRequest.status == 200) {

                var data = JSON.parse(httpRequest.response)

                console.log(data)

                document.getElementById('detailsBoxes').style.visibility = 'visible';
                document.getElementById("pressText").innerHTML=data.main.pressure+" hPa";
                document.getElementById("humText").innerHTML=data.main.humidity+" %";
                document.getElementById("visText").innerHTML=data.visibility+" m";
                document.getElementById("windText").innerHTML=data.wind.speed+" m/s";
                document.getElementById('details').style.visibility = 'hidden';

            } else if (httpRequest == 400) {
                console.log('Error 400');
            } else {
               console.log('problème de requête. ' + httpRequest.status);
            }
        }

    }
}
