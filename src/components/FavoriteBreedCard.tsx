import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { FavoriteBreedCardProps } from '../types/dog';

export default function FavoriteBreedCard({
    name,
    image,
    subBreed,
    onPress,
    onFavoritePress,
}: FavoriteBreedCardProps) {
    return (
        <View style={styles.card}>
            <Pressable
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={`${name}, ${subBreed || 'No sub-breed'}`}
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Pressable
                        style={styles.heartButton}
                        onPress={onFavoritePress}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Remove from favorites"
                    >
                        <MaterialDesignIcons name="heart" size={18} color="#D9383A" />
                    </Pressable>
                </View>

                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.subBreed} numberOfLines={1}>
                    {subBreed || 'No sub-breed'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },

    imageWrapper: {
        width: '100%',
        height: 160,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#EFECE6',
        position: 'relative',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 2,
    },

    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1F1E1D',
        marginTop: 8,
    },
    
    subBreed: {
        fontSize: 13,
        color: '#8E8276',
        marginTop: 2,
    },
});