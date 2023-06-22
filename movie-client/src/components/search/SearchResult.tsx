import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IMovies from "../../models/IMovies";
import { fetchMoviesByCategory } from "../../services/FetchMovies";
import Card from "../cards/Card";

type Props = {
  searchValue: string;
};

export default function SearchResult({ searchValue }: Props) {
  const [moviesData, setMoviesData] = useState<IMovies[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovies[]>([]);
  const location = useLocation();

  let categoryName: string | undefined =
    location.state?.type || "movies-in-theaters";

  const fetchMovies = async () => {
    try {
      const movies = await fetchMoviesByCategory(categoryName);
      setMoviesData(movies);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [categoryName]);

  useEffect(() => {
    const filteredData = searchValue
      ? moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchValue)
        )
      : moviesData;
    setFilteredMovies(filteredData);
  }, [moviesData, searchValue]);

  return (
    <>
      {filteredMovies.map((movie) => {
        return (
          <Card
            key={movie.id}
            movie={movie}
            category={categoryName}
            fetchMoviesList={fetchMovies}
          />
        );
      })}
    </>
  );
}

type CardProps = {
  movie: IMovies;
  category: string | undefined;
  fetchMoviesList(): void;
};
