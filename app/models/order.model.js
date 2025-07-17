module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            customer_details: {
                name: { type: String, required: true },
                phone: { type: String, required: true },
                pax: { type: Number, required: true, min: 1, max: 6 },
            },
            order_status: {
                type: String,
                required: true,
            },
            order_date: {
                type: Date,
                default: Date.now(),
            },
            billing: {
                total_amount: { type: Number, required: true },
                tax: { type: Number, required: true },
                total_pay: { type: Number, required: true },
            },
            items: [{
                item_id: { type: String, required: true },
                quantity: { type: Number, required: true, min: 1 },
            }],
            table: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tables',
            },
        },
        {
            timestamps: true,
        }
    );

    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Order = mongoose.model('orders', schema);
    return Order;
}