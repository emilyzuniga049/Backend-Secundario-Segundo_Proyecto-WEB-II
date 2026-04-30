const User = require('../../models/user');

function requireAuth(ctx) {
  if (!ctx.user) {
    const err = new Error('Authentication token required');
    err.extensions = { code: 'UNAUTHENTICATED' };
    throw err;
  }
  return ctx.user;
}

const userResolvers = {
  User: {
    id: (doc) => String(doc._id)
  },

  Query: {
    me: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return ctx.user;
    }
  }
};

module.exports = { userResolvers };