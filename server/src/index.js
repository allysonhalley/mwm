import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import experienceRouter from './routes/experience.js';
import userRouter from "./routes/user.js";
import wineRouter from "./routes/wine.js";
// import auth from './middleware/auth.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/experience", experienceRouter);
app.use("/user", userRouter);
app.use("/wine", wineRouter);

// app.use(auth); 

app.use('/', (req, res) => {
  res.send('Welcome Enophile to MWM!');
});

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
