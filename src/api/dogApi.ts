const API_URL = 'https://dog.ceo/api';

export async function getBreedImage(breed: string) {
    const response = await fetch(
        `${API_URL}/breed/${breed}/images/random`
    );
    
    const text = await response.text();

    const data = JSON.parse(text);

    return data.message;
}