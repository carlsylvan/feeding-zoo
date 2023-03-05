import axios from "axios";
import { IAnimal } from "../models/IAnimal";
import { IApiResponse } from "../models/IApiResponse";

export const getAnimalsFromApi = async (): Promise<IAnimal[]> => {
    let response = await axios.get<IAnimal[]>(
      "https://animals.azurewebsites.net/api/animals/"
    );
  
    return response.data;
  };

  export const getAnimalById = async (id: number): Promise<IApiResponse> => {
    try {
      let response = await axios.get<IAnimal>(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/products/" +
          id
      );
  
      return { animal: response.data, error: "" };
    } catch {
      return { error: "Fel" };
    }
  };
  