const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function buildContext({ request }) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

  let user = null;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      user = await User.findById(payload.userId || payload.id);
    } catch {
      user = null;
    }
  }

  return { user };
}

module.exports = { buildContext };