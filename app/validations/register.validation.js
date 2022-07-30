const Joi = require('joi');

module.exports = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        level: Joi.string().required()
    });
    return schema.validate(data);
};