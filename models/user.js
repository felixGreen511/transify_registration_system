const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    confirm_password: {type: String, required:true},
});
userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "3d"});
    return token;
};
const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = joi.Object({
        username:joi.string().required().label("Username"),
        email:joi.string().email().required().label("Email"),
        password:joi.passwordComplexity().required().label("Pasword"),
        confirm_password:joi.passwordComplexity().required().label("Pasword Again")

    });
    return schema.validate(data);
}
module.exports = {User, validate}