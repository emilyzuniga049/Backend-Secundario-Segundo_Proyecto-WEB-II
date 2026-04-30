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

const answerResolvers = {
  Answer: {
    id: (doc) => String(doc._id),
    user: (doc) => doc.id_user
  },

  Query: {
    answersByQuestion: async (_p, { id_question }, ctx) => {
      requireAuth(ctx);

      const question = await Question.findById(id_question);
      if (!question) throw new Error('Pregunta no encontrada');

      const vehicle = await Vehicle.findById(question.id_vehicle);
      const isOwner = String(vehicle.id_user) === String(ctx.user._id);
      const isQuestionOwner = String(question.id_user) === String(ctx.user._id);

      if (!isOwner && !isQuestionOwner) {
        const err = new Error('Forbidden');
        err.extensions = { code: 'FORBIDDEN' };
        throw err;
      }

      return await Answer.find({ id_question })
        .populate('id_user', 'name last_name')
        .sort({ created_at: 1 });
    },

    answersByUser: async (_p, _a, ctx) => {
      requireAuth(ctx);
      return await Answer.find({ id_user: ctx.user._id })
        .populate('id_user', 'name last_name')
        .sort({ created_at: -1 });
    }
  }
};

module.exports = { answerResolvers };