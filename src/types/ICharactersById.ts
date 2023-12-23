import { ISingleCharacter, Voice } from './ICharacters';

export interface ICharactersByIdResponse {
  data: ICharacterById[];
}

export interface ICharacterById {
  character: ISingleCharacter;
  role: string;
  favorites: number;
  voice_actors: Voice[];
}
