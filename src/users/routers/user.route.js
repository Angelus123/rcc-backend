import express from 'express';
import {homepage, getUsers, getUser, updateUser, addUser, deleteUser} from '../controllers/user.controllers.js';
import signup from '../middlewares/user.middlewares.js'
import * as AuthController from "../controllers/AuthController.js"

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: The user title
 *         author:
 *           type: string
 *           description: The user author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)

router.get('/', homepage);

router.get('/users', getUsers);

router.post('/users', signup, addUser);

router.get('/users/:id', getUser);

router.patch('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export {router as default};