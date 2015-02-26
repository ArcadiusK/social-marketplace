'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SizeSchema = new Schema({
  name: {type: String, enum : ["P", "NB", "3m", "6m", "9m", "12m", "18m", "24m", "OS", "2T", "3T", "4T", "5T", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
});



module.exports = mongoose.model('Size', SizeSchema);