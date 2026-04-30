require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createYoga, createSchema } = require('graphql-yoga');

const { typeDefs } = require('./graphql/schema/typeDefs');
const { resolvers } = require('./graphql/resolvers/index');
const { buildContext } = require('./graphql/context');

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('error', (err) => console.log(err));
mongoose.connection.once('connected', () => console.log('Database connected'));

const app = express();

app.use(cors({
  domains: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: buildContext,
  graphqlEndpoint: '/graphql',
  maskedErrors: false
});

app.use('/graphql', yoga);

app.listen(process.env.PORT, () =>
  console.log(`GraphQL API running on port ${process.env.PORT}`)
);