const joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

const generateAuthToken = (idUser,privateKey,expiresIn) => {
    const token = jwt.sign({ _id: idUser}, privateKey, {
        expiresIn,
    });
    return token;
};

const validateCreateUser = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports={
    validateLogin,
    generateAuthToken,
    validateCreateUser
}