import Joi from 'joi';

const registerValidate = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const loginValidate = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
}).or('username', 'email');

const createBlogValidate = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
});

const updateBlogValidate = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  author: Joi.string(),
});

export {
  registerValidate,
  loginValidate,
  createBlogValidate,
  updateBlogValidate,
};
