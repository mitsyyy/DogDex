import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { getBreedImage } from '../api/dogApi';
import BreedCard from './BreedCard';

const popularBreeds = [
    'pomeranian',
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

            <FlatList
            data={popularBreeds.filter((breed) => breedImages[breed])}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(breed) => breed}
            contentContainerStyle={styles.breedContainer}
            renderItem={({ item:breed }) => (
                <BreedCard
                name={breed}
                image={{ uri: breedImages[breed] }}
                onPress={() => {
                    router.push({
                        pathname: '../breed/[breed]',
                        params: {
                            breed: breed,
                        }
                    })
                }}
                />
            )}

            />
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
        gap: 15,
    }
});