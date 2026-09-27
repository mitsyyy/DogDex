import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getBreedImage } from '../api/dogApi';
import BreedCard from './BreedCard';

const popularBreeds = [
    'pomeranian',
    'beagle',
    'husky',
];

export default function PopularBreeds() {


    const [breedImages, setBreedImages] = useState<Record<string, string>>({});

    useEffect(() => {
        async function loadBreeds() {
            const images: Record<string, string> = {};

            for (const breed of popularBreeds) {
                const image = await getBreedImage(breed);

                images[breed] = image;
            }
            setBreedImages(images);
        }
        loadBreeds();
    }, []);
    return (
        <View>
            <View style={styles.header}>
                <Text>Popular Breeds</Text>

                <Pressable>
                    <Text>See All</Text>
                </Pressable>
            </View>

            <View style={styles.breedContainer}>
                {popularBreeds.map((breed) => (
                    <BreedCard
                        key={breed}
                        name={breed}
                        image={breedImages[breed]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    breedContainer: {
        flexDirection: 'row',
        gap: 15,
        overflow: 'hidden'
    }
});