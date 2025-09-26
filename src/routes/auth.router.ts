import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { protectAuth } from '../middleware/auth-middleware';
const router = express.Router();

// Acess : public
// POST : login
// Params body : username , password
router.post('/login', AuthController.validateLoginData, AuthController.login);

// Acess : Private
// POST : logout

router.post('/logout', protectAuth, AuthController.logout);

router.get('/me', protectAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }

  return res.json({
    success: true,
    data: {
      account_id: req.user.account_id,
      username: req.user.username,
      role: req.user.role,
    },
  });
});

export default router;
