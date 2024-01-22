
const express = require('express');
const router = express.Router();
const chat  = require('../controllers/chatMessageControllers')
const cors = require("cors");


/**
 * @swagger
 * components:
 *      schemas:
 *          chat:
 *             type: object
 *             parameters:
 *                message_id:
 *                   type:integer
 *                   default:yaa
 *                sender_id:
 *                   type:integer
 *                recipient_id:
 *                   type:integer
 *                content:
 *                   type:string
 *                timestamp:
 *                   type:string
 *             example:
 *               message_id: d5fE_asz
 *               sender_id: 1
 *               recipient_id: 1
 *               content: The New Turing Omnibus
 *               timestamp: 2024-01-19T21:06:45.000Z
 */

 /**
  * @swagger
  * tags:
  *   name: Chat
  *   description: This is used for managing the Chats 
  */
/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Create a Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/chat'
 *     responses:
 *       200:
 *         description: Chat created
 */

router.post("/chat", chat.post );
/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Get a Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/chat'
 *     responses:
 *       200:
 *         description: Chat got
 */
router.get("/chat", chat.get);
/**
 * @swagger
 * /chat/{id}:
 *   get:
 *     summary: Get  a specific Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/chat'
 *     responses:
 *       200:
 *         description: Chat 
 */

router.get("/chat/:id", chat.getById);



module.exports = router