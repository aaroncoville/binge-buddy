// Define the schema for a movie.
import { makeObjectSchema, makeParameter, makeSchema, makeSyncTable, ValueType, ParameterType } from '@codahq/packs-sdk';
import { fetchMovieData } from './helpers';

// Define the schema for a movie.
export const MovieSchema = makeObjectSchema({
    type: ValueType.Object,
    properties: {
        title: { type: ValueType.String },
        release_date: { type: ValueType.String },
        vote_average: { type: ValueType.Number },
    },
    id: 'id',
    primary: 'title',
});

// Define the sync table.
export const MoviesSyncTable = makeSyncTable({
  name: 'Movies',
  schema: makeSchema({
    type: ValueType.Array,
    items: {
      type: ValueType.Object,
      properties: MovieSchema.properties,
      id: MovieSchema.id,
      primary: MovieSchema.primary,
    },
  }),
  identityName: 'Movie',
  formula: {
    name: 'FetchMovies',
    description: 'Fetches movies',
    parameters: [
      makeParameter({
        type: ParameterType.String,
        name: 'query',
        description: 'Search query',
      }),
    ],
    execute: fetchMovieData,
  },
});