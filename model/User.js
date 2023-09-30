const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
    },
    conpassword:
    {
        type :String ,
        require:true
    }
   

})
UserSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 12)
    this.conpassword = await bcrypt.hash(this.conpassword, 12)
    next()

})
module.exports = mongoose.model('User', UserSchema)