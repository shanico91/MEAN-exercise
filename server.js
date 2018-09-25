const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/myAPI', { useNewUrlParser: true });

var Form = require('./models/formModel');
var Type = require('./models/typeModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

formRouter = require('./Routes/formRoutes')(Form, Type);
submissionsRouter = require('./Routes/submissionsRouter')(Form, Type);
newformRouter = require('./Routes/newformRouter')(Form);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/mean')));

app.use('/forms', formRouter);
app.use('/submissions', submissionsRouter);
app.use('/newform', newformRouter);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mean/index.html'));
});

app.listen(port, function () {
  console.log('listening on port: ' + port);
});
