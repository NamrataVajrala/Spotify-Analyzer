const express = require('express');
const app = express();
const router = express.Router();

const mongoose = require('mongoose');
const secrets = require('./config/secrets');
const bodyParser = require('body-parser');
const cors = require('cors');

const port =  process.env.PORT || 4000;

// Connect to a MongoDB --> Uncomment this once you have a connection string!!
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

// auth.logIn("test3@gmail.com", "password");
// console.log(auth.getCurrentUser());
