// Description: This file is the entry point of the server. It sets up the server and connects to the database.
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});