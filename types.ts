export type MovieApiResponse = {
    results: Movie[];
  };

export type Movie = {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
  };
  