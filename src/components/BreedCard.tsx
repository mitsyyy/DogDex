import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Breed } from '../types/dog';

function formatName(name: string): string {
    return name
        .split(/[-_ ]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
}

export default function BreedCard({ image, name, onPress }: Breed) {
    return (
        <Pressable onPress={onPress}>
            <View style={styles.card}>
                <Image source={image} style={styles.dogImage} />
                <Text style={styles.dogName}>{formatName(name)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
    },

    dogImage: {
        width: 181,
        height: 181,
        borderRadius: 20,
        backgroundColor: '#EAE5DF',
    },

    dogName: {
        textAlign: 'center',
        marginTop: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#1F1E1D',
    },
});