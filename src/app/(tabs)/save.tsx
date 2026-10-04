import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubBreeds } from '../../api/dogApi';
import SavedBreedCard from '../../components/SavedBreedCard';
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

export default function Save() {
    const {
        savedDogs,
        removeSavedDog,
        favoriteDogs,
        addFavoriteDog,
        removeFavoriteDog,
    } = useDog();

    const [subBreedsMap, setSubBreedsMap] = useState<Record<string, string[]>>({});

    useEffect(() => {
        let isActive = true;

        async function loadSubBreeds() {
            const missingDogs = savedDogs.filter(
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
    }, [savedDogs]);

    function handleToggleFavorite(dog: Dog, isFavorite: boolean) {
        if (isFavorite) {
            removeFavoriteDog(dog.name);
        } else {
            addFavoriteDog(dog);
        }
    }

    function handleRemove(dog: Dog) {
        const formatted = formatBreedName(dog.name);
        Alert.alert(
            'Remove Saved Breed',
            `Are you sure you want to remove ${formatted} from your saved breeds?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => removeSavedDog(dog.name),
                },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Saved</Text>
                <Text style={styles.subtitle}>Breeds you've saved for later</Text>
            </View>

            <FlatList
                data={savedDogs}
                keyExtractor={(dog) => dog.name}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isFavorite = favoriteDogs.some(
                        (fav) => fav.name === item.name
                    );
                    const displayName = formatBreedName(item.name);
                    const subBreedsList = subBreedsMap[item.name.toLowerCase()];
                    const subBreedText = getSubBreedLabel(item, subBreedsList);

                    return (
                        <SavedBreedCard
                            name={displayName}
                            subBreed={subBreedText}
                            image={item.image}
                            isFavorite={isFavorite}
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
                            onToggleFavorite={() =>
                                handleToggleFavorite(item, isFavorite)
                            }
                            onRemove={() => handleRemove(item)}
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
                        <Text style={styles.emptyTitle}>No saved breeds yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Explore dog breeds and tap save to keep them here for later.
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
        paddingHorizontal: 20,
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
        paddingBottom: 30,
        flexGrow: 1,
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