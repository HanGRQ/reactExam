// Practice 1: adding TrendingMovies page

import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getTrendingMoviesToday } from "../api/tmdb-api";
import Spinner from '../components/spinner';

const TrendingMoviesPage = () => {
  // Fetch trending movies data
  const { data, error, isLoading } = useQuery("trendingMovies", getTrendingMoviesToday);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error fetching trending movies: {error.message}</p>;
  }

  // Map data to match the expected format
  const movies = data.map((movie) => {
    movie.genre_ids = movie.genres ? movie.genres.map(g => g.id) : [];
    return movie;
  });

  return (
    <PageTemplate
      title="Trending Today"
      movies={movies}
      action={(movie) => {
        // Add any action icons if needed, or leave blank
        return <></>;
      }}
    />
  );
};

export default TrendingMoviesPage;
