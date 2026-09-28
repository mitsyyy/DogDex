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