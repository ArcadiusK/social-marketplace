'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SizeSchema = new Schema({
   name: String
});

module.exports = mongoose.model('Size', SizeSchema);
