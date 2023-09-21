/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';
import * as routes from './routes';


const app = express();
// database setup
const mongoUri = process.env.MONGO_URL ;
const mongooseConfigs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongoUri, mongooseConfigs);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use(compression());

app.use('/api', routes.hello);
app.use('/api/auth',routes.auth);

app.use('/api/users', routes.users);
app.use('/api/form',routes.form);

export default app;
