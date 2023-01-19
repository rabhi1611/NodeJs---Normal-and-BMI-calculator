const exp = require("express");
const bodyParser = require('body-parser');
const https = require("https"); 
const { measureMemory } = require("vm");

const app = exp();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/weather', (request, response) => {
    console.log(response.body);
    response.sendFile(__dirname + '/weather.html');
})


app.post("/", (request, response) => {
    console.log(request.body);
    let ans = Number(request.body.n1) + Number(request.body.n2);
    response.send("form submitted!... the result is " + ans);
})

app.post("/bmiCal", (request, response) => {
    let ht = parseFloat(request.body.height) / 100;
    let wt = parseFloat(request.body.weight);

    ht = ht * ht;
    let result = wt / ht;

    response.send("Your BMI index is: " + result + "!");
})

app.post("/weather", (request, response) => {

    let city = request.body.city;
    let apiKey = '122ad7d497a7dd56560a05a9a61f5bf5';
    let unit = request.body.unit === 'C' ? 'metric' : 'imperial';
    
    console.log(city, unit);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid='+ apiKey +'&units=' + unit;




    https.get(url, (nResponse) => {
        console.log(nResponse.statusCode);
        nResponse.on("data", (data) => {
            let resultBody = JSON.parse(data);
            console.log(resultBody);
            let imgURL = 'http://openweathermap.org/img/wn/'+ resultBody.weather[0].icon +'@2x.png';
            let message = unit === 'metric' ? 'celius.' : 'farenhiet.';
            response.write('<h1>'+ 'temperature at ' + city + ' is: ' + resultBody.main.temp + ' degree '+ message + '</h1><br>');
            response.write('<h1>'+ 'and the weather condition is: ' + resultBody.weather[0].description +'</h1>');
            response.write('<h1>'+ '<img src ='+ imgURL + '></img></h1>');
            

            response.send();
        })
    })
})

app.listen(3000, () => {
    console.log("server is listening at port 3000");
});