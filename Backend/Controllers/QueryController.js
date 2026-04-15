const Query = require('../Models/QueryModel');
const nodemailer = require('nodemailer');

/**
 * POST /api/queries/respond
 * Send an email response to a user's query.
 */
const sendQueryResponse = async (req, res, next) => {
  const { email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending query response email:', error);
    next(error);
  }
};

/**
 * POST /api/queries/
 * Submit a new support query.
 */
const querymode = async (req, res, next) => {
  try {
    const { email, subject, message } = req.body;
    const newQuery = new Query({ email, subject, message });
    await newQuery.save();
    res.status(201).json({ message: 'Query sent successfully' });
  } catch (error) {
    console.error('Error raising query:', error);
    next(error);
  }
};

/**
 * GET /api/queries/
 * Retrieve all support queries.
 */
const getquery = async (req, res, next) => {
  try {
    const queries = await Query.find().sort({ _id: -1 }); // Newest first
    res.status(200).json(queries);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/queries/:id/solve
 * Mark a query as solved.
 */
const marsolved = async (req, res, next) => {
  try {
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { solved: true },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json({ message: 'Marked as solved', query });
  } catch (error) {
    next(error);
  }
};

module.exports = { querymode, getquery, sendQueryResponse, marsolved };
