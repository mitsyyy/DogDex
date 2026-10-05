import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubBreedImage, getSubBreeds } from '../../api/dogApi';
import ErrorState from '../../components/ErrorState';
import { SkeletonBox } from '../../components/Skeleton';

interface SubBreedData {
    name: string;
    image: string;
}

function formatName(name: string): string {
    return name
        .split(/[-_ ]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export default function GroupPage() {
    const { group } = useLocalSearchParams<{ group: string }>();

    const [subBreeds, setSubBreeds] = useState<SubBreedData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isActive = true;

        async function loadSubBreeds() {
            if (!group) return;

            setLoading(true);
            setError(false);
            try {
                const breeds = await getSubBreeds(group as string);
                const list = Array.isArray(breeds) ? breeds : [];

                const results = await Promise.all(
                    list.map(async (breed) => {
                        try {
                            const img = await getSubBreedImage(group as string, breed);
                            return { name: breed, image: img };
                        } catch {
                            return null;
                        }
                    })
                );

                if (isActive) {
                    setSubBreeds(results.filter((item): item is SubBreedData => item !== null));
                }
            } catch {
                if (isActive) {
                    setError(true);
                    setSubBreeds([]);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        loadSubBreeds();

        return () => {
            isActive = false;
        };
    }, [group, retryCount]);

    const groupTitle = group ? `${formatName(group)} Group` : 'Group Breeds';

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
                    <Text style={styles.title}>{groupTitle}</Text>
                    <Text style={styles.subtitle}>
                        {loading
                            ? 'Loading sub-breeds...'
                            : `${subBreeds.length} sub-breed${subBreeds.length === 1 ? '' : 's'}`}
                    </Text>
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
                    data={subBreeds}
                    keyExtractor={(breed) => breed.name}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item: breed }) => (
                        <Pressable
                            style={styles.card}
                            onPress={() => {
                                router.push({
                                    pathname: '/breed/[breed]',
                                    params: {
                                        breed: breed.name,
                                        group: group as string,
                                    },
                                });
                            }}
                        >
                            <View style={styles.imageWrapper}>
                                {breed.image ? (
                                    <Image
                                        source={{ uri: breed.image }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.placeholderImage} />
                                )}
                            </View>

                            <View style={styles.cardInfo}>
                                <Text style={styles.breedName} numberOfLines={1}>
                                    {formatName(breed.name)}
                                </Text>
                                <Text style={styles.breedGroupText} numberOfLines={1}>
                                    {formatName(group || '')}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialDesignIcons name="dog" size={48} color="#8E8276" />
                            <Text style={styles.emptyTitle}>No sub-breeds found</Text>
                            <Text style={styles.emptySubtitle}>
                                There are no registered sub-breeds for this group.
                            </Text>
                        </View>
                    }
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

    breedGroupText: {
        fontSize: 12,
        color: '#8E8276',
        marginTop: 3,
        fontWeight: '500',
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

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingHorizontal: 32,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F1E1D',
        marginTop: 12,
    },

    emptySubtitle: {
        fontSize: 14,
        color: '#8E8276',
        textAlign: 'center',
        marginTop: 6,
    },
});