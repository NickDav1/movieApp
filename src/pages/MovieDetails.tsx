import React from 'react';
import { useParams } from 'react-router';

const MovieDetail: React.FC<{ movie: any }> = ({ movie }) => {
    const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <p>{movie.vote_average}</p>
      <p>{movie.overview}</p>
      {/* Add other movie details as needed */}
    </div>
  );
};

export default MovieDetail;