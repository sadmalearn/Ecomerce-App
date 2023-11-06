const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`mongodb+srv://raphik2499:raphik2499@cluster0.n99ltre.mongodb.net/ECOMMERCE`);
    console.log(
      "Database connected succefully: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;