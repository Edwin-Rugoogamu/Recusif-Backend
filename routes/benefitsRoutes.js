const express = require('express');
const router = express.Router();
const benefits  = require('../controllers/benefitsControllers')
const cors = require("cors");


/**
 * @swagger
 * components:
 *      schemas:
 *          benefits:
 *             type: object
 *             parameters:
 *                benefits_id:
 *                   type:integer
 *                name:
 *                   type:string
 *                description:
 *                   type:string
 *                eligibility_criteria:
 *                   type:string
 *             example:
 *               benefits_id: 1
 *               name: Shoes
 *               description: nike
 *               eligibility_criteria: yaa
 */

 /**
  * @swagger
  * tags:
  *   name: Benefits
  *   description: This is used for managing the benefits 
  */


/**
 * @swagger
 * /benefits:
 *   post:
 *     summary: Create a benefit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/benefits'
 *     responses:
 *       200:
 *         description: Benefit created
 */
router.post("/benefits", benefits.post );
/**
 * @swagger
 * /benefits:
 *   get:
 *     summary: Posts benefits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/benefits'
 *     responses:
 *       200:
 *         description: list of benefits
 */

router.get("/benefits", benefits.get);
/**
 * @swagger
 * /benefits/{id}:
 *   get:
 *     summary: Get benefits by Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/benefits'
 *     responses:
 *       200:
 *         description: Benefit got
 */

router.get("/benefits/:id", benefits.getById);
/**
 * @swagger
 * /benefits/{id}:
 *   put:
 *     summary: Edit benefits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/benefits'
 *     responses:
 *       200:
 *         description: Benefit posted
 */

router.put("/benefits/:id", benefits.updateUserById);

module.exports = router