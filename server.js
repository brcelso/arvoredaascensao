const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

async function connect() {
  const url = 'mongodb+srv://juca1405:e$$emP1_@cluster0.5rumzet.mongodb.net/';
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const db = client.db('ARVORE');

    // Get the collection you want to create an index on
    const collection = db.collection('DB');

    // Create an index on the 'color' field and wait for it to be ready
    await collection.createIndex({ color: 1 });
    console.log('Index created');

    return { db, collection };
  } catch (err) {
    console.error('Error creating index', err);
  }
}

const app = express();
app.use(cors());

app.get('/colors', async (req, res) => {
  const { db, collection } = await connect();
  const colors = await collection.find().toArray();
  res.json({ colors });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

