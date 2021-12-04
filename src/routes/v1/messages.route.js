const express = require('express');
const messageController = require('../../controllers/message.controller');
const messageValidation = require('../../validations/message.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Manage application Messages
 */

router.post('/', auth('createMessage'), validate(messageValidation.createMessage), messageController.createMessage);
router.route('/:threadId').get(messageController.threadMessages);

/**
 * @swagger
 * /messages/{messageId}/upVote:
 *   post:
 *     description: Upvote a message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: Id of message to apply vote to.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ok
 *                      
 */
router.route('/:messageId/upVote').post(auth('upVote'), messageController.upVote);

/**
 * @swagger
 * /messages/{messageId}/downVote:
 *   post:
 *     description: Downvote a message
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: Id of message to apply vote to.
 *         schema:
 *           type: string
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: ok
 *                      
 */
router.route('/:messageId/downVote').post(auth('downVote'), messageController.downVote);

module.exports = router;
