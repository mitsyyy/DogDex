import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { FavoriteBreedCardProps } from '../types/dog';

export default function FavoriteBreedCard({
    name,
    image,
    onPress,
    onFavoritePress,
}: FavoriteBreedCardProps) {
    return (
        <View>
            <Pressable onPress={onPress}>
                <Image source={{ uri: image }} style={styles.image} />
                <View><Text>{name}</Text></View>

        <Pressable onPress={onFavoritePress}>
            <MaterialDesignIcons name="heart" size={24} color="black" />
        </Pressable>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
image: {
    height: 100,
    width: 100,
}
})