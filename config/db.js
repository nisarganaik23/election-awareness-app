require('dotenv').config({ path: './.env' });
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging step

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("MongoDB URI is not defined in the .env file.");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
