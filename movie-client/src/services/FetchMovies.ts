import React from "react";
import axios from "axios";
import IMovies from "../models/IMovies";

// storing server port to variable
const localAPI: string = "http://localhost:3001";

// fetching movies list based on category
export const fetchMoviesByCategory = async (
  movieListCategory: string | undefined
) => {
  const customAPI = `${localAPI}/${movieListCategory}`;
  return await axios.get(customAPI).then((response) => response.data);
};

//fetch movies
export const fetchMovie = async (type?: string, movieId?: string) => {
  if (movieId) {
    const customAPI = `${localAPI}/${type}?id=${movieId}`;
    return axios.get(customAPI).then((response) => response.data);
  }
  const customAPI = `${localAPI}/${type}`;
  return axios.get(customAPI).then((response) => response.data);
};

///////////////////add to favourites///////////////////
export const addToFavourites = async (movie: IMovies) => {
  return axios
    .post(`${localAPI}/favourite`, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.status);
};

////////////////remove from favourites//////////////////
export const removeFromFavourites = async (movieId: number) => {
  // fetch from favoutites
  const customAPI = `${localAPI}/favourite/${movieId}`;
  // delete
  return axios.delete(customAPI).then((response) => response.status);
};

//////////////fetch favourites list//////////////////

export const fetchFavouriteMovies = async (movieName?: string) => {
  if (typeof movieName == "string") {
    const customAPI = `${localAPI}/favourite?title=${movieName}`;
    return axios.get(customAPI).then((response) => response.data);
  }
  return axios.get(`${localAPI}/favourite`).then((response) => response.data);
};
