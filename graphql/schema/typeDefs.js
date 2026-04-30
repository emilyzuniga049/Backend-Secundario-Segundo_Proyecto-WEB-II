const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String
    last_name: String
    email: String!
    id_number: String
    status: String
  }

  type Vehicle {
    id: ID!
    brand: String
    model: String
    description: String
    year: Int
    price: Float
    image_path: String
    status: String
    owner: User
    createdAt: String
  }

  type Question {
    id: ID!
    message: String!
    created_at: String
    user: User
    answer: Answer
  }

  type Answer {
    id: ID!
    message: String!
    created_at: String
    user: User
  }

  type VehicleList {
    total: Int
    page: Int
    totalPages: Int
    results: [Vehicle]
  }

  type Query {
    me: User
    vehicles(
      brand: String
      model: String
      status: String
      minYear: Int
      maxYear: Int
      minPrice: Float
      maxPrice: Float
      page: Int
      limit: Int
    ): VehicleList
    vehicle(id: ID!): Vehicle
    vehiclesByUser: [Vehicle]
    questionsByVehicle(id_vehicle: ID!): [Question]
    questionsByUser: [Question]
    answersByQuestion(id_question: ID!): [Answer]
    answersByUser: [Answer]
  }
`;

module.exports = { typeDefs };