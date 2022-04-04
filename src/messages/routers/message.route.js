import express from 'express';
import {homepage, getMessages, getMessage, updateMessage, addMessage, deleteMessage} from '../controllers/message.controllers.js';
import * as authControl from "../../users/controllers/AuthController.js"

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Message
 *         title:
 *           type: string
 *           description: The messasage title
 *         author:
 *           type: string
 *           description: The message author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Messages
  *   description: The messages managing API
  */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Returns the list of all the messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: The list of the messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.get('/', homepage);

router.get('/messages', getMessages);

router.post('/messages',authControl.protect, authControl.restrictTo('user','admin'), addMessage);

router.get('/messages/:id',authControl.protect, authControl.restrictTo('admin'), getMessage);

router.patch('/messages/:id',authControl.protect, authControl.restrictTo('user'), updateMessage);

router.delete('/messages/:id',authControl.protect, authControl.restrictTo('admin'), deleteMessage);

export {router as default};