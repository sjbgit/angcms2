/**
 * Created by sbunke on 3/16/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminUser = new Schema({
    username: String,
    password: String
});
var adminUser = mongoose.model('adminUser', adminUser);
module.exports=adminUser;