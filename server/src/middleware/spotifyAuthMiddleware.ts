/*
  spotifyAuth is a middleware that does two things:
  1) check for jwt's in requests. If they don't exist or is invalid, user is not logged in!
  2) refresh Spotify access token if current one has expired

  This ensures that users have a seamless experience interacting w/ Spotify via Tracknote
*/

import express from 'express';

import { User } from '../models';
import { postToken } from '../spotifyApi';

async function spotifyAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const jwt = req.cookies['tracknotes_token'];
  const user = await User.findOne({jwt}).select('+spotify.tokens');

  if (user) {
    const currentDate = new Date();
    if (currentDate > user.spotify.tokens.expireDate) {
      // Refresh access token
      const { data: tokenData } = await postToken({ grantType: 'refresh_token', refreshToken: user.spotify.tokens.refresh});
      const accessToken = tokenData?.access_token;
      const expiresIn = tokenData?.expires_in;

      if (accessToken && expiresIn) {
        // Calculate new expire date
        const newExpireDate = currentDate;
        newExpireDate.setSeconds(currentDate.getSeconds() + expiresIn);

        user.spotify.tokens.access = accessToken;
        user.spotify.tokens.expireDate = newExpireDate; 
        await user.save();
      }
    }

    req.user = user;
    next();
  } else {
    res.status(401).json({
      error: {
        message: 'Invalid request - authorize with Spotify via Tracknote',
        status: 401,
      }
    })
  }
}

export default spotifyAuth;