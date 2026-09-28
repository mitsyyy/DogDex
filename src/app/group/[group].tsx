import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubBreedImage, getSubBreeds } from '../../api/dogApi';
import BreedCard from '../../components/BreedCard';
import type { Breed } from '../../types/dog';

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
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>{group}</Text>

            <View style={styles.dogcontainer}>
                {subBreeds.map((breed) => (
                    <BreedCard
                        key={breed.name}
                        name={breed.name}
                        image={breed.image}
                        onPress={() => {

                        }}
                    />
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        padding: 15,
    },

    dogcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
    }
})