import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';

interface IAnimalProps {
  animal: IAnimal;
}

export const AnimalInList = (props: IAnimalProps) => {
  const navigate = useNavigate();

  const showMoreClick = () => {
    navigate(`/animal/${props.animal.id}`);
  };

  return (
    <div className="animal-container">
      <h4>{props.animal.name}</h4>
      <div className="image-container">
        <img src={props.animal.imageUrl} alt={props.animal.latinName} />
      </div>
      <p>{props.animal.shortDescription}</p>
      <button onClick={showMoreClick}>Gå till {props.animal.name}</button>
    </div>
  );
};