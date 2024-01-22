const express = require("express");
const router = express.Router();
const authentication = require("../controllers/loginControllers");



/**
 * @swagger
 * components:
 *      schemas:
 *          users:
 *             type: object
 *             parameters:
 *                idusers:
 *                   type:integer
 *                name:
 *                   type:string
 *                role:
 *                   type:string
 *                department:
 *                   type:string
 *                email:
 *                   type:string
 *             example:
 *               midusers: 10
 *               name: Edwin
 *               role: employee
 *               department: food
 *               email: edwin@gmail.com
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: This is used for managing the Users 
  */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: User created
 */
router.post("/signup", authentication.signUp);
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a user
 *     content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       200:
 *         description: User created
 */

router.post("/login", authentication.login);



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: Users Got
 */
router.get("/users", authentication.get);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     parameters:
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: User Got
 */

router.get("/users/:id", authentication.getById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edit a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: User Edited
 */

router.put("/users/:id", authentication.updateUserById);


module.exports = router;
