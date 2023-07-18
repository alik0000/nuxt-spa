export interface ICharacter {
    id: number | string,
    name: string,
    status: string,
    species: string,
    type: string,
    image: string,
    gender: 'Female' | 'Male' | 'Genderless' | unknown,
    episode: string[],
    url: string,
}
