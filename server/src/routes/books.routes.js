import express from 'express';
import { checker } from '../middleware/auth.middleware.js';
import { addBooks, getBooks } from '../controllers/books.controller.js';
import { bookSchema } from '../utils/schema.js';
import { validateBody } from '../middleware/validator.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         publicationYear:
 *           type: string
 *           description: The publication year of the book
 *         subject:
 *           type: string
 *           description: The subject of the book
 *
 * /api/v1/books/register:
 *   post:
 *     summary: Books registration
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publicationYear:
 *                 type: string
 *               subject:
 *                 type: string
 *             required:
 *               - name
 *               - author
 *               - publisher
 *               - publicationYear
 *               - subject
 *     responses:
 *       '200':
 *         description: Book added successfully
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 *
 * /api/v1/books/allbooks:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success - Returns all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       '401':
 *         description: Unauthorized - User not authenticated
 *       '403':
 *         description: Forbidden - User does not have the required role
 *       '500':
 *         description: Internal server error
 */

router.post('/register', validateBody(bookSchema), checker, addBooks);
router.get('/allbooks', checker, getBooks);

export default router;
