const mongoose = require("mongoose");

const username = process.env.DB_USERNAME 
const password = process.env.DB_PASSWORD 
const dbname = process.env.DB_NAME 
const URL = `mongodb+srv://${username}:${password}@node-rest-shop.a8jqrug.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
module.exports = db;
