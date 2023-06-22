import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IMovies from "../../models/IMovies";
import {
  addToFavourites,
  fetchFavouriteMovies,
  removeFromFavourites,
} from "../../services/FetchMovies";

import "./Card.css";

type CardProps = {
  movie: IMovies;
  category: string | undefined;
  fetchMoviesList(): void;
};

const Card = ({ movie, category, fetchMoviesList }: CardProps) => {
  const navigate = useNavigate();

  const addFavourites = async (movie: IMovies) => {
    let favourites = await fetchFavouriteMovies();

    let alreadyFavourite = favourites.some(
      (favoriteMovie: IMovies) => favoriteMovie.title === movie.title
    );

    if (alreadyFavourite) {
      // alert(`Oops! ${movie.title} is already added to favourites!`);
      toast.warn(
        `Oops! looks like "${movie.title}" is already added to favourites!`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }

    const result = await addToFavourites(movie);

    if (result === 201) {
      // alert(`${movie.title} added to favourites`);
      toast.success(`"${movie.title}" added to favourites`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      console.log(result);
    }
  };

  const removeFavourites = async (movie: IMovies) => {
    const movieDetails = await fetchFavouriteMovies(movie.title);
    const result = await removeFromFavourites(movieDetails[0].id);

    if (result === 200) {
      // alert(`${movie.title} removed from favourites!`);
      toast.error(`"${movie.title}" removed from favourites!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      /*The function received as prop from parent component is  
      being used to re-render the page.*/
      fetchMoviesList();
    }
  };

  const cardImageLink = async (movie: IMovies) => {
    let url = `/${movie.title}`;
    ///////////type or tab:
    navigate(url, { state: { type: category, id: movie.id } });
  };

  //////////change the ui cards and class names
  return (
    <div className="movie__card" key={movie.id}>
      <div className="mc__image__container">
        <img
          src={movie.posterurl}
          alt={movie.title}
          className="mc__image"
          onClick={() => cardImageLink(movie)}
        />
      </div>
      <div className="mc__details">
        <h2 className="mc__title">{movie.title}</h2>
        {category == "favourite" ? (
          <>
            <button
              className="Favourites"
              onClick={() => removeFavourites(movie)}
            >
              Remove from Favourites{" "}
              <span className="icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heartbreak icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.867 14.41c13.308-9.322 4.79-16.563.064-13.824L7 3l1.5 4-2 3L8 15a38.094 38.094 0 0 0 .867-.59Zm-.303-1.01-.971-3.237 1.74-2.608a1 1 0 0 0 .103-.906l-1.3-3.468 1.45-1.813c1.861-.948 4.446.002 5.197 2.11.691 1.94-.055 5.521-6.219 9.922Zm-1.25 1.137a36.027 36.027 0 0 1-1.522-1.116C-5.077 4.97 1.842-1.472 6.454.293c.314.12.618.279.904.477L5.5 3 7 7l-1.5 3 1.815 4.537Zm-2.3-3.06-.442-1.106a1 1 0 0 1 .034-.818l1.305-2.61L4.564 3.35a1 1 0 0 1 .168-.991l1.032-1.24c-1.688-.449-3.7.398-4.456 2.128-.711 1.627-.413 4.55 3.706 8.229Z" />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <>
            <button className="Favourites" onClick={() => addFavourites(movie)}>
              Add to Favourites{" "}
              <span className="icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart icon"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
