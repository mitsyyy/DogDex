import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Breed } from '../types/dog';

export default function BreedCard({ image, name, onPress }: Breed) {
    return (
        <Pressable onPress={onPress}>
        <View>
            <Image source={image} style={styles.dogImage} />
            <Text style={styles.dogName}>{name}</Text>
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create ({
    dogImage: {
        width: 181,
        height: 181,
        borderRadius: 20,
    },

    dogName: {
        textAlign: 'center',
    }
});