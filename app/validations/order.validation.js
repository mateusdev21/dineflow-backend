const Joi = require('joi');

module.exports = (data) => {
    const schema = Joi.object({
        customer_details: Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            pax: Joi.number().required().min(1).max(6)
        }).required(),
        order_status: Joi.string().required(),
        order_date: Joi.date().default(Date.now),
        billing: Joi.object({
            total_amount: Joi.number().required(),
            tax: Joi.number().required(),
            total_pay: Joi.number().required()
        }).required(),
        items: Joi.array().items(
            Joi.object({
                item_id: Joi.string().required(),
                quantity: Joi.number().required().min(1)
            })
        ).required()
    });
    return schema.validate(data);
};