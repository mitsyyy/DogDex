import { createContext, useContext, useState } from 'react';
import type { Dog } from '../types/dog';

type DogContextType = {
    savedDogs: Dog[];
    favoriteDogs: Dog[];
    addSavedDog: (dog: Dog) => void;
    removeSavedDog: (name: string) => void;
    addFavoriteDog: (dog: Dog) => void;
    removeFavoriteDog: (name: string) => void;
};

const DogContext = createContext<DogContextType | null>(null);

export function DogProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [savedDogs, setSavedDogs] = useState<Dog[]>([]);
    const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([])

    function addSavedDog(dog: Dog) {
        setSavedDogs((current) => {
            const alreadySaved = current.some(
                (savedDog) => savedDog.name === dog.name
            );

            if (alreadySaved) {
                return current;
            }

            return [...current, dog];
        });
    }

    function removeSavedDog(name: string) {
        setSavedDogs((current) =>
            current.filter((dog) => dog.name !== name)
        );
    }

    function addFavoriteDog(dog: Dog) {
        setFavoriteDogs((current) => {
            const alreadyFavorite = current.some(
                (favoriteDog) => favoriteDog.name === dog.name
            );

            if (alreadyFavorite) {
                return current;
            }

            return [...current, dog]
        });
    }

    function removeFavoriteDog(name: string) {
        setFavoriteDogs((current) =>
            current.filter((dog) => dog.name !== name)
        );
    }

    return (
        <DogContext.Provider
            value={{
                savedDogs,
                favoriteDogs,
                addSavedDog,
                removeSavedDog,
                addFavoriteDog,
                removeFavoriteDog,

            }}
        >
            {children}
        </DogContext.Provider>
    );
}

export function useDog() {
    const context = useContext(DogContext);

    if (!context) {
        throw new Error('must be used inside DogProvider')
    }

    return context;
}

