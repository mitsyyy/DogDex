import { FreckleFace_400Regular, useFonts } from '@expo-google-fonts/freckle-face';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
    const [fontsLoaded] = useFonts({
        FreckleFace_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground
            source={require('../../assets/images/dog_bg.png')}
            style={styles.mainContainer}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContent}>
                    <View style={styles.logoRow}>
                        <MaterialDesignIcons name="paw" size={42} color="#FFFFFF" />
                        <Text style={styles.logoName}>DogDex</Text>
                    </View>

                    <Text style={styles.tagline}>Discover. Learn. Love.</Text>
                </View>

                <View style={styles.bottomContent}>
                    <Text style={styles.description}>
                        Explore hundreds of dog breeds,{'\n'}find your favorites, and learn more{'\n'}about your furry friends.
                    </Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => router.replace('/(tabs)/home')}
                        accessibilityRole="button"
                        accessibilityLabel="Get Started"
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                        <MaterialDesignIcons name="arrow-right" size={20} color="#2A231D" />
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 36,
        paddingBottom: 32,
    },

    headerContent: {
        alignItems: 'center',
        width: '100%',
    },

    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },

    logoName: {
        color: '#FFFFFF',
        fontFamily: 'FreckleFace_400Regular',
        fontSize: 48,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },

    tagline: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 6,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.35)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    bottomContent: {
        width: '100%',
        alignItems: 'center',
        gap: 22,
    },

    description: {
        color: 'rgba(255, 255, 255, 0.92)',
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '400',
        paddingHorizontal: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    button: {
        backgroundColor: '#FAF7F2',
        width: '100%',
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },

    buttonText: {
        color: '#2A231D',
        fontSize: 16,
        fontWeight: '600',
    },
});