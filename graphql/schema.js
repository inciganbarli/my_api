const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const Movie = require("../models/Movie");

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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      description: "Get all movies",
      resolve() {
        return Movie.findAll({ limit: 100 });
      },
    },

    movie: {
      type: MovieType,
      description: "Get a single movie by ID",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return Movie.findByPk(args.id);
      },
    },

    moviesByGenre: {
      type: new GraphQLList(MovieType),
      description: "Get movies filtered by genre",
      args: {
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Movie.findAll({ where: { genre: args.genre } });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createMovie: {
      type: MovieType,
      description: "Create a new movie (requires JWT auth via Authorization header)",
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        release_year: { type: new GraphQLNonNull(GraphQLInt) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
        duration: { type: GraphQLInt },
        director: { type: GraphQLString },
      },
      resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Unauthorized. Provide a valid JWT token in the Authorization header.");
        }
        return Movie.create(args);
      },
    },

    updateMovie: {
      type: MovieType,
      description: "Update an existing movie (requires JWT auth)",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        release_year: { type: GraphQLInt },
        genre: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        duration: { type: GraphQLInt },
        director: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Unauthorized. Provide a valid JWT token in the Authorization header.");
        }
        const movie = await Movie.findByPk(args.id);
        if (!movie) throw new Error("Movie not found.");
        const { id, ...fields } = args;
        await movie.update(fields);
        return movie;
      },
    },

    deleteMovie: {
      type: GraphQLBoolean,
      description: "Delete a movie by ID (requires JWT auth)",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args, context) {
        if (!context.user) {
          throw new Error("Unauthorized. Provide a valid JWT token in the Authorization header.");
        }
        const movie = await Movie.findByPk(args.id);
        if (!movie) throw new Error("Movie not found.");
        await movie.destroy();
        return true;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
