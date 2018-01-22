var express = require('express');
var multer = require('multer');
var fs = require('fs');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage});


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('\nGET [routes/upload/upload_feedback] ');

    res.render('upload_feedback', { title: 'upload feedback' });
});


router.post('/', upload.single('userfile'),function(req, res){
    console.log("\nPOST [routes/upload/upload_feedback/]");

    loadOnDB(res, req);
});

function loadOnDB(res, req){
    console.log("\t[push] load on DB");

    var database = req.app.get('database');
    // read whole txt
    var text = fs.readFileSync('./uploads/' + req.file.originalname, 'utf8');
    // split to per line
    var split_text = text.split('\n');
    // split to per data
    var number = new Array();
    var type = new Array();
    var feed = new Array();

    for(var idx = 0; idx < split_text.length; idx++){
        var feedTable = {}

        feedTable[idx] = split_text[idx].split('-');

        number.push(feedTable[idx][0]);
        type.push(feedTable[idx][1]);
        feed.push(feedTable[idx][2]);
    }

    for(var idx = 0; idx < split_text.length; idx++){
        database.feedbackModel.findOne({"number": number[idx], "type": type[idx], "feedback": feed[idx]}, function(err, feedback){
            if(err){res.send("fail")}

            if(feedback){
                console.log('already');
            }else{
                console.log('\t[push] be saving');

                var paramNumber = number.pop();
                var paramType = type.pop();
                var paramFeedback = feed.pop();

                console.log("\t\t" + paramNumber);
                console.log("\t\t" + paramType)
                console.log("\t\t" + paramFeedback + "\n");

                var parts = new database.feedbackModel({"number" : paramNumber, "type": paramType, "feedback": paramFeedback});

                parts.save(function(err){
                    if(err){
                        res.send("fail")
                    }
                });
            }
        });
    }
    res.redirect('/')
}

module.exports = router;
