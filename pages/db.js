const { MongoClient } = require('mongodb');

async function connect() {
  const url = 'mongodb+srv://juca1405:<e$$emP1_>@cluster0.5rumzet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = 'Cluster0';

  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const db = client.db(dbName);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = { connect }
