var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db('assignmentdb', server, {safe: true});

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'assignmentdb' database");
        db.collection('assignments', {safe: true}, function (err, collection) {
            if (err) {
                console.log("The 'assignments' collection doesn't exist. ");
                //populateDB();
            }
        });
    }
});

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving Assigment: ' + id);
    db.collection('assignments', function (err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function (req, res) {
    db.collection('assignments', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.addAssignment = function (req, res) {
    var assignment = req.body;
    console.log('Adding assignment: ' + JSON.stringify(assignment));
    db.collection('assignments', function (err, collection) {
        collection.insert(assignment, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateAssignment = function (req, res) {
    var id = req.params.id;
    var assignment = req.body;
    delete assignment._id;
    console.log('Updating assignment: ' + id);
    console.log(JSON.stringify(assignment));
    db.collection('assignments', function (err, collection) {
        collection.update({'_id': new BSON.ObjectID(id)}, assignment, {safe:true}, function (err, result) {
            if (err) {
                console.log('Error updating assignment: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log(result + ' document(s) updated');
                res.send(assignment);
            }
        });
    });
};

exports.deleteAssignment = function (req, res) {
    var id = req.params.id;
    console.log('Deleting assignment: ' + id);
    db.collection('assignments', function (err, collection) {
        collection.remove({'_id' : new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error' : 'An error has occurred - ' + err});
            } else {
                console.log(result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};
