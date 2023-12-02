const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb'); // Import MongoClient from mongodb
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ctbenoit60:SAMuel1234!>@cluster0.ltshjro.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Model (for Mongoose)
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Connection URI (for MongoDB Node.js driver)
const mongoUri = 'mongodb+srv://ctbenoit60:SAMuel1234!>@cluster0.ltshjro.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient (for MongoDB Node.js driver)
const mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Signup Route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Use Mongoose to create user
        const mongooseUser = await User.create({ username, password });
        console.log('User created with Mongoose:', mongooseUser);

        // Use MongoDB Node.js driver to insert user
        await mongoClient.connect();
        const db = mongoClient.db();
        const usersCollection = db.collection('users');
        const result = await usersCollection.insertOne({ username, password });
        console.log('User inserted with MongoDB Node.js driver:', result.insertedId);

        res.json({ user: mongooseUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Use Mongoose to find user
        const mongooseUser = await User.findOne({ username, password });
        console.log('User found with Mongoose:', mongooseUser);

        // Use MongoDB Node.js driver to find user
        await mongoClient.connect();
        const db = mongoClient.db();
        const usersCollection = db.collection('users');
        const mongoUser = await usersCollection.findOne({ username, password });
        console.log('User found with MongoDB Node.js driver:', mongoUser);

        if (mongooseUser) {
            res.json({ user: mongooseUser });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
