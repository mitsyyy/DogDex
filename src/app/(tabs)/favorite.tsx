import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubBreeds } from '../../api/dogApi';
import FavoriteBreedCard from '../../components/FavoriteBreedCard';
import { useDog } from '../../context/dogContext';
import type { Dog } from '../../types/dog';

function formatBreedName(name: string): string {
    return name
        .split(/[-_ ]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

function getSubBreedLabel(dog: Dog, subBreeds?: string[]): string {
    if (dog.group) {
        return `Sub-breed of ${formatBreedName(dog.group)}`;
    }

    if (!subBreeds || subBreeds.length === 0) {
        return 'No sub-breed';
    }

    return subBreeds
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(', ');
}

export default function Favorite() {
    const {
        favoriteDogs,
        removeFavoriteDog,
    } = useDog();

    const [subBreedsMap, setSubBreedsMap] = useState<Record<string, string[]>>({});

    useEffect(() => {
        let isActive = true;

        async function loadSubBreeds() {
            const missingDogs = favoriteDogs.filter(
                (dog) => !dog.group && subBreedsMap[dog.name.toLowerCase()] === undefined
            );

            if (missingDogs.length === 0) return;

            const results = await Promise.all(
                missingDogs.map(async (dog) => {
                    const breedKey = dog.name.toLowerCase();
                    try {
                        const list = await getSubBreeds(breedKey);
                        return {
                            key: breedKey,
                            subBreeds: Array.isArray(list) ? list : [],
                        };
                    } catch {
                        return { key: breedKey, subBreeds: [] };
                    }
                })
            );

            if (!isActive) return;

            setSubBreedsMap((current) => {
                const updated = { ...current };
                results.forEach((res) => {
                    updated[res.key] = res.subBreeds;
                });
                return updated;
            });
        }

        loadSubBreeds();

        return () => {
            isActive = false;
        };
    }, [favoriteDogs]);

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Favorites</Text>
                <Text style={styles.subtitle}>Your saved dog breeds</Text>
            </View>

            <FlatList
                data={favoriteDogs}
                keyExtractor={(dog) => dog.name}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const displayName = formatBreedName(item.name);
                    const subBreedsList = subBreedsMap[item.name.toLowerCase()];
                    const subBreedText = getSubBreedLabel(item, subBreedsList);

                    return (
                        <FavoriteBreedCard
                            name={displayName}
                            image={item.image}
                            subBreed={subBreedText}
                            onPress={() => {
                                if (item.group) {
                                    router.push({
                                        pathname: '/breed/[breed]',
                                        params: {
                                            breed: item.name,
                                            group: item.group,
                                        },
                                    });
                                } else {
                                    router.push({
                                        pathname: '/breed/[breed]',
                                        params: {
                                            breed: item.name,
                                        },
                                    });
                                }
                            }}
                            onFavoritePress={() => {
                                removeFavoriteDog(item.name);
                            }}
                        />
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image
                            source={require('../../../assets/images/emptyicondog.png')}
                            style={styles.emptyImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyTitle}>No favorites yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Tap the heart icon on any dog breed to add it to your favorites list.
                        </Text>
                        <Pressable
                            style={styles.exploreButton}
                            onPress={() => router.push('/(tabs)/search')}
                        >
                            <Text style={styles.exploreButtonText}>Explore Breeds</Text>
                        </Pressable>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF8F5',
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    subtitle: {
        fontSize: 14,
        color: '#8E8276',
        marginTop: 4,
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        flexGrow: 1,
    },

    row: {
        justifyContent: 'space-between',
        gap: 14,
        marginBottom: 18,
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingTop: 80,
    },

    emptyImage: {
        width: 130,
        height: 130,
        marginBottom: 10,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F1E1D',
        marginTop: 14,
    },

    emptySubtitle: {
        fontSize: 14,
        color: '#8E8276',
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 20,
    },

    exploreButton: {
        marginTop: 20,
        backgroundColor: '#6B4F3A',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 22,
    },
    
    exploreButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});