const Joi = require('joi');

module.exports = (data) => {
    const schema = Joi.object({
        table_number: Joi.number().required(),
        capacity: Joi.number().required(),
        avability: Joi.boolean().default(true),
    });
    return schema.validate(data);
};