import { User } from './user';

export type Comment = {
  content: string;
  author: User | string;
  createdAt?: Date;
}

export type Note = {
  spotifyPlaylistId: string;
  spotifyTrackId: string;
  rootAuthor: User | string;
  comments: Array<Comment>;
  createdAt: Date;
};