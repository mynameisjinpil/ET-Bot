var mongoose = require('mongoose')

var database = {}

database.init = function(app, config){
    console.log('\n[database/database/database.init()]');

    if(app){
        if(config){
            connect(app, config);
        }else{
            console.error.bind(console, '[error] config not defined\n');
        }
    }else{
        console.error.bind(console, '[error] application error\n');
    }
}

function connect(app, config){
    console.log('\n[database/database/connect()] try to connect');

    mongoose.Promise = global.Promise;
    mongoose.connect((config.dbUrl));

    database.db = mongoose.connection;
    database.db.on('error', console.error.bind(console, "[error] fail to connect DB. check 'config/config'\n"));
    database.db.on('open', function(){
        console.log('\t[push] db url: ' + config.dbUrl);

        createSchema(app,config);
    });

    database.db.on('discopnnected', connect);
}

function createSchema(app, config){
    console.log('\n[database/database/createSchema]');

    var schemaLen = config.dbSchema.length;

    console.log('\t[push] number of schema:' + schemaLen);

    for (var i = 0; i <schemaLen; i++){
        var curItem = config.dbSchema[i];
        var curSchema = require(curItem.file).createSchema(mongoose);
        var curModel = mongoose.model(curItem.collection, curSchema);

        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;

        console.log('\t[push] schema: [%s] Model: [%s]', curItem.schemaName, curItem.modelName);
    }

    app.set('database', database);
    console.log('\t[push] db connected');
}

module.exports = database;

