import express from "express";
import { validateBody } from "../middleware/validator.middleware.js";
import { loginSchema, userSchema } from "../utils/schema.js";
import {
  createUser,
  getUserDetails,
  loginUser,
  verifyUser,
} from "../controllers/user.contoller.js";
import { checker } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */
/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Get user details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the User
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the User
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */
router.post("/login", validateBody(loginSchema), loginUser);

/**
 * @openapi
 * /api/v1/users/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the User
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the User
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */
router.post("/register", validateBody(userSchema), createUser);

/**
 * @openapi
 * /api/v1/users/verify:
 *   post:
 *     summary: Verify user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the User
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: User verified successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */
router.post("/verify", verifyUser);

/**
 * @openapi
 * /api/v1/users/account:
 *   get:
 *     summary: Get user details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */
router.get("/account", checker, getUserDetails);

export default router;
