import { Image, StyleSheet, Text, View } from 'react-native';
import type { Breed } from '../types/dog';

export default function BreedCard({ image, name }: Breed) {
    return (
        <View>
            <Image source={{ uri:image }} style={styles.dogImage} />
            <Text style={styles.dogName}>{name}</Text>
        </View>
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