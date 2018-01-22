module.exports = {
    serverPort: 3000,
    dbUrl: 'mongodb://localhost:27017/local',
    dbSchema: [{file: './examSchema', collection: 'examCollection', schemaName: 'examSchema', modelName: 'examModel'},
        {file: './userSchema', collection: 'userCollection', schemaName: 'userSchema', modelName: 'userModel'},
        {file: './feedbackSchema', collection: 'feedbackCollection', schemaName: 'feedbackSchema', modelName: 'feedbackModel'},
    ]
}