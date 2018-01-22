var crypto = require('crypto');
var Schema = {};

Schema.createSchema = function(mongoose){
    var userSchema = mongoose = mongoose.Schema({
        number: {type: Number, required: true},
        type: {type: String, required: true},
        feedback: {type: Array}
    });

    userSchema.path('number').validate(function(number){
        return number.length;
    });

    userSchema.path('type').validate(function(type){
        return type.length;
    });

    userSchema.path('feedback').validate(function(feedback){
        return feedback.length;
    });


    return userSchema;
}

module.exports = Schema;