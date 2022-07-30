module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstname: String,
            lastname: String,
            level: String,
            email: String,
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

    const User = mongoose.model('users', schema);
    return User;
}