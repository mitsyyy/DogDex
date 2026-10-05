import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getBreedImage, getSubBreedImage } from '../api/dogApi';
import ErrorState from '../components/ErrorState';
import { SkeletonBox } from '../components/Skeleton';

interface PopularItem {
    id: string;
    name: string;
    breed: string;
    group?: string;
}

const POPULAR_BREEDS_LIST: PopularItem[] = [
    { id: 'golden', name: 'Golden Retriever', breed: 'golden', group: 'retriever' },
    { id: 'french', name: 'French Bulldog', breed: 'french', group: 'bulldog' },
    { id: 'husky', name: 'Siberian Husky', breed: 'husky' },
    { id: 'labrador', name: 'Labrador Retriever', breed: 'labrador' },
    { id: 'beagle', name: 'Beagle', breed: 'beagle' },
    { id: 'pug', name: 'Pug', breed: 'pug' },
];

export default function PopularBreedsScreen() {
    const [images, setImages] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isActive = true;

        async function loadImages() {
            setLoading(true);
            setError(false);
            const loadedImages: Record<string, string> = {};

            try {
                await Promise.all(
                    POPULAR_BREEDS_LIST.map(async (item) => {
                        try {
                            const img = item.group
                                ? await getSubBreedImage(item.group, item.breed)
                                : await getBreedImage(item.breed);
                            loadedImages[item.id] = img;
                        } catch {
                            // ignore error for individual item
                        }
                    })
                );

                if (!isActive) return;

                if (Object.keys(loadedImages).length === 0) {
                    setError(true);
                } else {
                    setImages(loadedImages);
                }
            } catch {
                if (isActive) {
                    setError(true);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        loadImages();

        return () => {
            isActive = false;
        };
    }, [retryCount]);

    function handleCardPress(item: PopularItem) {
        if (item.group) {
            router.push({
                pathname: '/breed/[breed]',
                params: {
                    breed: item.breed,
                    group: item.group,
                },
            });
        } else {
            router.push({
                pathname: '/breed/[breed]',
                params: {
                    breed: item.breed,
                },
            });
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Back"
                >
                    <MaterialDesignIcons name="chevron-left" size={28} color="#222222" />
                </Pressable>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>Popular Breeds</Text>
                    <Text style={styles.subtitle}>Most loved companions</Text>
                </View>
            </View>

            {loading ? (
                <View style={styles.skeletonGrid}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} style={styles.skeletonCard}>
                            <SkeletonBox width="100%" height={150} borderRadius={18} />
                            <SkeletonBox width="75%" height={16} borderRadius={6} style={styles.skeletonTitle} />
                            <SkeletonBox width="45%" height={12} borderRadius={6} style={styles.skeletonSubtitle} />
                        </View>
                    ))}
                </View>
            ) : error ? (
                <ErrorState onRetry={() => setRetryCount((c) => c + 1)} />
            ) : (
                <FlatList
                    data={POPULAR_BREEDS_LIST}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.card}
                            onPress={() => handleCardPress(item)}
                        >
                            <View style={styles.imageWrapper}>
                                {images[item.id] ? (
                                    <Image
                                        source={{ uri: images[item.id] }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.placeholderImage} />
                                )}
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.breedName} numberOfLines={1}>
                                    {item.name}
                                </Text>

                                <View style={styles.learnMoreRow}>
                                    <Text style={styles.learnMoreText}>Learn more</Text>
                                    <MaterialDesignIcons name="arrow-right" size={14} color="#8E8276" />
                                </View>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF8F5',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        gap: 10,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },

    headerTextContainer: {
        flex: 1,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    subtitle: {
        fontSize: 13,
        color: '#8E8276',
        marginTop: 2,
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 36,
    },

    row: {
        justifyContent: 'space-between',
        gap: 14,
        marginBottom: 16,
    },

    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 2,
    },

    imageWrapper: {
        width: '100%',
        height: 145,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#EAE5DF',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EAE5DF',
    },

    cardInfo: {
        paddingTop: 10,
        paddingBottom: 4,
        paddingHorizontal: 4,
    },

    breedName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    learnMoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
    },

    learnMoreText: {
        fontSize: 12,
        color: '#8E8276',
        fontWeight: '600',
    },

    skeletonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        rowGap: 16,
    },

    skeletonCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
    },

    skeletonTitle: {
        marginTop: 10,
    },

    skeletonSubtitle: {
        marginTop: 6,
    },
});
