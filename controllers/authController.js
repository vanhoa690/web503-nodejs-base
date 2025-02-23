import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import { registerValidate, loginValidate } from '../validations';

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const { error } = registerValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((error) => error.message);
      return res.status(400).json({ message });
    }
    const user = await userModel.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: 'da ton tai' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.json({ ...newUser.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, email, password } = req.body;
    const { error } = loginValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((error) => error.message);
      return res.status(400).json({ message });
    }
    const user = await userModel.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(400).json({ message: 'ko  hop le' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Ko hop le' });
    }
    const token = jwt.sign({ id: user._id }, 'hoadv', { expiresIn: '1w' });
    res.json({ ...user.toObject(), password: undefined, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register, login };
