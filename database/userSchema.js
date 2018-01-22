var crypto = require('crypto');
var Schema = {};

Schema.createSchema = function(mongoose){
    var userSchema = mongoose = mongoose.Schema({
        number: {type: Number, required: true},
        name: {type: String, required: true},
        wrongAnswer: {type: Array, 'default': {'level': '', 'stage': '', 'number': ''}},
    });

    userSchema.path('number').validate(function(number){
        return number.length;
    });

    userSchema.path('name').validate(function(name){
        return name.length;
    });

    userSchema.path('wrongAnswer').validate(function(wrongAnswer){
        return wrongAnswer.length;
    });


    return userSchema;
}

module.exports = Schema;