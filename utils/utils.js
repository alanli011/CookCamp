const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
	const validationErrors = validationResult(req);
	console.log('validationErrors: ', validationErrors);

	// if the validation errors array is empty, then the function can move on
	if (validationErrors.isEmpty()) return next();

	// if it's not empty, map over the errors and display the error message for each error
	const errors = validationErrors.array().map((error) => error.msg);

	const err = new Error('Bad request.');
	err.errors = errors;
	err.status = 400;
	err.title = 'Bad request.';

	console.log('ending validation errors');

	return next(err);
};

module.exports = { asyncHandler, handleValidationErrors };
