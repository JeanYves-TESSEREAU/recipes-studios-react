import dotenv from 'dotenv';
dotenv.config();

import connectdB from './config/db.js';
import Aliment from './models/Aliment.js';
connectdB();

//  I USE THIS FUNCTION IN ORDER TO COMMUNICATE AND CHECK REQUEST FROM DATA BASE.

const queryMongoDb = async () => {
  try {
    let query = await Aliment.find();
    console.log(query);
    process.exit();
  } catch (error) {
    console.log(' Sadly, error with data import');
    process.exit(1);
  }
};

queryMongoDb();
