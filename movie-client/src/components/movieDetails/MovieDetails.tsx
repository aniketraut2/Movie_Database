import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IMovies from "../../models/IMovies";
import { fetchMovie } from "../../services/FetchMovies";
import "./MovieDetails.css";

function MovieDetails() {
  const location = useLocation();
  const categoryName = location.state?.type;
  const movieId = location.state?.id;

  const [movieData, setMovieData] = useState<IMovies[]>([]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const movie = await fetchMovie(categoryName, movieId);
      setMovieData(movie);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, []);

  return (
    <>
      {movieData.map((movie) => {
        return (
          <Fragment key={movie.id}>
            <div className="md__container">
              <h2 className="md__title">{`${
                movie.title
              } (${movie.releaseDate?.slice(0, 4)})`}</h2>
              <div className="md__image">
                <img src={movie.posterurl} alt={movie.title} />
              </div>
              <div className="md__info">
                <div className="md__rating">
                  <div className="md__label">IMDb Rating:</div>
                  <div className="md__value">{movie.imdbRating}</div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Content Rating:</div>
                  <div className="md__value value__border__rating">
                    <strong>{movie.contentRating}</strong>
                  </div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Average Rating:</div>
                  <div className="md__value">{movie.averageRating}</div>
                </div>
                <div className="md__rating">
                  <div className="md__label"> Rating:</div>
                  <div className="md__value">
                    {movie.ratings && movie.ratings.length > 0
                      ? (
                          movie.ratings.reduce((acc, curr) => acc + curr, 0) /
                          movie.ratings.length
                        ).toFixed(2)
                      : "N/A"}
                  </div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Duration:</div>
                  <div className="md__value">{movie.duration}</div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Genres:</div>
                  <div className="md__value value__border">
                    {movie.genres?.join()}
                  </div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Actors:</div>
                  <div className="md__value">{movie.actors?.join()}</div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Release Date:</div>
                  <div className="md__value">{movie.releaseDate}</div>
                </div>
                <div className="md__rating">
                  <div className="md__label">Storyline:</div>
                  <div className="md__value">{movie.storyline}</div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export default MovieDetails;
