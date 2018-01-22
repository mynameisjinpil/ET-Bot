var crypto = require('crypto');
var Schema = {};

Schema.createSchema = function(mongoose){

    var examSchema = mongoose = mongoose.Schema({
        level: {type: String, required: true},
        stage: {type: String, required: true},
        number: {type: String, required: true},
        question: {type: String},
        answer: {type: Array, required: true}
    });

    examSchema.path('level').validate(function(level){
        return level.length;
    });

    examSchema.path('stage').validate(function(stage){
        return stage.length;
    });

    examSchema.path('number').validate(function(number){
        return number.length;
    });

    examSchema.path('question').validate(function(question){
        return question.length;
    });

    examSchema.path('answer').validate(function(answer){
        return answer.length;
    });

    return examSchema;
};

module.exports = Schema;
