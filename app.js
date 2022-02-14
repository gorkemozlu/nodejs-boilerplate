var express =   require("express");
var app         =   express();
var helmet = require('helmet')
app.use(helmet({
    noSniff: false
  }))
const port = process.env.PORT || 3000;


const testRouter = require('./routers/test')
const mainRouter = require('./routers/main')

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(testRouter)
app.use(mainRouter)

app.set('view engine', 'pug');
app.set('view cache', true);
app.set('views','./views');
app.use('/static', express.static('public'))


app.timeout = 120000;
app.listen(port,function(){
    console.log("Working on port " + port);
});