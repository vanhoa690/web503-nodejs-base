import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

async function authMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'ko co token' });
    }
    const decoded = jwt.verify(token, 'hoadv');

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'not found xx' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'ko phai admin' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { authMiddleware };
