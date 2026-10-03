import type { BreedSearchItem } from '../types/dog';

const API_URL = 'https://dog.ceo/api';

export async function getBreedImage(breed: string) {
    const response = await fetch(
        `${API_URL}/breed/${breed}/images/random`
    );

    const data = await response.json();

    return data.message;
}

export async function getSubBreeds(breed: string) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/list`
    );

    const data = await response.json();

    return data.message;
}

export async function getSubBreedImage(breed: string, subBreed: string) {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
    )

    const data = await response.json();

    return data.message;
}

export async function getAllBreeds(): Promise<BreedSearchItem[]> {
    const response = await fetch(`${API_URL}/breeds/list/all`);

    if(!response.ok) {
        throw new Error('Unable to load dog breeds');
    }

    const data = await response.json();

    return Object.entries(
        data.message as Record<string, string[]>
    ).flatMap(([group, subBreeds]) => [
        { name: group },
        ...subBreeds.map((subBreeds) => ({
            name: subBreeds,
            group,
        })),
    ]);
}