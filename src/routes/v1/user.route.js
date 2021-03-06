const express = require('express');
const userController = require('../../controllers/user.controller');
const userValidation = require('../../validations/user.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/', validate(userValidation.createUser), userController.createUser);
router.route('/newToken').get(userController.newToken);

module.exports = router;
