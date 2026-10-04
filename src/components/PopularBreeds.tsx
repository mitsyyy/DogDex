import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { getBreedImage } from '../api/dogApi';
import BreedCard from './BreedCard';
import { SkeletonBox } from './Skeleton';

const popularBreeds = [
    'pomeranian',
    'husky',
];

export default function PopularBreeds() {
    const [breedImages, setBreedImages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadBreeds() {
            setLoading(true);
            const images: Record<string, string> = {};

            await Promise.all(
                popularBreeds.map(async (breed) => {
                    try {
                        const image = await getBreedImage(breed);
                        images[breed] = image;
                    } catch {
                        // ignore error
                    }
                })
            );

            if (isActive) {
                setBreedImages(images);
                setLoading(false);
            }
        }

        loadBreeds();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Popular Breeds</Text>

                <Pressable
                    onPress={() => router.push('/popular')}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="See all popular breeds"
                >
                    <Text style={styles.seeAllText}>See all</Text>
                </Pressable>
            </View>

            {loading ? (
                <View style={styles.breedContainer}>
                    <View style={styles.skeletonItem}>
                        <SkeletonBox width={181} height={181} borderRadius={20} />
                        <SkeletonBox width={100} height={16} borderRadius={6} style={styles.skeletonText} />
                    </View>

                    <View style={styles.skeletonItem}>
                        <SkeletonBox width={181} height={181} borderRadius={20} />
                        <SkeletonBox width={100} height={16} borderRadius={6} style={styles.skeletonText} />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={popularBreeds.filter((breed) => breedImages[breed])}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(breed) => breed}
                    contentContainerStyle={styles.breedContainer}
                    renderItem={({ item: breed }) => (
                        <BreedCard
                            name={breed}
                            image={{ uri: breedImages[breed] }}
                            onPress={() => {
                                router.push({
                                    pathname: '/breed/[breed]',
                                    params: {
                                        breed: breed,
                                    },
                                });
                            }}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 24,
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    seeAllText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8E8276',
    },

    breedContainer: {
        gap: 15,
        flexDirection: 'row',
    },

    skeletonItem: {
        alignItems: 'center',
    },

    skeletonText: {
        marginTop: 8,
    },
});