import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getBreedImage, getSubBreedImage } from '../../api/dogApi';
import { useDog } from '../../context/dogContext';

function formatDisplayName(breedName?: string, groupName?: string): string {
    if (!breedName) return '';

    if (groupName) {
        return `${breedName} ${groupName}`
            .split(/[-_ ]+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
    }

    const raw = breedName.toLowerCase();
    if (raw === 'germanshepherd') return 'German Shepherd';
    if (raw === 'husky') return 'Siberian Husky';

    return breedName
        .split(/[-_ ]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export default function BreedDetails() {
    const { breed, group } = useLocalSearchParams<{ breed: string; group?: string }>();
    const insets = useSafeAreaInsets();

    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const {
        addSavedDog,
        removeSavedDog,
        savedDogs,
        addFavoriteDog,
        removeFavoriteDog,
        favoriteDogs,
    } = useDog();

    useEffect(() => {
        let isActive = true;

        async function loadImage() {
            setLoading(true);
            try {
                let breedImage: string;

                if (group) {
                    breedImage = await getSubBreedImage(group, breed);
                } else {
                    breedImage = await getBreedImage(breed);
                }

                if (isActive) {
                    setImage(breedImage);
                }
            } catch {
                if (isActive) {
                    setImage(null);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        }

        if (breed) {
            loadImage();
        }

        return () => {
            isActive = false;
        };
    }, [breed, group]);

    const isFavorite = favoriteDogs.some((dog) => dog.name === breed);
    const isSaved = savedDogs.some((dog) => dog.name === breed);

    const displayName = formatDisplayName(breed, group);
    const subtitle = group
        ? `${group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()} Group`
        : 'Sporting Group';

    function handleToggleFavorite() {
        if (!image || !breed) return;

        if (isFavorite) {
            removeFavoriteDog(breed);
        } else {
            addFavoriteDog({
                name: breed,
                image: image,
                group: group,
            });
        }
    }

    function handleToggleSaved() {
        if (!image || !breed) return;

        if (isSaved) {
            removeSavedDog(breed);
        } else {
            addSavedDog({
                name: breed,
                image: image,
                group: group,
            });
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.heroWrapper}>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.placeholderHero}>
                            {loading && <ActivityIndicator size="large" color="#6B4F3A" />}
                        </View>
                    )}

                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.75)']}
                        locations={[0, 0.45, 1]}
                        style={styles.heroOverlay}
                    />

                    <View style={styles.titleContainer}>
                        <Text style={styles.breedTitle}>{displayName}</Text>
                        <Text style={styles.breedSubtitle}>{subtitle}</Text>
                    </View>
                </View>

                <View style={styles.bottomSheet}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <View style={styles.statIconHeader}>
                                <MaterialDesignIcons name="dog" size={20} color="#3B332C" />
                            </View>
                            <Text style={styles.statLabel}>Height</Text>
                            <Text style={styles.statValue}>55–61 cm</Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <View style={styles.statIconHeader}>
                                <MaterialDesignIcons name="scale" size={19} color="#3B332C" />
                            </View>
                            <Text style={styles.statLabel}>Weight</Text>
                            <Text style={styles.statValue}>25–34 kg</Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <View style={styles.statIconHeader}>
                                <MaterialDesignIcons name="clock-time-four-outline" size={19} color="#3B332C" />
                            </View>
                            <Text style={styles.statLabel}>Lifespan</Text>
                            <Text style={styles.statValue}>10–12 years</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About the Breed</Text>
                        <Text style={styles.paragraph}>
                            {displayName} are known for their friendly and gentle nature. They are intelligent, loyal, and great with families. Their playful personality makes them excellent companions for both adults and children.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Temperament</Text>
                        <View style={styles.chipsRow}>
                            {['Friendly', 'Intelligent', 'Loyal', 'Playful'].map((item) => (
                                <View key={item} style={styles.chip}>
                                    <Text style={styles.chipText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Care Needs</Text>
                        <View style={styles.careRow}>
                            <View style={styles.careItem}>
                                <MaterialDesignIcons name="bone" size={24} color="#3B332C" />
                                <Text style={styles.careTitle}>Exercise</Text>
                                <Text style={styles.careSubtitle}>Daily walks</Text>
                            </View>

                            <View style={styles.careItem}>
                                <MaterialDesignIcons name="shower" size={24} color="#3B332C" />
                                <Text style={styles.careTitle}>Grooming</Text>
                                <Text style={styles.careSubtitle}>Regular brushing</Text>
                            </View>

                            <View style={styles.careItem}>
                                <MaterialDesignIcons name="flower-outline" size={24} color="#3B332C" />
                                <Text style={styles.careTitle}>Training</Text>
                                <Text style={styles.careSubtitle}>Moderate</Text>
                            </View>
                        </View>
                    </View>

                    <Pressable
                        style={styles.saveButton}
                        onPress={handleToggleSaved}
                        accessibilityLabel="Save Dog"
                    >
                        <MaterialDesignIcons
                            name={isSaved ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color="#FFFFFF"
                        />
                        <Text style={styles.saveButtonText}>
                            {isSaved ? 'Saved' : 'Save Dog'}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

            <View style={[styles.floatingHeader, { top: insets.top + 8 }]}>
                <Pressable
                    style={styles.floatingButton}
                    onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)/home'))}
                    hitSlop={8}
                    accessibilityLabel="Back"
                >
                    <MaterialDesignIcons name="arrow-left" size={22} color="#1F1E1D" />
                </Pressable>

                <Pressable
                    style={styles.floatingButton}
                    onPress={handleToggleFavorite}
                    hitSlop={8}
                    accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <MaterialDesignIcons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={22}
                        color={isFavorite ? '#D9383A' : '#1F1E1D'}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    scrollContent: {
        flexGrow: 1,
    },

    heroWrapper: {
        width: '100%',
        height: 380,
        backgroundColor: '#EAE5DF',
        position: 'relative',
    },

    heroImage: {
        width: '100%',
        height: '100%',
    },

    placeholderHero: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAE5DF',
    },

    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 190,
    },

    titleContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },

    breedTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    breedSubtitle: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 4,
        fontWeight: '500',
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    bottomSheet: {
        marginTop: -26,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 36,
    },

    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3EFEA',
    },

    statItem: {
        flex: 1,
        alignItems: 'center',
    },

    statIconHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    statLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2A231D',
        marginTop: 6,
    },

    statValue: {
        fontSize: 13,
        color: '#7E746A',
        marginTop: 2,
    },

    statDivider: {
        width: 1,
        height: 42,
        backgroundColor: '#EFECE6',
    },

    section: {
        marginTop: 22,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1F1E1D',
        marginBottom: 10,
    },

    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        color: '#5C5248',
    },

    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    chip: {
        backgroundColor: '#F1EDE8',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    chipText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#3B332C',
    },

    careRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },

    careItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
    },

    careTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2A231D',
        marginTop: 8,
    },

    careSubtitle: {
        fontSize: 12,
        color: '#7E746A',
        marginTop: 2,
    },

    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#382E25',
        borderRadius: 28,
        height: 54,
        gap: 8,
        marginTop: 28,
        marginBottom: 10,
    },

    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    floatingHeader: {
        position: 'absolute',
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    floatingButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
});