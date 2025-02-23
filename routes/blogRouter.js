import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getAll,
  getDetail,
  updateBlog,
} from '../controllers/blogController';
import { authMiddleware } from '../middleware/auth';

const blogRouter = Router();

blogRouter.get('/', getAll);
blogRouter.get('/:id', getDetail);
blogRouter.post('/', createBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.delete('/:id', authMiddleware, deleteBlog);

export default blogRouter;
