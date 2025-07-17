module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            table_number: {
                type: Number,
                required: true,
                unique: true,
            },
            capacity: {
                type: Number,
                required: true,
            },
            avability: {
                type: Boolean,
                default: true,
            },
            current_order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'orders',
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

    const Table = mongoose.model('tables', schema);
    return Table;
}