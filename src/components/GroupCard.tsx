import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { ImageBackground, Pressable, StyleSheet, Text } from 'react-native';
import type { Breed } from '../types/dog';

export default function GroupCard({image, name, onPress}: Breed) {
    return(
        <Pressable onPress={onPress}>
            <ImageBackground source={image} style={styles.image}>
            <Text style={styles.text}>{name}</Text>
            
            <MaterialDesignIcons name="greater-than" style={styles.text}/>
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 120,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
    },

    text: {
        color: 'white'

    }
})
