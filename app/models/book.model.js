module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            kode: String,
            judul: String,
            penulis: String,
            penerbit: String,
            kategori: String,
            sub_kategori: String,
            rilis: String,
            bahasa: String,
            halaman : String,
            stok: Number
        }
    );

    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Book = mongoose.model('books', schema);
    return Book;
}