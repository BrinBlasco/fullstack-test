
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cors({credentials: true, origin: "http://localhost:9999"}));
app.use(cookieParser());
app.use(express.json());

const runProcess = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (err) {
    console.log("Mongo err: ", err);
    mongoose.disconnect();
    process.exit(1);
  }
};
runProcess().catch(console.dir);


const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
