var express = require('express'),
    path = require('path'),
    http = require('http'),
    assmt = require('./routes/assignments');

var app = express();


app.set('port', process.env.PORT || 9000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/assignments', assmt.findAll);
app.get('/assignments/:id', assmt.findById);
app.post('/assignments', assmt.addAssignment);
app.put('/assignments/:id', assmt.updateAssignment);
app.delete('/assignments/:id', assmt.deleteAssignment);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});