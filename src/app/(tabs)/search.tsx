import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAllBreeds, getBreedImage, getSubBreedImage } from '../../api/dogApi';
import GroupCard from '../../components/GroupCard';
import type { BreedSearchItem } from '../../types/dog';

const POPULAR_SEARCHES = [
    'German Shepherd',
    'Labrador Retriever',
    'Siberian Husky',
    'Beagle',
    'Dachshund',
];

const INITIAL_RECENT_SEARCHES = [
    'Golden Retriever',
    'French Bulldog',
    'Pomeranian',
];

const FEATURED_GROUPS = [
    { name: 'Hound', key: 'hound' },
    { name: 'Terrier', key: 'terrier' },
    { name: 'Spaniel', key: 'spaniel' },
    { name: 'Retriever', key: 'retriever' },
    { name: 'Poodle', key: 'poodle' },
    { name: 'Mastiff', key: 'mastiff' },
];

export default function Search() {
    const [query, setQuery] = useState('');
    const [breeds, setBreeds] = useState<BreedSearchItem[]>([]);
    const [images, setImages] = useState<Record<string, string>>({});
    const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT_SEARCHES);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let isActive = true;

        async function loadBreeds() {
            setLoading(true);
            setError('');

            try {
                const data = await getAllBreeds();
                if (isActive) {
                    setBreeds(data);
                }
            } catch {
                if (isActive) {
                    setError('We could not load the dog breeds. Please try again.');
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        loadBreeds();

        return () => {
            isActive = false;
        };
    }, [retry]);

    useEffect(() => {
        let isActive = true;

        async function loadGroupImages() {
            const results = await Promise.all(
                FEATURED_GROUPS.map(async (group) => {
                    try {
                        const image = await getBreedImage(group.key);
                        return { key: group.key, image };
                    } catch {
                        return null;
                    }
                })
            );

            if (!isActive) return;

            setImages((current) => {
                const updated = { ...current };
                results.forEach((res) => {
                    if (res?.image) {
                        updated[res.key] = res.image;
                    }
                });
                return updated;
            });
        }

        loadGroupImages();

        return () => {
            isActive = false;
        };
    }, []);

    const parentGroupNames = useMemo(() => {
        return new Set(
            breeds
                .filter((breed) => breed.group)
                .map((breed) => breed.group as string)
        );
    }, [breeds]);

    const filteredBreeds = useMemo(() => {
        const searchText = query.trim().toLowerCase();
        if (!searchText) return [];

        const cleanSearch = searchText.replace(/[^a-z0-9]/g, '');
        const searchTerms = searchText.split(/\s+/).filter(Boolean);

        return breeds
            .filter((breed) => {
                const name = breed.name.toLowerCase();
                const group = breed.group ? breed.group.toLowerCase() : '';
                const fullName = group ? `${group} ${name}` : name;
                const reverseName = group ? `${name} ${group}` : name;

                // Exact phrase or substring match
                if (
                    name.includes(searchText) ||
                    fullName.includes(searchText) ||
                    reverseName.includes(searchText)
                ) {
                    return true;
                }

                if (
                    cleanSearch.length > 2 &&
                    (name.replace(/[^a-z0-9]/g, '').includes(cleanSearch) ||
                        reverseName.replace(/[^a-z0-9]/g, '').includes(cleanSearch))
                ) {
                    return true;
                }

                if (searchTerms.length > 1) {
                    const matchesAnyKeyTerm = searchTerms.some(
                        (term) =>
                            term.length > 2 &&
                            (name.includes(term) || (group && group.includes(term)))
                    );
                    if (matchesAnyKeyTerm) return true;
                }

                return false;
            })
            .slice(0, 30);
    }, [breeds, query]);

    useEffect(() => {
        let isActive = true;

        async function loadResultImages() {
            if (!query.trim()) return;

            const missingItems = filteredBreeds.filter((item) => {
                const key = item.group ? `${item.group}/${item.name}` : item.name;
                return !images[key];
            });

            if (missingItems.length === 0) return;

            const results = await Promise.all(
                missingItems.slice(0, 15).map(async (item) => {
                    const key = item.group ? `${item.group}/${item.name}` : item.name;
                    try {
                        const image = item.group
                            ? await getSubBreedImage(item.group, item.name)
                            : await getBreedImage(item.name);
                        return { key, image };
                    } catch {
                        return null;
                    }
                })
            );

            if (!isActive) return;

            setImages((current) => {
                const updated = { ...current };
                results.forEach((result) => {
                    if (result?.image) {
                        updated[result.key] = result.image;
                    }
                });
                return updated;
            });
        }

        loadResultImages();

        return () => {
            isActive = false;
        };
    }, [query, filteredBreeds, images]);

    function formatBreedDisplayName(item: BreedSearchItem): string {
        if (item.group) {
            return `${item.name} ${item.group}`
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
        }
        return item.name.charAt(0).toUpperCase() + item.name.slice(1);
    }

    function openBreed(breed: BreedSearchItem) {
        const displayName = formatBreedDisplayName(breed);

        setRecentSearches((current) => [
            displayName,
            ...current.filter((item) => item.toLowerCase() !== displayName.toLowerCase()),
        ].slice(0, 8));

        if (breed.group) {
            router.push({
                pathname: '../breed/[breed]',
                params: {
                    breed: breed.name,
                    group: breed.group,
                },
            });
        } else {
            const isGroup = parentGroupNames.has(breed.name);
            if (isGroup) {
                router.push({
                    pathname: '/group/[group]',
                    params: { group: breed.name },
                });
            } else {
                router.push({
                    pathname: '../breed/[breed]',
                    params: { breed: breed.name },
                });
            }
        }
    }

    function showSearch(text: string) {
        setQuery(text);
    }

    function handleBack() {
        if (query.trim().length > 0) {
            setQuery('');
            return;
        }

        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(tabs)/home');
        }
    }

    const isSearching = query.trim().length > 0;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Pressable
                    onPress={handleBack}
                    style={styles.backButton}
                    hitSlop={8}
                    accessibilityLabel="Back"
                >
                    <MaterialDesignIcons name="chevron-left" size={28} color="#222222" />
                </Pressable>

                <View style={styles.searchBar}>
                    <MaterialDesignIcons name="magnify" size={21} color="#8E8276" />
                    <TextInput
                        style={styles.input}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search for a breed..."
                        placeholderTextColor="#9E948A"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="search"
                    />

                    {query.length > 0 && (
                        <Pressable
                            onPress={() => setQuery('')}
                            hitSlop={8}
                            accessibilityLabel="Clear search"
                        >
                            <MaterialDesignIcons name="close-circle" size={19} color="#8E8276" />
                        </Pressable>
                    )}
                </View>
            </View>

            {loading ? (
                <View style={styles.centerState}>
                    <ActivityIndicator size="large" color="#6B4F3A" />
                    <Text style={styles.stateText}>Fetching dog breeds...</Text>
                </View>
            ) : error ? (
                <View style={styles.centerState}>
                    <Text style={styles.stateText}>{error}</Text>
                    <Pressable
                        style={styles.retryButton}
                        onPress={() => setRetry((current) => current + 1)}
                    >
                        <Text style={styles.retryText}>Try again</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={isSearching ? filteredBreeds : []}
                    keyExtractor={(item) =>
                        item.group ? `${item.group}/${item.name}` : item.name
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={
                        isSearching ? (
                            <Text style={styles.resultsLabel}>
                                Results for “{query.trim()}”
                            </Text>
                        ) : (
                            <View>
                                {recentSearches.length > 0 && (
                                    <View style={styles.section}>
                                        <View style={styles.sectionHeader}>
                                            <View style={styles.sectionTitleRow}>
                                                <MaterialDesignIcons
                                                    name="history"
                                                    size={19}
                                                    color="#222222"
                                                />
                                                <Text style={styles.sectionTitle}>
                                                    Recent Searches
                                                </Text>
                                            </View>
                                            <Pressable
                                                onPress={() => setRecentSearches([])}
                                                hitSlop={8}
                                                accessibilityLabel="Clear recent searches"
                                            >
                                                <Text style={styles.clearText}>Clear</Text>
                                            </Pressable>
                                        </View>
                                        <View style={styles.chipsContainer}>
                                            {recentSearches.map((item) => (
                                                <Pressable
                                                    key={item}
                                                    style={styles.chip}
                                                    onPress={() => showSearch(item)}
                                                >
                                                    <Text style={styles.chipText}>{item}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                <View style={styles.section}>
                                    <View style={styles.sectionTitleRow}>
                                        <MaterialDesignIcons
                                            name="fire"
                                            size={20}
                                            color="#222222"
                                        />
                                        <Text style={styles.sectionTitle}>
                                            Popular Searches
                                        </Text>
                                    </View>
                                    <View style={styles.chipsContainer}>
                                        {POPULAR_SEARCHES.map((item) => (
                                            <Pressable
                                                key={item}
                                                style={styles.chip}
                                                onPress={() => showSearch(item)}
                                            >
                                                <Text style={styles.chipText}>{item}</Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitleStandalone}>
                                        Browse by Group
                                    </Text>
                                    <View style={styles.groupsGrid}>
                                        {FEATURED_GROUPS.map((group) => {
                                            const imageUri = images[group.key];
                                            const imageSource = imageUri
                                                ? { uri: imageUri }
                                                : require('../../../assets/images/groups/terrier.jpg');

                                            return (
                                                <View
                                                    key={group.key}
                                                    style={styles.groupCardItem}
                                                >
                                                    <GroupCard
                                                        name={group.name}
                                                        image={imageSource}
                                                        onPress={() =>
                                                            router.push({
                                                                pathname: '/group/[group]',
                                                                params: { group: group.key },
                                                            })
                                                        }
                                                    />
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        )
                    }
                    renderItem={({ item }) => {
                        const key = item.group
                            ? `${item.group}/${item.name}`
                            : item.name;
                        const image = images[key];
                        const isGroup = !item.group && parentGroupNames.has(item.name);
                        const displayName = formatBreedDisplayName(item);

                        return (
                            <Pressable
                                style={styles.resultRow}
                                onPress={() => openBreed(item)}
                            >
                                {image ? (
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.resultImage}
                                    />
                                ) : (
                                    <View style={styles.imagePlaceholder}>
                                        <ActivityIndicator color="#6B4F3A" size="small" />
                                    </View>
                                )}

                                <View style={styles.resultInfo}>
                                    <Text style={styles.resultName}>{displayName}</Text>
                                    <Text style={styles.resultGroup}>
                                        {item.group
                                            ? `Sub-breed of ${item.group.charAt(0).toUpperCase() + item.group.slice(1)}`
                                            : isGroup
                                                ? 'Breed Family • Group'
                                                : 'Dog breed'}
                                    </Text>
                                </View>

                                <MaterialDesignIcons
                                    name="chevron-right"
                                    size={24}
                                    color="#A89F95"
                                />
                            </Pressable>
                        );
                    }}
                    ListEmptyComponent={
                        isSearching ? (
                            <View style={styles.centerState}>
                                <MaterialDesignIcons
                                    name="dog"
                                    size={42}
                                    color="#A89F95"
                                />
                                <Text style={styles.emptyTitle}>No matches found</Text>
                                <Text style={styles.stateText}>
                                    Try searching for another breed name.
                                </Text>
                            </View>
                        ) : null
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
        paddingBottom: 12,
        gap: 10,
    },

    backButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -4,
    },

    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFECE6',
        borderRadius: 24,
        paddingHorizontal: 14,
        height: 46,
        gap: 8,
    },

    input: {
        flex: 1,
        color: '#222222',
        fontSize: 15,
        paddingVertical: 0,
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    section: {
        marginTop: 20,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
    },

    sectionTitleStandalone: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
        marginBottom: 14,
    },

    clearText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8E8276',
    },

    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    chip: {
        backgroundColor: '#EFECE6',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3E3730',
    },

    groupsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },

    groupCardItem: {
        width: '31%',
        alignItems: 'center',
    },

    resultsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3E3730',
        marginTop: 14,
        marginBottom: 12,
    },

    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },

    resultImage: {
        width: 58,
        height: 58,
        borderRadius: 12,
        backgroundColor: '#EFECE6',
    },

    imagePlaceholder: {
        width: 58,
        height: 58,
        borderRadius: 12,
        backgroundColor: '#EFECE6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    resultInfo: {
        flex: 1,
    },

    resultName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222222',
    },

    resultGroup: {
        fontSize: 13,
        color: '#8E8276',
        marginTop: 3,
    },

    centerState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        minHeight: 250,
    },

    emptyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222222',
        marginTop: 12,
    },

    stateText: {
        fontSize: 14,
        color: '#8E8276',
        textAlign: 'center',
        marginTop: 6,
    },

    retryButton: {
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#6B4F3A',
        borderRadius: 10,
    },

    retryText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});