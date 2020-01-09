export namespace Characters {
  export interface Character {
    avatar: string;
    figure: string;
  }
  export type Party = Array<Character>
}