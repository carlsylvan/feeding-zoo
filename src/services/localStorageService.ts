import { IAnimal } from "../models/IAnimal";

export const fetchFromLocalStorage = () => {
  const localStorageAnimals = localStorage.getItem("localStorageAnimals");
  return localStorageAnimals ? JSON.parse(localStorageAnimals) : [];
};

export const sendToLocalStorage = (animals: IAnimal[]) => {
  const existingData = fetchFromLocalStorage();
  if (!existingData || existingData.length === 0) {
    localStorage.setItem("localStorageAnimals", JSON.stringify(animals));
  }
};

