// const mongoose = require('mongoose');
require("dotenv").config()
const {MongoClient} = require("mongodb");
let Avatar = require("./model/Avatar")
const createAvatar = require("./test/create_avatar");

async function connectToCluster(uri) {
    let mongoClient;

    try{
        console.log('Connecting to MongoDb Atlas Cluser');
        mongoClient = new MongoClient(uri);
        
        await mongoClient.connect();
        console.log('Connected to Mongodb Atlas Cluster');
        const collection = mongoClient.db('team_clutch_db').collection('avatars');

        console.log('Creating avatar')
        //create a new avatar
        await createAvatar(collection);
        console.log('New Avatr created')
        
    }catch (error) {
        console.error('Connection to MongoDB Atlas failed',error);
        //process.exit();
    }finally {
        mongoClient.close()
       }
}

connectToCluster(process.env.DATABASE_URI);