import { createContext, useState } from "react";

const FavouritesContext = createContext();

export function FavouritesContextProvider({ children }) {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteTVs, setFavouriteTVs] = useState([]);
  const [favouritePeople, setFavouritePeople] = useState([]);

  function addFavouriteMovies(movieID) {
    setFavouriteMovies((prev) => [...prev, movieID]);
  }

  function removeFavouriteMovies(movieID) {
    setFavouriteMovies((prev) => prev.filter((id) => id !== movieID));
  }

  function addFavouriteTVs(TVID) {
    setFavouriteTVs((prev) => [...prev, TVID]);
  }

  function removeFavouriteTVs(TVID) {
    setFavouriteTVs((prev) => prev.filter((id) => id !== TVID));
  }

  function addFavouritePeople(peopleID) {
    setFavouritePeople((prev) => [...prev, peopleID]);
  }

  function removeFavouritePeople(peopleID) {
    setFavouritePeople((prev) => prev.filter((id) => id !== peopleID));
  }

  const context = {
    favouriteMovies,
    favouriteTVs,
    favouritePeople,
    addFavouriteMovies,
    addFavouritePeople,
    addFavouriteTVs,
    removeFavouriteMovies,
    removeFavouritePeople,
    removeFavouriteTVs,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
