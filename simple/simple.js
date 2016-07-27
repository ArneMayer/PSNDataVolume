function loadVolume() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("volumeSpan").innerHTML = xhttp.responseText;
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", "http://www.uni-potsdam.de/u/zeik/psn/studheim-sdg", true);
    xhttp.send();
}
