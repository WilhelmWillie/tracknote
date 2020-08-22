import { Router } from 'express';

import { spotifyAuthMiddleware } from '../middleware';

const router = Router();

router.get('/', spotifyAuthMiddleware, async (req, res) => {
  const user = req.user;

  if (user) {
    return res.json({
      data: user
    })
  } else {
    return res.status(403).json({
      error: {
        status: 403,
        message: "Could not successfully retrieve profile data"
      }
    })
  }
})

export default router;