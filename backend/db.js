const mongoose = require('mongoose');

const mongoURI = 'mongodb://manu0925:Ushoulddiehard1.@ac-efgxedj-shard-00-00.fr0ylv6.mongodb.net:27017,ac-efgxedj-shard-00-01.fr0ylv6.mongodb.net:27017,ac-efgxedj-shard-00-02.fr0ylv6.mongodb.net:27017/foodie?replicaSet=atlas-5pd144-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=mernCluster';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Well done Manoj, you are connected to MongoDB');
    
    const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetchedData;

  } catch (err) {
    console.log("---", err);
  }
};

module.exports = connectDB;
