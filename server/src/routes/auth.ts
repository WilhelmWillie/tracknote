import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { JWT_SECRET } from '../constants';
import { getMe, postToken } from '../spotifyApi';

const router = Router();

router.post('/', async (req, res) => {
  const { code } = req.query;

  if (!!code) {
    // Get access token by passing in authorization code
    const { data: tokenData } = await postToken({code: code as string, grantType: 'authorization_code', redirectUri: 'http://localhost:3000/auth/callback', scope: 'user-read-email playlist-read-collaborative playlist-read-private'});
    const accessToken = tokenData?.access_token;
    const refreshToken = tokenData?.refresh_token;
    const expiresIn = tokenData?.expires_in;

    if (accessToken && refreshToken && expiresIn) {
      const { data: meData, error } = await getMe(accessToken);

      if (!meData) {
        return res.status(500).json(error);
      }
      
      const expireDate = new Date();
      expireDate.setSeconds(expireDate.getSeconds() + expiresIn);

      const user = await User.findOneAndUpdate({
        'spotify.id': meData.id
      }, {
        spotify: {
          id: meData.id,
          tokens: {
            access: accessToken,
            refresh: refreshToken,
            expireDate 
          },
          email: meData.email,
          displayName: meData.display_name,
        }
      }, {
        new: true,
        upsert: true,
      })

      const userJwt = jwt.sign({
        email: meData.email,
        spotifyId: meData.id,
        tracknoteId: user._id
      }, JWT_SECRET);

      user.set('jwt', userJwt);
      await user.save();

      res.cookie('tracknotes_token', userJwt, { httpOnly: true });
      return res.json({
        message: 'Successfully logged-in to Spotify and created account',
        data: user
      });
    } else {
      return res.status(403).json({
        message: 'Failed to log-in to Spotify'
      })
    }
  } else {
    return res.status(403).json({
      message: 'Failed to log-in to Spotify'
    });
  }
});

export default router;