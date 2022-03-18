// import seeder from 'mongoose-seed';
require('dotenv').config()

const data = require("../db_seeder/data.json");
// // Connect to MongoDB via Mongoose
// seeder.connect(process.env.MONGODB_URI, function() {

//   // Load Mongoose models
//   seeder.loadModels([
//     'src/models/city.ts'
//   ]);

//   // Clear specified collections
//   // seeder.clearModels(['cities'], function() {

//     // Callback to populate DB once collections have been cleared
//     seeder.populateModels(data, function() {
//       console.log("DONE", data);
//       // seeder.disconnect();
//     });

//   // });
// });


import mongoose from 'mongoose';
import { Seeder } from 'mongoose-seeder-2';
 
// 1. import models, so they register in mongoose
import { City } from 'src/models/city.ts';
// model example:
// mongoose.model('User', new mongoose.Schema({ email: String, unique: true }));
 
async function seed() {
  // 2. connect seeder
  const seeder = new Seeder(
    process.env.MONGODB_URI
  );
 
  // 3. Pass names of models to be cleared
  await seeder.clearModels(['City']);
 
  // 4. Pass data to initialize db where key is model, and value is list of documents
  await seeder.populateModels({
    City: data,
  });
 
  await seeder.disconnect();
}
 
seed();