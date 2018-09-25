var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var formModel = new Schema({
	name: {type:String},
	number: {type: Number, default: 0},
	fields: {type:Object} //list maybe? and then turn into json
});



module.exports = mongoose.model('Form', formModel);

