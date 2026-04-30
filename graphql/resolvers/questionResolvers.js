const Answer = require('../../models/answer');
const Question = require('../../models/question');
const Vehicle = require('../../models/vehicle');

function requireAuth(ctx) {
  if (!ctx.user) {
    const err = new Error('Authentication token required');
    err.extensions = { code: 'UNAUTHENTICATED' };
    throw err;
  }
  return ctx.user;
}

const questionResolvers = {
  Question: {
    id: (doc) => String(doc._id),
    user: (doc) => doc.id_user,
    answer: async (doc) => await Answer.findOne({ id_question: doc._id })
  },

  Query: {
    questionsByVehicle: async (_p, { id_vehicle }, ctx) => {
      requireAuth(ctx);

      const vehicle = await Vehicle.findById(id_vehicle);
      if (!vehicle) throw new Error('Vehículo no encontrado');

      const isOwner = String(vehicle.id_user) === String(ctx.user._id);
      const filter = { id_vehicle };

      // Non-owners only see their own questions
      if (!isOwner) filter.id_user = ctx.user._id;

      return await Question.find(filter)
        .populate('id_user', 'name last_name')
        .sort({ created_at: -1 });
    },

    questionsByUser: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return await Question.find({ id_user: ctx.user._id })
        .populate('id_user', 'name last_name')
        .sort({ created_at: -1 });
    }
  }
};

module.exports = { questionResolvers };