var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var typeModel = new Schema({
	type: {type:String},
	fields: {type:Object}
});


module.exports = mongoose.model('Type', typeModel);