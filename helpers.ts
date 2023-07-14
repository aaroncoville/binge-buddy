import { FetchRequest, FetchResponse, SyncExecutionContext, SyncFormulaResult } from "@codahq/packs-sdk";
import { Movie, MovieApiResponse } from "./types";

export async function fetchMovieData([query]: [string], context: SyncExecutionContext): Promise<SyncFormulaResult<string, string, Movie[]>> {
    // Use the API key in the URL to fetch movie data.
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;

    const request: FetchRequest = {
        method: "GET",
        url: url,
    };

    const response: FetchResponse = await context.fetcher.fetch(request);

    if (response.status !== 200) {
        throw new Error(`Failed to fetch movie data: ${response.status}`);
    }

    const body = response.body;

    if (typeof body !== 'object' || !('results' in body)) {
        throw new Error(`Unexpected response format: ${JSON.stringify(body)}`);
    }

    const apiResponse = body as MovieApiResponse;
    const movies = apiResponse.results.map(result => {
        return {
            id: result.id,
            title: result.title,
            release_date: result.release_date,
            vote_average: result.vote_average,
        };
    });

    return {
        result: movies,
    };
}
