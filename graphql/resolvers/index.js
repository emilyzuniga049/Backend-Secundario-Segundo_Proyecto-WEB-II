const { userResolvers } = require('./userResolvers');
const { vehicleResolvers } = require('./vehicleResolvers');
const { questionResolvers } = require('./questionResolvers');
const { answerResolvers } = require('./answerResolvers');

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...vehicleResolvers.Query,
    ...questionResolvers.Query,
    ...answerResolvers.Query
  },
  User: userResolvers.User,
  Vehicle: vehicleResolvers.Vehicle,
  Question: questionResolvers.Question,
  Answer: answerResolvers.Answer
};

module.exports = { resolvers };