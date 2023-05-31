import dotenv from 'dotenv';
dotenv.config();
import alimentsData from './data/aliments.js';
import connectdB from './config/db.js';
import Aliment from './models/Aliment.js';
connectdB();

const importData = async () => {
  try {
    await Aliment.deleteMany({});
    await Aliment.insertMany(alimentsData);
    console.log('Data imported to data base Baby');
    process.exit();
  } catch (error) {
    console.log(' Sadly, error with data import');
    process.exit(1);
  }
};

importData();
