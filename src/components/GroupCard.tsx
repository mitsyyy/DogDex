import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Breed } from '../types/dog';

export default function GroupCard({ image, name, onPress }: Breed) {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <ImageBackground
                source={image}
                style={styles.image}
                imageStyle={styles.imageInner}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.75)']}
                    locations={[0, 0.4, 1]}
                    style={styles.gradient}
                >
                    <View style={styles.bottomRow}>
                        <Text style={styles.text} numberOfLines={1}>
                            {name}
                        </Text>

                        <MaterialDesignIcons
                            name="chevron-right"
                            size={18}
                            color="#FFFFFF"
                        />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#EAE5DF',
    },

    image: {
        width: '100%',
        height: 105,
        justifyContent: 'flex-end',
    },

    imageInner: {
        borderRadius: 14,
    },

    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 8,
    },

    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    text: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        flex: 1,
        marginRight: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
});
