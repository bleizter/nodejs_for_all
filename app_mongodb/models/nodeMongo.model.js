module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            kode: String,
            nama: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, ...object } = this.toObject();
        return object;
    });

    const NodeMongo = mongoose.model(process.env.TABLE_MONGO, schema);
    return NodeMongo;
};