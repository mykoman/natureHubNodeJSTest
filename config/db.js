const mongoose = require('mongoose');
const config = require('config');

const dbDetails = config.get('mongoURI')
const connectDb = async ()=>{
    mongoose.connect(dbDetails, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (error)=>{
        if(error) throw error;
        console.log("Database base connected successfully")
    })
}

module.exports = connectDb;
