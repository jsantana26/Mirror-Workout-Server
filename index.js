//Set up dependencies
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    cors = require('cors'),
    app = express();

// Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Cors
app.use(cors());

// Set up express router
const router = express.Router()

app.use("/", require("./routes/index"));
app.use("/exercises", require("./routes/exercises"));



// Server
app.listen(3000, function(){
    console.log('Server started on port 3000');
});

// Export Router
module.exports = router;