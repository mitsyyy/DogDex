import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { SavedBreedCropProps } from '../types/dog';

export default function SavedBreedCard({
    name,
    image,
    subBreed,
    group,
    isFavorite,
    onPress,
    onToggleFavorite,
    onRemove,
}: SavedBreedCropProps) {
    const subtitle = subBreed || group || 'No sub-breed';

    return (
        <Pressable
            style={styles.card}
            onPress={onPress}
            onLongPress={onRemove}
            accessibilityRole="button"
            accessibilityLabel={`${name}, ${subtitle}`}
        >
            <Image
                style={styles.image}
                source={{ uri: image }}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.subBreedText} numberOfLines={1}>
                    {subtitle}
                </Text>
            </View>

            {onToggleFavorite && (
                <Pressable
                    style={styles.heartButton}
                    onPress={onToggleFavorite}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <MaterialDesignIcons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={22}
                        color={isFavorite ? '#D9383A' : '#A89F95'}
                    />
                </Pressable>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },

    image: {
        width: 68,
        height: 68,
        borderRadius: 14,
        backgroundColor: '#EFECE6',
    },

    infoContainer: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
        justifyContent: 'center',
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    subBreedText: {
        fontSize: 13,
        color: '#8E8276',
        marginTop: 4,
    },
    
    heartButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
});