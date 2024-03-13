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

    // Create an index on the 'color' field
    collection.createIndex({ color: 1 });

    return db;
  } catch (err) {
    console.error(err);
  }
}

const app = express();
app.use(cors());

app.get('/colors', async (req, res) => {
  const db = await connect();
  // Aqui você pode buscar as cores do banco de dados
  // e retorná-las como uma resposta JSON
  res.json({ colors: [] });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
