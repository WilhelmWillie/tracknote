import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// all hail dotenv
dotenv.config();

import { MONGODB_HOST } from './constants';
import { AuthRoutes, NotesRoutes, PlaylistsRoutes, ProfileRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 8000;

// Mongoose setup
mongoose.connect(MONGODB_HOST); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Use API routes
app.use('/api/auth', AuthRoutes);
app.use('/api/profile', ProfileRoutes);
app.use('/api/playlists', PlaylistsRoutes);
app.use('/api/notes', NotesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at localhost:${PORT}`);
});