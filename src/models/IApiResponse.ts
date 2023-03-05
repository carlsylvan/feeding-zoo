import { IAnimal } from "./IAnimal";

export interface IApiResponse {
  animal?: IAnimal;
  error: string;
}
