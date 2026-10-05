import { FreckleFace_400Regular, useFonts } from '@expo-google-fonts/freckle-face';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrowseGroups from '../../components/BrowseGroups';
import PopularBreeds from '../../components/PopularBreeds';
import { SkeletonBox } from '../../components/Skeleton';

function HomeSkeleton() {
    return (
        <View style={styles.skeletonContainer}>
            <SkeletonBox width="100%" height={48} borderRadius={24} style={styles.skeletonSearch} />

            <SkeletonBox width="100%" height={175} borderRadius={24} style={styles.skeletonBanner} />

            <View style={styles.skeletonSection}>
                <View style={styles.skeletonSectionHeader}>
                    <SkeletonBox width={130} height={20} borderRadius={6} />
                    <SkeletonBox width={50} height={16} borderRadius={6} />
                </View>

                <View style={styles.skeletonRow}>
                    <View style={styles.skeletonBreedItem}>
                        <SkeletonBox width={181} height={181} borderRadius={20} />
                        <SkeletonBox width={90} height={14} borderRadius={6} style={styles.skeletonBreedText} />
                    </View>

                    <View style={styles.skeletonBreedItem}>
                        <SkeletonBox width={181} height={181} borderRadius={20} />
                        <SkeletonBox width={90} height={14} borderRadius={6} style={styles.skeletonBreedText} />
                    </View>
                </View>
            </View>

            <View style={styles.skeletonSection}>
                <View style={styles.skeletonSectionHeader}>
                    <SkeletonBox width={150} height={20} borderRadius={6} />
                </View>

                <View style={styles.skeletonGrid}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} style={styles.skeletonGroupItem}>
                            <SkeletonBox width="100%" height={105} borderRadius={14} />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default function Home() {
    const [fontsLoaded] = useFonts({
        FreckleFace_400Regular,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const timer = setTimeout(() => {
            if (isActive) {
                setLoading(false);
            }
        }, 900);

        return () => {
            isActive = false;
            clearTimeout(timer);
        };
    }, []);

    const isInitialLoading = !fontsLoaded || loading;

    return (
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <MaterialDesignIcons name="paw" size={26} color="#3B3025" />
                        <Text style={styles.logoName}>DogDex</Text>
                    </View>

                    <View style={styles.profileWrapper}>
                        <Image
                            source={require('../../../assets/images/dogpfp.jpg')}
                            style={styles.profile}
                        />
                    </View>
                </View>

                {isInitialLoading ? (
                    <HomeSkeleton />
                ) : (
                    <>
                        <Pressable
                            style={styles.searchBar}
                            onPress={() => router.push('/(tabs)/search')}
                            accessibilityRole="button"
                            accessibilityLabel="Search for a breed"
                        >
                            <MaterialDesignIcons name="magnify" size={22} color="#8C827A" />
                            <Text style={styles.searchPlaceholder}>Search for a breed...</Text>
                        </Pressable>

                        <Pressable
                            style={styles.bannerWrapper}
                            onPress={() => router.push('/(tabs)/search')}
                            accessibilityRole="button"
                            accessibilityLabel="Explore dog breeds banner"
                        >
                            <ImageBackground
                                source={require('../../../assets/images/dog_banner.jpg')}
                                style={styles.banner}
                                imageStyle={styles.bannerImage}
                            >
                                <LinearGradient
                                    colors={['rgba(28, 22, 18, 0.72)', 'rgba(28, 22, 18, 0.4)', 'transparent']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 0.95, y: 0.5 }}
                                    style={styles.bannerOverlay}
                                >
                                    <View style={styles.bannerContent}>
                                        <Text style={styles.bannerCategory}>EXPLORE</Text>
                                        <Text style={styles.bannerHeading}>Meet Over{'\n'}400+ Breeds</Text>

                                        <View style={styles.bannerArrowButton}>
                                            <MaterialDesignIcons name="arrow-right" size={20} color="#FFFFFF" />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </Pressable>

                        <PopularBreeds />

                        <BrowseGroups />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FAF8F5',
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 16,
    },

    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    logoName: {
        fontFamily: 'FreckleFace_400Regular',
        color: '#2C2520',
        fontSize: 26,
    },

    profileWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#EAE5DF',
    },

    profile: {
        width: '100%',
        height: '100%',
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFECE6',
        borderRadius: 24,
        height: 48,
        paddingHorizontal: 16,
        gap: 10,
        marginBottom: 18,
    },

    searchPlaceholder: {
        color: '#8C827A',
        fontSize: 15,
        fontWeight: '400',
    },

    bannerWrapper: {
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#3B3025',
    },

    banner: {
        width: '100%',
        height: 175,
        justifyContent: 'center',
    },

    bannerImage: {
        borderRadius: 24,
    },

    bannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    bannerContent: {
        maxWidth: '65%',
    },

    bannerCategory: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: '#E0D5C7',
        textTransform: 'uppercase',
        marginBottom: 4,
    },

    bannerHeading: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 28,
        color: '#FFFFFF',
        marginBottom: 14,
    },

    bannerArrowButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255, 255, 255, 0.28)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    skeletonBase: {
        backgroundColor: '#EAE5DF',
    },

    skeletonContainer: {
        width: '100%',
    },

    skeletonSearch: {
        marginBottom: 18,
    },

    skeletonBanner: {
        marginBottom: 24,
    },

    skeletonSection: {
        marginBottom: 24,
    },

    skeletonSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    skeletonRow: {
        flexDirection: 'row',
        gap: 14,
    },

    skeletonBreedItem: {
        width: 181,
        alignItems: 'center',
    },

    skeletonBreedText: {
        marginTop: 8,
    },

    skeletonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },

    skeletonGroupItem: {
        width: '31%',
    },
});