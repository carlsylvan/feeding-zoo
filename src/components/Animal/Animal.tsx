import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { fetchFromLocalStorage, sendToLocalStorage } from "../../services/localStorageService";

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>();
  const { id } = useParams();

  useEffect(() => {
    const getAnimal = () => {
      if (id) {
        const localAnimals: IAnimal[] = fetchFromLocalStorage();
        const localAnimal = localAnimals.find((a: IAnimal) => a.id === +id);
        if (localAnimal) {
          setAnimal(localAnimal);
        }
      }
    };
  
    getAnimal();
  }, [id]);

  const feedAnimal = () => {
    if (animal) {
      const updatedAnimal: IAnimal = {
        ...animal,
        isFed: true,
        lastFed: new Date().toLocaleString('sv-SE'),
      };
      setAnimal(updatedAnimal);
      const localAnimals: IAnimal[] = JSON.parse(localStorage.getItem('localStorageAnimals') || '[]');
      const index = localAnimals.findIndex((a: IAnimal) => a.id === animal.id);
      localAnimals[index] = updatedAnimal;
      localStorage.setItem('localStorageAnimals', JSON.stringify(localAnimals));
    }
  };


  const displayIsFed = (
    <p className="displayIsFed">Du har redan matat {animal?.name}. {animal?.name} är proppmätt.</p>
  );

  return (
    <div className="animal">
      <img src={animal?.imageUrl} alt={animal?.latinName} />{" "}
      <h3>{animal?.name}</h3>
      <p>{animal?.longDescription}</p>
      <p>{animal?.name} blev senast matad: {animal?.lastFed}</p>
      {animal?.isFed ? displayIsFed : <button onClick={feedAnimal}>Mata {animal?.name}</button>}
    </div>
  );
};