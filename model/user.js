const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    // unique is an optimize features provided by mongoose/mongodb. not an a validation like unique value that the imp.
    name:{type:String, require:true},
    email: { type: String, valid: true, unique: true, },
    phone:{type:Number,require:true, unique:true},
    password: { type: String, valid: true },

});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);