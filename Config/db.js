const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.db || "mongodb://127.0.0.1:27017/myapp";
const dbConnect = () => mongoose.connect(db).then(() => {
    console.log(`DB connected at ${process.env.dbname}`);
});

module.exports = dbConnect;