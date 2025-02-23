import blogModel from '../models/blogModel';
import { createBlogValidate, updateBlogValidate } from '../validations';

async function getAll(req, res) {
  try {
    const { _limit, _sort, _orderBy } = req.query;
    const limit = parseInt(_limit) || 10;
    const sort = _sort || 'createdAt';
    const orderBy = _orderBy == 'asc' ? 1 : -1;

    console.log({ limit, sort, orderBy });
    const blogs = await blogModel
      .find()
      .sort({ [sort]: orderBy })
      .limit(limit);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getDetail(req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createBlog(req, res) {
  try {
    const { error } = createBlogValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((error) => error.message);
      return res.status(400).json({ message });
    }
    const blog = await blogModel.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBlog(req, res) {
  try {
    const { error } = updateBlogValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((error) => error.message);
      return res.status(400).json({ message });
    }
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.json({ message: 'Done' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getAll, getDetail, createBlog, updateBlog, deleteBlog };
