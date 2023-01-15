const exp = require("express");

var bodyParser = require('body-parser');

const app = exp();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.post("/", (request, response) => {
    console.log(request.body);
    let ans = Number(request.body.n1) + Number(request.body.n2);
    response.send("form submitted!... the result is " + ans);
})

app.post("/bmiCal", (request, response) => {
    let ht = Number(request.body.height) / 100;
    let wt = Number(request.body.weight);

    ht = ht * ht;
    let result = wt / ht;

    response.send("Your BMI index is: " + result + "!");
})

app.listen(3000, () => {
    console.log("server is listening at port 3000");
});