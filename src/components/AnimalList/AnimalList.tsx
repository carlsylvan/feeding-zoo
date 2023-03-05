import { useEffect, useState } from "react";
import { IAnimal } from "../../models/IAnimal";
import { getAnimalsFromApi } from "../../services/animalService";
import { fetchFromLocalStorage, sendToLocalStorage } from "../../services/localStorageService";
import { AnimalInList } from "../AnimalInList/AnimalInList";

export const AnimalList = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [fedAnimals, setFedAnimals] = useState<IAnimal[]>([]);
  const [hungryAnimals, setHungryAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const apiAnimals = await getAnimalsFromApi();
      setAnimals(apiAnimals);
      sendToLocalStorage(apiAnimals);
    };
  
    const localAnimals = fetchFromLocalStorage();
    if (localAnimals && localAnimals.length > 0) {
      setAnimals(localAnimals);
    } else {
      fetchAnimals();
    }
  }, []);

  useEffect(() => {
    const fedAnimals = animals.filter((animal) => animal.isFed);
    const hungryAnimals = animals.filter((animal) => !animal.isFed);
    setFedAnimals(fedAnimals);
    setHungryAnimals(hungryAnimals);
  }, [animals]);

  useEffect(() => {
    sendToLocalStorage(animals);
  }, [animals]);

  const hungryAnimalsHtml = hungryAnimals.map((animal) => {
    return (
      <AnimalInList
        animal={animal}
        key={animal.id}
      ></AnimalInList>
    );
  });

  const fedAnimalsHtml = fedAnimals.map((animal) => {
    return (
      <AnimalInList
        animal={animal}
        key={animal.id}
      ></AnimalInList>
    );
  });

  return (
    <>
      <h2>VRÅLHUNGRIGA DJUR</h2>
      <div className="animals">{hungryAnimalsHtml}</div>
      <h2>PROPPMÄTTA DJUR</h2>
      <div className="animals">{fedAnimalsHtml}</div>
    </>
  );
};