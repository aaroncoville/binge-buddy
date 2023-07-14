// This import statement gives you access to all parts of the Coda Packs SDK.
import * as coda from "@codahq/packs-sdk";
import { fetchMovieData } from './helpers';
import { MoviesSyncTable, MovieSchema } from './schemas';

// This line creates your new Pack.
export const pack = coda.newPack();

pack.setVersion('0.1.0');
pack.defaultAuthentication = {
  type: coda.AuthenticationType.HeaderBearerToken,
  instructionsUrl: 'https://developers.themoviedb.org/3/getting-started/authentication',
}
pack.networkDomains = ['api.themoviedb.org'];

pack.addFormula({
  name: 'SearchMovies',
  description: 'Search for movies by title.',
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: 'title',
      description: 'The title of the movie to search for.',
    }),
  ],
  resultType: coda.ValueType.Array,
  schema: MoviesSyncTable.schema,
  execute: async function ([query], context) {
    const movies = await fetchMovieData(query, { ...context, sync: true });
    return movies.result.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
      };
    });
  },
});