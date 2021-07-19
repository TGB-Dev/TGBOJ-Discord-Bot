const mongoose = require('mongoose');

const db = mongoose.connection;
//CodeforcesHandleSchema
const handleSchema = new mongoose.Schema({
    discordID: String,
    codeforcesHandle: String
});
const User = mongoose.model('User', handleSchema);
module.exports = User; 