const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    }
});

var Contacts = mongoose.model('Contact',contactSchema);
module.exports = Contacts;