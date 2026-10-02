import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { SavedBreedCropProps } from '../types/dog';

export default function SavedBreedCard({ name, image, onPress, onRemove }: SavedBreedCropProps) {
    return (
        <View>
            <Pressable onPress={onPress}>
        <Image style={styles.image}
        source={{ uri: image }} 
        />
        <Text>{name}</Text>
            </Pressable>
            <Pressable onPress={onRemove}>
                <Text>Remove</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create ({
image: {
    height: 100,
    width: 100,
}
})