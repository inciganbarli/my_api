const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const Movie = require("../models/Movie");

// define what a Movie looks like in GraphQL
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    release_year: { type: GraphQLInt },
    genre: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    duration: { type: GraphQLInt },
    director: { type: GraphQLString },
  }),
});

// define the queries (what you can ask for)
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // get all movies
    movies: {
      type: new GraphQLList(MovieType),
      description: "Get all movies",
      resolve() {
        return Movie.findAll();
      },
    },

    // get a single movie by id
    movie: {
      type: MovieType,
      description: "Get a single movie by ID",
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Movie.findByPk(args.id);
      },
    },

    // get movies by genre
    moviesByGenre: {
      type: new GraphQLList(MovieType),
      description: "Get movies by genre",
      args: {
        genre: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Movie.findAll({ where: { genre: args.genre } });
      },
    },
  },
});

// create and export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
