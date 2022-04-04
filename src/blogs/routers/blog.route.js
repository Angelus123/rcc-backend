import express from 'express';
import {homepage, getBlogs, getBlog, updateBlog, addBlog, deleteBlog, addComment} from '../controllers/blog.controllers.js';
import * as authControl from "../../users/controllers/AuthController.js"

import multer from "multer"

const upload = multer ({dest:'uploads/'});
 
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Blogs
  *   description: The blogs managing API
  */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/', homepage);

router.get('/blogs', getBlogs);

router.post('/blogs', authControl.protect, authControl.restrictTo('admin'),addBlog);

router.get('/blogs/:id', getBlog);
router.put('/blogs/:id/comment', addComment);

router.delete('/blogs/:id', authControl.protect, authControl.restrictTo('admin'), deleteBlog);

router.patch('/blogs/:id', updateBlog);

export {router as default};