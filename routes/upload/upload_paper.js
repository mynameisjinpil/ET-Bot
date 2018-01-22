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
    console.log('\nGET [routes/upload/upload_paper] ');

    res.render('upload_paper', { title: 'upload paper' });
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
    var level = new Array();
    var stage = new Array();
    var number = new Array();
    var type = new Array();
    var question = new Array();
    var answer = new Array();

    var  = new Array();

    for(var idx = 0; idx < split_text.length; idx++){
        var paperTable = {}

        paperTable[idx] = split_text[idx].split('-');

        level.push(paperTable[idx][0]);
        stage.push(paperTable[idx][1]);
        number.push(paperTable[idx][2]);
        type.push(paperTable[idx][3])
        // question.push(paperTable[idx][4]);
        // answer.push(paperTable[idx][4]);

        var tempStr;

        if(paperTable[idx][3] == 0){
            tempStr = paperTable[idx][4].split('\r');
            Q.push(tempStr);
            testNum.push(question[idx][2]);
            count[question_count[idx]] = 0;
        }else{
            tempStr = question[idx][4].split('\r');
            answer.push(tempStr);
            count[question_count[idx]]+= 1;
        }
    }

    for(var idx = 0; idx < split_text.length; idx++){
        database.examModel.findOne({"level": level[idx], "stage": stage[idx], "number": number[idx], "question": question[idx], "answer": answer[idx]}, function(err, feedback){
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
