const  express         = require("express"),
       app             = express(),
       bodyParser      = require("body-parser"),
       nodemailer      = require("nodemailer");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Esta vivo")
});