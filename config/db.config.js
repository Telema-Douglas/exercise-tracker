const mongoose = require('mongoose')
require('dotenv').config();

let numberOfConnectionTries = 0;
const numberOfSecondsBeforeRetry = 5;
const maximumNumberOfConnectionTrials = 10;
const databaseUrl = process.env.MONGODB_DATABASE_URI;
const mongooseOptions = { serverSelectionTimeoutMS: 5000 };

const connect = async () => {
    mongoose
        .connect(databaseUrl, mongooseOptions)
        .then(() => {
            console.log("MongoDB is connected");
        })
        .catch((error) => {
            numberOfConnectionTries++;

            console.log(
                `Mongoose connection to MongoDB unsuccessful, number of tries made : ${numberOfConnectionTries}`,
                error
            );

            if (numberOfConnectionTries < maximumNumberOfConnectionTrials) {
                setTimeout(connect(), numberOfSecondsBeforeRetry * 1000);
            }
        });
}

connect();



