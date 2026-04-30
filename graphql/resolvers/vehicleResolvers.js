const User = require('../../models/user');
const Vehicle = require('../../models/vehicle');

function requireAuth(ctx) {
  if (!ctx.user) {
    const err = new Error('Authentication token required');
    err.extensions = { code: 'UNAUTHENTICATED' };
    throw err;
  }
  return ctx.user;
}

const vehicleResolvers = {
  Vehicle: {
    id: (doc) => String(doc._id),
    owner: async (doc) => await User.findById(doc.id_user).select('-password')
  },

  Query: {
    vehicles: async (_p, args) => {
      const { brand, model, status, minYear, maxYear, minPrice, maxPrice, page = 1, limit = 10 } = args;

      const filters = {};
      if (brand) filters.brand = brand;
      if (model) filters.model = model;
      if (status) filters.status = status;
      if (minYear || maxYear) {
        filters.year = {};
        if (minYear) filters.year.$gte = minYear;
        if (maxYear) filters.year.$lte = maxYear;
      }
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = minPrice;
        if (maxPrice) filters.price.$lte = maxPrice;
      }

      const skip = (page - 1) * limit;
      const total = await Vehicle.countDocuments(filters);
      const results = await Vehicle.find(filters).skip(skip).limit(limit);

      return {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        results
      };
    },

    vehicle: async (_p, { id }) => {
      return await Vehicle.findById(id).populate('id_user');
    },

    vehiclesByUser: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return await Vehicle.find({ id_user: ctx.user._id });
    }
  }
};

module.exports = { vehicleResolvers };