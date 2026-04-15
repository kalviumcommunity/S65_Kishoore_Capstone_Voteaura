/**
 * Simple input validation helpers.
 * These are lightweight validators — no extra dependencies needed.
 */

/**
 * Check if a value is a non-empty trimmed string.
 */
const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

/**
 * Check if a string is a valid email format.
 */
const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

/**
 * Check if a string is a valid MongoDB ObjectId format.
 */
const isValidObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);

/**
 * Middleware factory: Validate that required body fields are present and non-empty.
 *
 * Usage:
 *   router.post('/signup', validateRequiredFields('name', 'email', 'phone'), handler)
 *
 * @param  {...string} fields - Names of required body fields
 */
const validateRequiredFields = (...fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => !isNonEmpty(req.body[field]));

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };
};

/**
 * Middleware: Validate that `req.params.id` is a valid MongoDB ObjectId.
 */
const validateObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID format.' });
  }
  next();
};

module.exports = {
  isNonEmpty,
  isValidEmail,
  isValidObjectId,
  validateRequiredFields,
  validateObjectId,
};
