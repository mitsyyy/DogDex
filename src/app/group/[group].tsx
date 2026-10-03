import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubBreedImage, getSubBreeds } from '../../api/dogApi';
import type { Breed } from '../../types/dog';

import BreedCard from '../../components/BreedCard';

export default function GroupPage() {
    const { group } = useLocalSearchParams();

    const [subBreeds, setSubBreeds] = useState<Breed[]>([]);

    useEffect(() => {
        async function loadSubBreeds() {
            const breeds = await getSubBreeds(group as string);

            const breedData = [];

            for (const breed of breeds) {
                const image = await getSubBreedImage(
                    group as string,
                    breed
                );

                breedData.push({
                    name: breed,
                    image: {
                        uri: image,
                    },
                    onPress: () => {

                    },
                });
            }

            setSubBreeds(breedData);
        }
        loadSubBreeds();
    }, [group]);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <FlatList
                data={subBreeds}
                keyExtractor={(breed) => breed.name}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text>
                        {group}
                    </Text>
                }
                renderItem={({ item: breed }) => (
                    <View style={styles.cardContainer}>
                        <BreedCard
                            name={breed.name}
                            image={breed.image}
                            onPress={() => {
                                router.push({
                                    pathname: '../breed/[breed]',
                                    params: {
                                        breed: breed.name,
                                        group: group as string,
                                    }
                                })
                            }}

                        />
                    </View>
                )}
                contentContainerStyle={styles.dogContainer}
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        padding: 15,
    },

    dogContainer: {
        paddingBottom: 20
    },

    row: {
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 12,
    },

    cardContainer: {
        flex: 1,
    }
})