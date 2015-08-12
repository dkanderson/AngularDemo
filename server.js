var express = require('express'),
    path = require('path'),
    http = require('http'),
    assmt = require('./routes/tasks'),
    bodyParser = require('body-parser');

var app = express();


app.set('port', process.env.PORT || 9000);
// app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', assmt.findAll);
app.get('/tasks/:id', assmt.findById);
app.post('/tasks', assmt.addAssignment);
app.put('/tasks/:id', assmt.updateAssignment);
app.delete('/tasks/:id', assmt.deleteAssignment);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});